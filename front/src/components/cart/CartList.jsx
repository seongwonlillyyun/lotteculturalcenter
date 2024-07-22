import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getUser } from '../../util/localStorage.js';
import { cartListAxios } from '../../modules/reduxCartAxios';


export default function CartList({cname}) {
  const userId = getUser().userId;
  const dispatch = useDispatch();
  const cartList = useSelector(state => state.cart.list);
  const [checkItems, setCheckItems] = useState(new Set) // 체크 리스트


  useEffect(()=>{
    dispatch(cartListAxios({userId}))
  },[])

  // console.log('체크박스 값->',checkList);  

  const checkItemHandler = (value, isChecked) => {
    const newCheckItems = new Set(checkItems); // 기존 상태 복사

    if (isChecked) {
      newCheckItems.add(value);
    } else {
      newCheckItems.delete(value);
    }
  
    setCheckItems(newCheckItems); // 새로운 상태로 업데이트
    console.log(newCheckItems)
  }

 

  return(
    <>
    {
        cartList.length === 0 ? (
          <div className='cart_bin'>
            <spna className='icon'></spna>
            <h3>장바구니가 비었습니다.</h3>
          </div>
      ): (
        cartList && cartList.map((item, index) => (
          <div className='cart_list' key={item.course_id}>
          <ul className='cart_list_box'>
            <li>
              {
                cname === 'order' ? '' : 
                  <Checkbox id={`list${index}`} 
                            name={`list${index}`}
                            value={`${index}`}      
                            checkItemHandler ={checkItemHandler}
                            />
              }
            </li>
            <li className='title'>
              <span className='deco'>{item.status}</span>
              <span className='deco loc'>{item.loc}</span>
              <Link to={'/'}>
                <h2>{item.course_name}</h2>
              </Link>
            </li>
            <li className='info'>
              <dl>
                <dt>강사명</dt>
                <dd>{item.teacher_name}</dd>
              </dl>  
              <dl> 
                <dt>강좌정보</dt>
                <dd>{item.course_start} ~ {item.course_end} <span>({item.course_week})</span> {item.start_time} ~ {item.end_time} / <span>{item.num_of_course}</span>회</dd>
              </dl>
              <dl>  
                <dt>강좌료</dt>
                <dd>{item.price}</dd>
              </dl>
              <dl className='total'>  
                <dt>총금액</dt>
                <dd><span className='price'>{item.price}</span>원</dd>
              </dl>
            </li>
          </ul>
            {
              cname === 'order' ? '' : <button type='button' className='delete_btn'>휴지통</button>
            }
        </div>
        
        ))
      )
    }
    </>
  );
}
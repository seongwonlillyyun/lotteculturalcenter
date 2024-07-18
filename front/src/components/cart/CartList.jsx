import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
// import { getUser } from '../../util/localStorage.js';
import { cartListAxios } from '../../modules/reduxCartAxios';



export default function CartList({cname}) {
  // const userId = getUser().userId;
  // const dispatch = useDispatch();
  // const cartList = useSelector(state => state.cart.list);


  const [productList, setProductList] = useState([])


    // 체크박스 유효성검사
    const validateCheck = () => {


    }







  return(
    <>
    {
      productList.length === 0 ? (
          <div className='cart_bin'>
            <h1>장바구니가 비었습니다.</h1>
          </div>
      ): (
        productList.map((item, index) => (
          <div className='cart_list' key={item.course_id}>
          <ul className='cart_list_box'>
            <li>
              {
                cname === 'order' ? '' : <Checkbox id={`list${index}`} name={`list${index}`} />
              }
            </li>
            <li className='title'>
              <span className='deco'>{item.status}</span>
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
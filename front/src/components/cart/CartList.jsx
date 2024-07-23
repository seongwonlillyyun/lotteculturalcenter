import React, { useEffect, useState } from 'react';
import CartCheckbox from './CartCheckbox.jsx';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getUser } from '../../util/localStorage.js';
import { cartListAxios } from '../../modules/reduxCartAxios';



export default function CartList() {
  const userId = getUser().userId;
  const dispatch = useDispatch();
  const cartList = useSelector(state => state.cart.list);
  // const [isItemChecked, setIsItemChecked] = useState(new Array(cartList.length).fill(false) );
  // const [checkList, setCheckList] = useState([]);
  // const { checkList } = useContext(CheckContext);
  // const checkboxList = new Array(cartList.length)
  // 개별체크
//   const handleCheck = (id, isChecked) => {
//     alert(id+isChecked)
//     if(isChecked){
//       setCheckList((cartList => [...cartList, id]));
//     }else{
//       setCheckList(checkList.filter(item => item !== id))
//     }
// };

  const checkboxList = []
  // console.log('checkboxList->',checkboxList);
  // const handleCheck = (id, isChecked, i) => {
  //   alert(id+isChecked+i)
    // setIsItemChecked(updateCheck(i)) 

  //   cartList.map((item, index)=>{

  //     if(parseInt(item.course_id) === parseInt(id)){
  //       alert('111')
  //       updateCheck(index, true)
  //     }else if(parseInt(item.course_id) !== parseInt(id)){
  //       alert('2222')
  //       updateCheck(index, false)

  //     }
  // }
  
    // for(let i =0; i < cartList.length; i++ ){
    //   alert('000')
    //   if(cartList[i].course_id === id){
    //     alert('1111')
    //     // setIsItemChecked[i] = true
    //     updateCheck(i, true)
    //   }else{
    //     // setIsItemChecked[i] =false
    //     updateCheck(i, false)
    //   }
    // }
    
  //}

  // const updateCheck = (index) =>{
  //   setIsItemChecked((preChecked)=>{
  //     alert(preChecked)
  //     const updateItemCheck = [...preChecked]
  //     updateItemCheck[index] = !preChecked;
  //     return updateItemCheck;
  //   })


  // }
  // for(let i=0; i  < cartList.length; i++){
  //   checkboxList[i] =  <input type='checkbox' id={`${cartList[i].course_id}`} 
  //             name={`list${i}`}
  //             value={`${i}`}
  //             onChange={(e)=>handleCheck(`${cartList[i].course_id}`, e.target.checked)}
  //             // checked={updateCheck(index, false)}
  //             /> ;
  // }
  // useEffect(()=>{
    
  // },[isItemChecked])
 
//  checkAll(checkboxList)
//   checkboxList.map((item, index)=>{
//     item[index] = <CartCheckbox/>;
//     console.log('checkboxList->',checkboxList);
// })
// console.log('checkboxList->',checkboxList);

  useEffect(()=>{
    dispatch(cartListAxios({userId}))
  },[])

  // console.log('checkList', checkList);

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
            <li className=''>
              {
              
                  <input type='checkbox' id={`${item.course_id}`} 
                            name={`list${index}`}
                            value={`${index}`}
                            onChange={(e)=>handleCheck(`${cartList[index].course_id}`, e.target.checked, index)}
                            // checked={isItemChecked[index]}  
                            
                            // checked={checkList.includes(item.course_id) ? true : false}
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
         
        </div>
        
        ))
      )
    }
    </>
  );
}
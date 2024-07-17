import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUser } from '../util/localStorage.js'
import { useDispatch, useSelector } from "react-redux";
import { getCount } from '../modules/reduxCartAxios.js';


export default function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = getUser();
  const count = useSelector(state => state.cart.count);

  const [productList, setProductList] = useState([])


   // 상품리스트
   useEffect(()=> {
    const url = 'http://127.0.0.1:8080/cart/product'

    axios({
      method: 'post',
      url: url
    })
    .then(res => {setProductList(res.data)}
      )
    .catch(error => console.log(error));
    
  },[])
  
  useEffect(()=>{  
      const userId = userInfo.userId;
      dispatch(getCount(userId));
  },[])





  // 로컬스토리지 저장 
  // localStorage.setItem('userTest', JSON.stringify(userTest));
  // 로컬스토리지 삭제 
  // localStorage.removeItem('userTest')



  return(
    <div className='product type'>
      <div className='header-count'>
          <span>장바구니 회원별 count: {count}</span>
      </div>
        {
          productList.map((item, index) => (
          <>
             <ul className='list'>
              <li className='title'>
                <span className='deco'>{item.status}</span>
                <Link to={`${item.course_id}`}>
                  <h2>{item.course_name}</h2>
                </Link>

                
              </li>
             
            </ul>
           
          </>

          
          ))
        }
        
    </div>
  );
}
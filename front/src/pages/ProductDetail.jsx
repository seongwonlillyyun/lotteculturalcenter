import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getUser } from '../util/localStorage.js'
import { useDispatch } from 'react-redux';
import { cartItemAdd } from '../modules/reduxCartAxios.js';


export default function ProductDetail({addCartCount}) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({})


   // 개별상품
   useEffect(()=>{
    axios.get(`http://127.0.0.1:8080/cart/product/${id}`)
      .then(res => setProduct(res.data))
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);


  // 장바구니 추가
  const handleAddCart = (id) => {
    const userInfo = getUser();
    // const userInfo = 'test';

    if(userInfo !== null){
      const userId = userInfo.userId;
      dispatch(cartItemAdd({id, userId}));
      // window.location.reload();
    }else {
      alert('로그인이 필요한 기능입니다.');
      navigate('/cart');
    }
  }

  return(
    <div className='product type'>

          <h1>디테일</h1>
             <ul className='list'>
              <li className='title'>
                <span className='deco'>{product.status}</span>
                  <h2>{product.course_name}</h2>
                <div className='basic_btn'>
                  <button type='button' className='btn btn_black small' onClick={() => handleAddCart(product.id)}>장바구니 담기</button>
                </div>
                
              </li>
             
            </ul>
          
        
    </div>
  );
}
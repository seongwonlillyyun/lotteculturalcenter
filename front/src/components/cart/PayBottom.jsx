import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonBlack from './ButtonBlack.jsx';
import ButtonWhite from './ButtonWhite.jsx';
import { useSelector, useDispatch} from 'react-redux';
// import { cartListAxios } from '../modules/reduxCartAxios';

export default function PaymentBottom({next}) {
  const currentPos = useSelector(state => state.cart.currentPos);

  console.log('currentPos->', currentPos);

  const navigate = useNavigate();

  const handlePrev = () => {
    navigate('/cart')
  }
  const handleNext = () => {
    next();
  }
  const handlePay = () => {
    alert('선택한 강좌를 결제하시겠습니까?')
    navigate('/order')
  }

  return(
    <div className='bottom-fix'>
      {
        currentPos === 'cart' ? (
          <>
            장바구니
          </>
        ) : (
          <>
            결제
          </>
        )
      }
    </div>
  );
}
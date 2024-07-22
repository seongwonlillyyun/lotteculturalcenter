import React, { useState } from 'react';
import Checkbox from '../components/cart/Checkbox';
import CartList from '../components/cart/CartList';
import ButtonWhite from '../components/cart/ButtonWhite';
import PayBottom from '../components/cart/PayBottom';
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import CheckContext, {CheckboxProvider} from '../components/cart/CheckboxContext';


export default function Cart() {
  const cartList = useSelector(state => state.cart.list);
  

  const navigate = useNavigate();
  const handleMore = () => {
    navigate('/'); //상품상세로 이동
  }

  
  // 체크박스 유효성검사
  const validateCheck = () => {




  }



  return(
    <CheckboxProvider>
      <div className='cart type'>
        <div className="sub_visual">
          <h2 className="heading">장바구니</h2>
          <p className='heading_sub'>장바구니에 담긴 강좌는 최대 30일까지 보관 됩니다.</p>
        </div>

        <div className='min_inner'>
          <div className='cart_num'><span>목록</span><span className='num'>{cartList.length}개</span></div>
          <div class="utils_box">
            <Checkbox title='전체선택' id='all' name='all' value='all' />
            <button type='button' class="delete_btn"><span>선택삭제</span></button>
          </div>

          <CartList />

          <div class="remove_btn">
            <button type='button'>장바구니 비우기</button>
          </div>
          <div className='text_box'>
            <h3>알려드립니다!</h3>
            <ul className='text_box_list'>
              <li>수강자가 본인이 아니거나 가족 수강자일 경우, 결제 페이지에서 수강자 변경 및 추가하실 수 있습니다.</li>
              <li>강좌 개강 후 ‘현장 상담’을 통해 수강등록 상담을 받으실 수 있습니다.</li>
              <li>신청하신 강좌는 최소 정원에 미달되거나 사정에 의해 폐강 될 수 있으니 양해 바랍니다.</li>
            </ul>
          </div>
          <div className='basic_btn'>
            <ButtonWhite name='강좌 더보기' color='btn_border medium' onClick={handleMore}/>     
          </div>
          
        </div>    

        {/* 하단고정 */}
        <PayBottom />
        
      </div>
    </CheckboxProvider>
    
  );
}
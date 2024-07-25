import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';

export default function PayBottom({cname, next, stepOrder, cartList, checkPrice, checkNum}) {
  const navigate = useNavigate();
  const currentPos = useSelector(state => state.cart.currentPos);
  const [isChecked, setIsChecked] = useState(false); // 결제페이지 체크박스




  // 장바구니 다음버튼
  const handleNext = () => {
    navigate('/order')
  }

  // 결제 체크여부
  const handleChange = (isChecked) => {
    if(isChecked){
      setIsChecked(true)
    }else{
      setIsChecked(false)
    }
  }

  // 결제 이전버튼
  const handlePrev = () => {
    navigate('/cart')
  }

  // 최종 결제버튼
  const handlePay = () => {
    if(isChecked === true){
      alert('선택한 강좌를 결제하시겠습니까?')
      next(stepOrder);
    }else{
      alert('구매동의에 동의하셔야 결제가 가능합니다. 구매 동의하시겠습니까?')
    }
  }

  return(
    <div className='bottom-fix '>
    {
    currentPos === cname ?  (
      <div className='min_inner'>
        <div className='total_price'>
            <span className='num'>{checkNum}<span>건</span></span>
            <span className='txt'>결제 예정금액</span>
            <span className='price'>{checkPrice}<span>원</span></span>
          </div>
        <div className='basic_btn'>
        <button type='button' className='btn btn_black large' onClick={handleNext}>45,000원 결제</button>
        </div> 
      </div>   
      ):
      (
        <div className='min_inner'>
          <div className='total_price'>
            <div class="form_checkbox">
              <input type="checkbox"
                    id='cartPay'
                    name='cartPay'
                    value='cartPay'
                    onChange={(e)=>handleChange(e.target.checked)}
              />
              <label htmlFor='cartPay'>위 내용을 모두 확인하였으며, 결제에 동의합니다.</label>
            </div>
        </div>  
          <div className='basic_btn'>
            <button type='button' className='btn btn_white medium' onClick={handlePrev}>이전</button>
            <button type='button' className='btn btn_black large' onClick={handlePay}>결제하기</button>
          </div>
        </div>   
      )
      }
    </div>
  );
}
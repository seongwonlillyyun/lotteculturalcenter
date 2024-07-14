import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonBlack from './ButtonBlack';
import ButtonWhite from './ButtonWhite';
import Checkbox from './Checkbox';



export default function PaymentBottom({cname, next}) {
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
      <div className='min_inner'>
          <div className='total_price'>
            {
              cname === 'order' ?
              
              <>
                <Checkbox title='위 내용을 모두 확인하였으며, 결제에 동의합니다.' />
              </>
              :
              <>
                <span className='num'>1<span>건</span></span>
                <span className='txt'>결제 예정금액</span>
                <span className='price'>60000<span>원</span></span>
              </>
            }
          </div>
          <div className='basic_btn'>
            {
              cname === 'order' ? 
                <>
                   <ButtonWhite name='이전' color='btn_white medium' onClick={handlePrev} />
                   <ButtonBlack name='45000원 결제' color='btn_black large' onClick={handleNext} />  
                </>
               
              : 
               <ButtonBlack name='결제하기' color='btn_black large' onClick={handlePay}/>
            }
          </div>
      </div>
    </div>
  );
}
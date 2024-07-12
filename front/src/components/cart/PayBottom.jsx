import React from 'react';
import ButtonBlack from './ButtonBlack';


export default function PaymentBottom() {
  return(
    <div className='bottom-fix'>
      <div className='min_inner'>
          <div className='total_price'>
            <span className='num'>1<span>건</span></span>
            <span className='txt'>결제 예정금액</span>
            <span className='price'>60000<span>원</span></span>
          </div>
          <div className='basic_btn'>
            <ButtonBlack name='결제하기' color='btn btn_black large' />
          </div>
      </div>
    </div>
  );
}
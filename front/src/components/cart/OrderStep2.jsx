import React from 'react';
import Tab from './Tab';


export default function OrderStep2({step}) {
  return(
    <div className='order type'>
      <div className="sub_visual">
        <h2 className="heading">수강결제</h2>
      </div>
      <div className='min_inner'>
        <div className='tab_list_box'>
          <Tab step={step} />
          <h2>수강신청이 정상적으로 완료되었습니다.</h2>
          <p>
            결제하신 강좌내역은 MY문화센터 - 수강내역 조회에서<br/> 
            수강내역 조회 및 취소, 수강증을 확인하실 수 있습니다.
          </p>
        </div>
       
        <h2 className='htitle'>총 결제금액</h2>
        <div className='order_line'>
          <ul className='all_pay'>
            <li>
                <h4>강좌료 합계</h4>
                <span><span className='num'>45000</span>원</span>
                <p>* 재료비 또는 대여료 옵션 금액을 제외한 원 강좌료 금액이 표시 됩니다.</p>
            </li>
            <li className='cir'>
              <span className='minus'></span>
            </li>
            <li>
                <h4>할인금액 합계</h4>
                <span>(<span className='num'>1000</span>) 원</span>
                <p>* 강좌료에서 할인받은 할인금액이 표시 됩니다.</p>
            </li>
            <li className='cir'>
              <span className='plus'></span>
            </li>
            <li>
                <h4 className='bold'>총 결제금액</h4>
                <span><span>45000</span>원</span>
            </li>
          </ul>
        </div>


      </div>
    </div>
  );
}
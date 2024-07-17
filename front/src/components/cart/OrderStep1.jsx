import React from 'react';
import PayBottom from './PayBottom';
import Tab from './Tab';
import CartList from './CartList';
import Checkbox from './Checkbox';



export default function OrderStep1({next, step}) {
  return(
    <div className='order type'>
      <div className="sub_visual">
        <h2 className="heading">수강결제</h2>
      </div>
      <div className='min_inner'>
        <Tab step={step} />  
        <h2 className='htitle'>수강자 정보</h2>
        <CartList cname={'order'}/>
        <CartList cname={'order'}/>
        <CartList cname={'order'}/>

        <div className='mid-line'></div>

        <h2 className='htitle'>할인혜택</h2>
        <div className='order_line'>
            <h3>L.POINT<span>보유 :<span className='num'>47</span>점</span></h3>
            <label htmlFor=''></label>
            <input type='text' id='' name='' placeholder='0점' />
            <button type='submit' className='submit_btn' >사용</button>
            <p>포인트 사용은 10점 단위로 사용 가능합니다.</p>
        </div>

        <h2 className='htitle'>총 결제금액</h2>
        <div className='order_line'>
          <ul className='all_pay'>
            <li>
                <h4>강좌료 합계</h4>
                <span><span className=''>45000</span>원</span>
                <p>* 재료비 또는 대여료 옵션 금액을 제외한 원 강좌료 금액이 표시 됩니다.</p>
            </li>
            <li className='cir'>
              <span className='minus'></span>
            </li>
            <li>
                <h4>할인금액 합계</h4>
                <span className='red'>(-)<span className=''> 1000</span> 원</span>
                <p>* 강좌료에서 할인받은 할인금액이 표시 됩니다.</p>
            </li>
            <li className='cir'>
              <span className='plus'></span>
            </li>
            <li>
                <h4 className='bold'>총 결제금액</h4>
                <span><span className='num'>45000</span>원</span>
            </li>
          </ul>
        </div>
        
        <h2 className='htitle'>결제수단</h2>
        <div className='order_line'>
            <h3>신용카드</h3>
            <ul className='text_box_list'>
              <li>바우처카드(롯데 아이행복카드, 국민 행복카드, BC 청년 디딤돌 카드, 디딤돌바우처카드 등)는 카드사 정책에 따라 다수강좌 묶음결제 시 추후 부분 취소가 불가합니다.</li>
              <li>충전식카드(복지카드, 포인트카드, 기프트카드 등)로 결제 시 추후 카드의 유효기간이 만료된 후에는 환불 처리가 불가합니다.</li>
            </ul>
        </div>

        <div className='text_box'>
          <h3>유의사항 안내</h3>
          <ul className='text_box_list'>
            <li>재료비가 있는 강좌의 경우 최소 3일 이전까지만 전액 환불 가능합니다.</li>
            <li>강좌의 환불은 학기 개강일 이전 전액 환불 및 변경이 가능하며, 다음학기로 강좌 연기는 불가능합니다.</li>
            <li>또한 강좌 개시일 이후 본인 사유에 의한 환불의 경우 소비자 분쟁해결기준(공정거래위원회 고시 제 2008-3호)에 의거하여 환불해 드립니다.</li>
            <li>
                1개월 이내 강좌
              <ul className='text_box_lists'>
                <li>수강시간 1/3 경과 전 환불 시 수강료 2/3 환급</li>
                <li>수강시간 1/2 경과 전 환불 시 수강료 1/2 환급</li>
                <li>수강시간 1/2 경과 후 수강료 미 환급</li>
              </ul>
            </li>
            <li>
                1개월 초과 강좌
              <ul className='text_box_lists'>
                <li>1개월 이내 강좌 기준 적용 + 잔여월 수강료 전액 환급</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className='order_line check'>
          <Checkbox />
          <span>주문내역 확인 동의 <button type='button'>보기</button></span>
        </div>
      </div>
      {/* 하단고정 */}
      <PayBottom cname={'order'} next={next} />
    </div>
  );
}
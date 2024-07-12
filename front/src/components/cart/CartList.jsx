import React from 'react';
import { Link } from 'react-router-dom';
import Checkbox from './Checkbox';


export default function CartList({cname}) {
  // console.log('cname=>', cname);
  return(
    <div className='cart_list'> {/* map으로 돌림 */}
      <ul className='cart_list_box'>
        <li>
          {
            cname === 'order' ? '' : <Checkbox id='list1' name='list1' />
          }
        </li>
        <li className='title'>
          <span className='deco'>접수중</span>
          <Link to={'/'}>
            <h2>제목 블루밍봉봉의 과일 듬뿍 썸머 팝시클 양갱 블루밍봉봉</h2>
          </Link>
        </li>
        <li className='info'>
          <dl>
            <dt>강사명</dt>
            <dd>정승연</dd>
          </dl>  
          <dl> 
            <dt>강좌정보</dt>
            <dd>2024.07.14 ~ 2024.07.14 <span>(일)</span> 15:00~17:00 / <span>1</span>회</dd>
          </dl>
          <dl>  
            <dt>강좌료</dt>
            <dd>60000</dd>
          </dl>
          <dl className='total'>  
            <dt>총금액</dt>
            <dd><span className='price'>60000</span>원</dd>
          </dl>
        </li>
      </ul>
        {
          cname === 'order' ? '' : <button type='button' className='delete_btn'>휴지통</button>
        }
    </div>
  );
}
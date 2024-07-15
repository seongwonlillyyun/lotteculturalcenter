import React from 'react';



export default function Tab({step}) {

  return(
    <ul className='tab_list'>
      <li className={ step === 1 ? 'active': ''}>
        <span>1</span>
        <h4>결제정보 확인</h4>
      </li>
      <li className={ step === 2 ? 'active': ''}>
        <span>2</span>
        <h4>수강신청 완료</h4>
      </li>
    </ul>
  );
}
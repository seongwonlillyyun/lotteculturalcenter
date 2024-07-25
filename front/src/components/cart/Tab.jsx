import React from 'react';



export default function Tab({stepOrder}) {

  return(
    <ul className='tab_list'>
      <li className={ stepOrder === 1 ? 'active': ''}>
        <span>1</span>
        <h4>결제정보 확인</h4>
      </li>
      <li className={ stepOrder === 2 ? 'active': ''}>
        <span>2</span>
        <h4>수강신청 완료</h4>
      </li>
    </ul>
  );
}
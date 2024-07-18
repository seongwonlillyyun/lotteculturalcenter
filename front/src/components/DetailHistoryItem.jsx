import React, {useState} from 'react';

export function DetailHistoryItem(){


    return(
<div className='detailhistory_item'>
    <div className='detailhistory_item_top'>
    <div className='detailhistory_item_top_left'>
        <ul>
            <li className="detailhistory_item_branch">강남점</li>
            <li className="detailhistory_item_course">[7/13]윤주코치의 바른 자세를 만드는 다리 찢기 스트레칭</li>
        </ul>
                </div>
        <div className="detailhistory_item_top_right">
        <ul>
            <li>
                <p className="detailhistory_item_category">강사명</p>
                <span>옥윤주</span>
            </li>
            <li>
                <p className="detailhistory_item_category">학기명</p>
                <span>2024년 여름학기</span>
            </li>
            <li>
                <p className="detailhistory_item_category">강좌정보</p>
                <span>2024.07.13~2024.07.13(토) 18:00~19:00 / 1회</span>
            </li>
            <li>
                <p className="detailhistory_item_category">강좌료</p>
                <span>10,000원</span>
            </li>
            </ul>    
        </div>
            </div>

<div className='detailhistory_item_bottom'>
<div className="detailhistory_item_bottom_left">
    {/* <input type="checkbox" checked={isChecked} /> */}
    <span className="detailhistory_bottom_name">테스트씨</span>
    </div>

<div className="detailhistory_item_bottom_right">
<ul>
    <li>
    <p className="detailhistory_item_bottom_right_subject">접수상태</p>
    <p className='detailhistory_item_bottom_right_value'>결제완료</p>
    </li>
    <li>
    <p className="detailhistory_item_bottom_right_subject">주문금액</p>
    <p>10,000원</p>
    </li>
</ul>
</div>
</div>

</div>
    )
}

import React from 'react';

export function DetailHistoryItem({courseInfo}){
    
console.log('detail : courseInfo->',courseInfo);

return(

<div className='detailhistory_item'>
{courseInfo.status==='결제완료'&&
    <>

    <div className='detailhistory_item_top'>
    <div className='detailhistory_item_top_left'>
        <ul>
            <li className="detailhistory_item_branch">{courseInfo.name}</li>
            <li className="detailhistory_item_course">{courseInfo.course_name}</li>
        </ul>
                </div>
        <div className="detailhistory_item_top_right">
        <ul>
            <li>
                <p className="detailhistory_item_category">강사명</p>
                <span>{courseInfo.teacher_name}</span>
            </li>
    
            <li>
                <p className="detailhistory_item_category">강좌정보</p>
                <span className='detailhistory_item_value'>{courseInfo.course_start} ~ {courseInfo.course_start}  </span>
                <span className='detailhistory_item_value'>  {courseInfo.start_time} ~ {courseInfo.end_time} / {courseInfo.cnumber}회</span>
            </li>
            <li>
                <p className="detailhistory_item_category">강좌료</p>
                <span>{courseInfo.price}원</span>
            </li>
            </ul>    
        </div>
            </div>

<div className='detailhistory_item_bottom'>
<div className="detailhistory_item_bottom_left">
    <span className="detailhistory_bottom_name">{courseInfo.user_name}</span>
    </div>

<div className="detailhistory_item_bottom_right">
<ul>
    <li>
    <p className="detailhistory_item_bottom_right_subject">접수상태</p>
    <p className='detailhistory_item_bottom_right_value'>결제완료</p>
    </li>
    <li>
    <p className="detailhistory_item_bottom_right_subject">주문금액</p>
    <p className='detailhistory_item_bottom_right_value'>{courseInfo.price}원</p>
    </li>
</ul>
</div>
</div>
</>}

{courseInfo.status ==='결제취소' &&
    <>
        <div className='detailhistory_item_top'>
    <div className='detailhistory_item_top_left'>
        <ul>
            <li className="detailhistory_item_branch">{courseInfo.name}</li>
            <li className="detailhistory_item_course">{courseInfo.course_name}</li>
        </ul>
                </div>
        <div className="detailhistory_item_top_right">
        <ul>
            <li>
                <p className="detailhistory_item_category">강사명</p>
                <span>{courseInfo.teacher_name}</span>
            </li>
        
            <li>
                <p className="detailhistory_item_category">강좌정보</p>
                <span className='detailhistory_item_value'>{courseInfo.course_start} ~ {courseInfo.course_start}  </span>
                <span className='detailhistory_item_value'> {courseInfo.start_time} ~ {courseInfo.end_time} / {courseInfo.cnumber}회</span>
            </li>
            <li>
                <p className="detailhistory_item_category">강좌료</p>
                <span >{courseInfo.price}원</span>
            </li>
            </ul>    
        </div>
            </div>

<div className='detailhistory_item_bottom'>
<div className="detailhistory_item_bottom_left">
    <span className="detailhistory_bottom_name">{courseInfo.user_name}</span>
    </div>

<div className="detailhistory_item_bottom_right">
<ul>
    <li>
    <p className="detailhistory_item_bottom_right_subject">접수상태</p>
    <p className='detailhistory_item_bottom_right_value'>결제취소</p>
    </li>
    <li>
    <p className="detailhistory_item_bottom_right_subject">취소(환불)일</p>
    <p className='detailhistory_item_bottom_right_value'>{courseInfo.cancel_date}</p>
    </li>
    <li>
    <p className="detailhistory_item_bottom_right_subject">취소(환불)금액</p>
    <p className='detailhistory_item_bottom_right_value'>{courseInfo.price}원</p>
    </li>
    <li>
    <p className="detailhistory_item_bottom_right_subject">취소(환불)사유</p>
    <p className='detailhistory_item_bottom_right_value'>{courseInfo.cancel_info}</p>
    </li>

</ul>
</div>
</div>
    </>
}


</div>
    )
}

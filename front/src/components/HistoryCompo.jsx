
import React, { useState, useRef} from 'react'
import { getUser } from '../util/localStorage';
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faExclamation } from "@fortawesome/free-solid-svg-icons/faExclamation";

import axios from 'axios';


export function TopInfo(){
return(
    <>
    <ul className="topinfo_texts">
        <li>- 데스크에서 접수한 강좌의 경우 방문 시에만 취소 가능합니다. (결제한 카드 및 영수증 지참 필수)</li>
        <li>- 카드결제 취소 처리의 경우 환불 접수 후 실제 취소 승인은 카드사 사정에 따라 처리 기간이 상이할 수 있습니다.</li>
        <li>- 재료 준비가 필요한 일부 강좌(요리, 공예, 플라워 등)는 강좌 시작일의 3일 전까지 취소 가능합니다.</li>
        <li>- 강의시작일 이후 취소 시에는 환불규정에 의거하여 환불 차감액을 제외한 나머지 금액이 부분환불 됩니다.</li>
        <li>- 결제/취소관련 문의는 1:1문의 이용 또는 유선으로 가능합니다.</li>
    </ul>
</>
)
}



export function HistoryForm({courseInfo, cancelInfo, setCancelInfo, setCourseInfo}){
    
    // console.log('status->', courseInfo.length)
    // console.log('tvalue->',tvalue);
    // const [itemList, setItemList] = useState([])
    const [tab, setTab]=useState({"title": "수강내역 조회",
                                    "value" : "register"})
    // const [tab, setTab] = useState(tvalue)

    const handleTabClick = (value) => {
    if(value==='register'){
        setTab( {"title": "수강내역 조회",
                 "value" : "register"})
    }else{
        setTab({"title": "취소내역 조회",
              "value" : "cancel"})
    }
        // console.log('tab->', tab);
        }

    const typeList = [
                {"title": "수강내역 조회",
                "value" : "register"
                },
                {"title": "취소내역 조회",
                "value" : "cancel"}]

const refs = {searchRef : useRef(null)}

const [searchInfo, setSearchInfo] = useState("")

const handleChange =(e) =>{
setSearchInfo(e.target.value)}

const userInfo = getUser();

const handleSearch =(e)=>{
    e.preventDefault()
  
    const url = 'http://127.0.0.1:8080/history/search'
    axios({
        method : 'post',
        url : url,
        data : {course_name : searchInfo, 
                user_id : userInfo.user_id}
    })
    .then(result=>{
        setCourseInfo(result.data)
        refs.searchRef.current.value=''})
    .catch(error=>console.log(error))
}

const handleCancleSearch =(e)=>{
    e.preventDefault()

    const url = 'http://127.0.0.1:8080/history/searchcancel'
    axios({
        method : 'post',
        url : url,
        data : {course_name : searchInfo, 
                user_id : userInfo.user_id}
    })
    .then(result=>{
        setCancelInfo(result.data)
        refs.searchRef.current.value=''})
    .catch(error=>console.log(error))
}



return(
<div className="coursehistory_form">
<div className='history_mid_center'>
<nav className="history_btns">
    {typeList.map(item=>(
    <button className={item.value === tab.value ?'history_btn_active' :'history_btn'}
            type='button' value={item.value} onClick={()=>handleTabClick(item.value)}>
                {item.title}</button>
    ))}
    </nav>


{tab.value ==='register' &&
    <form className='history_search_div' onSubmit={handleSearch}>
         <input type="text" className="history_search" 
            placeholder="강좌명으로 검색하세요" 
            onChange={handleChange} ref={refs.searchRef}/>
    <FontAwesomeIcon icon={faMagnifyingGlass} className='history_search_icon' 
                    onClick={handleSearch}/></form> }

{tab.value ==='cancel' &&
    <form className='history_search_div' onSubmit={handleCancleSearch}>
         <input type="text" className="history_search" 
            placeholder="강좌명으로 검색하세요" 
            onChange={handleChange} ref={refs.searchRef}/>
    <FontAwesomeIcon icon={faMagnifyingGlass} className='history_search_icon' 
                    onClick={handleCancleSearch}/></form>
                }
    </div>


<div className="">
    <div className="history_mid">
        <div> <span>전체</span>
            {tab.value ==='register' &&
                 <span> {courseInfo.length}</span>}
          {tab.value ==='cancel' &&
                 <span> {cancelInfo.length}</span>}
            <span>개</span></div>
    </div>
    


    <div className="history_content">


        {tab.value === 'register' && (!courseInfo.length
        ?<div className='noresult_div'>
            <FontAwesomeIcon icon={faExclamation} className='noresult_icon'/>
             <p className='noresult_text'>검색결과가 없습니다.</p></div>
  
        :<><HistoryItem courseInfo={courseInfo} tab={tab}/></>)}

        {tab.value === 'cancel' && (!cancelInfo.length
       ?<div className='noresult_div'>
        <FontAwesomeIcon icon={faExclamation}  className='noresult_icon'/>
        <p className='noresult_text'>검색결과가 없습니다.</p></div>
        :<><HistoryItem cancelInfo={cancelInfo} tab={tab}/></>)}
    </div>
</div>
        </div>
    )
}





export function HistoryItem({tab, courseInfo, cancelInfo}){

    const navigate = useNavigate()

    const handleDetail = (e) => {
        const btnNo = e.target.name
        // console.log('btnNo->', btnNo);
        navigate(`/courseHistory/${btnNo}`)
        // navigate(`/courseHistory/${courseInfo.orderId}`)
    }

// console.log('course.length=>',courseInfo.length);
// console.log('cancel.length=>',cancelInfo);

  return(
<div className='history_item_total'>


 {tab.value === 'register' && 
 <>{courseInfo.map((info,index)=>(
    <div className="history_item" key={index}>
    <div className="history_item_top">
        <div className="history_item_top_left">
        <ul>
        <li><p className='history_item_top_subject'>주문번호</p>
             <span>{info.orderId}</span></li>
         <li> <p className='history_item_top_subject'>결제일</p>
             <span>{info.order_date}</span></li>
         </ul>
        </div>
    <button type="button" className="history_detail_btn"
            onClick={handleDetail} name={info.orderId} >내역보기</button>
    </div>

     <div className="history_item_mid">
    <ul>
    <li className="history_item_branch">{info.name}</li>
    <Link to> <li className="history_item_coursename" >
    {info.course_name}</li></Link>
    <li className="history_item_info">
    <span>{info.teacher_name}</span>
    </li>
    <li className="history_item_info">
    <span className='history_item_info2'>{info.course_start}~{info.course_end}
    </span>   
    <span className=''>{info.start_time}~{info.end_time} 
                / {info.cnumber}회</span>  </li>
    <li className="history_item_info">
    <span>강좌료 : </span>
    <span>{info.price}원</span></li>
     </ul>
    </div>
            
    <div className="history_item_bottom">          
        <ul className="history_item_bottom_ul">
            <li className="history_item_bottom_name">{info.user_name}</li>
            <li className="history_item_bottom_state">
            <span>접수상태</span>
            <span>결제완료</span>
            </li>
            <li className="history_item_bottom_price">
            <span>주문금액</span>
            <span>{info.price}원</span>
            </li>
        </ul>
           </div>
           </div>
           ))}
           </>
           }

 {tab.value === 'cancel' && 
 <>{cancelInfo.map((info,index)=>(
        <div className="history_item" key={index}>
            <div className="history_item_top">
                <div className="history_item_top_left">
                <ul>
                    <li>
                        <p className='history_item_top_subject'>주문번호</p>
                        <span>{info.orderId}</span></li>
                    <li>
                        <p className='history_item_top_subject'>결제일 </p>
                        <span>{info.order_date}</span></li>
                </ul>
                </div>
                <button type="button" className="history_detail_btn"
                        onClick={handleDetail} name={info.orderId} >내역보기</button>
            </div>

            <div className="history_item_mid">
                <ul>
                <li className="history_item_branch">{info.name}</li>
                <li className="history_item_coursename">{info.course_name}</li>
                <li className="history_item_info">
                <span>{info.teacher_name}</span>
                </li>
                <li className="history_item_info">
                <span className='history_item_info2'>{info.course_start}~{info.course_end}
                </span>   
                <span className=''>{info.start_time}~{info.end_time} 
                / {info.cnumber}회
                    </span> 
                  </li>
                <li className="history_item_info">
                    <span>강좌료 : </span>
                    <span>{info.price}원</span></li>
                </ul>
            </div>
            
    <div className="history_item_bottom">   
        <ul className="history_item_bottom_ul">
        <li className="history_item_bottom_name">{info.user_name}</li>
        <li className="history_item_bottom_state">
        <span>접수상태</span>
        <span>취소완료</span>
        </li>
        <li className="history_item_bottom_price">
        <span>취소(환불)금액</span>
        <span>{info.price}원</span>
        </li>
        </ul>
           </div>
           </div>
           ))}
           </>
           }

     </div>
    )
}

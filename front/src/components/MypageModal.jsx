import React,{useState} from "react";
import '../css/mypagemodal.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";


//! Mypage 모달! 
export function MypageModal({next, close,modalState}){
    
    return modalState ? (
<div className="mypage_modal_out">
    <div className="mypage_modal">
        <div className="mypage_head">
        <button type='button' className="mypage_logout">로그아웃</button>
        <button className="mypage_close_btn" 
            onClick={close}>×</button>
        </div>

    <div className="mypage_member">
    <p className="mypage_name">김미성</p>
    <FontAwesomeIcon icon={faAngleRight} />
    </div>
<div className="mypage_middle">
    <div className="mypage_middle_top">
    <div className="mypage_mybranch" onClick={next}>
        <p className="mypage_middle_top_subject">관심지점</p>
        <button className="mypage_middle_top_value" onClick={next}>중동점</button>
    </div>
    <div>
        <p className="mypage_middle_top_subject">POINT</p>
        <p className="mypage_middle_top_value">1200</p>
    </div>
    </div>
    <div className="mypage_blocks">
    <div className="mypage_block">
    <img src='/img/mypage/icon-mypage-class-cart.png' 
            className="mypage_img"/>
    <p className="mypage_block_subject">장바구니</p>
    <p className="mypage_block_value">0</p>
</div>
<div className="mypage_block">
    <img src='/img/mypage/icon-mypage-class-history.png' 
            className="mypage_img"/>
    <p className="mypage_block_subject">수강내역</p>
    <p className="mypage_block_value">0</p>
</div>
<div className="mypage_block">
    <img src='/img/mypage/icon-mypage-class-review-course.png' 
            className="mypage_img"/>
 
    <p className="mypage_block_subject">수강후기</p>
    <p className="mypage_block_value">0</p>
</div>


    </div>
    </div>
<div className="mypage_bottom">
    <div className="mypage_bottom_left">
    <FontAwesomeIcon icon={faPenToSquare} />
    <p className="mypage_bottom_text">1대1문의</p>
    </div>
    <FontAwesomeIcon icon={faChevronRight} className="mypage_arrow" />
</div>
    </div>
</div>
    ) : <></>
}


//! 나의 관심지점 
export function MyBranchModal({pre, close}){
    

    //todo. toggle 
    const [isOpen, setIsOpen] = useState({
        'seoul' : true,
        'metro' : true,
        'etc' :true
    })

// signup step1의 이벤트 부모에서 처리 부분에 있는 코드와 동일! 
    const handleToggle =(type) => {
        setIsOpen(toggle=>({
            ...toggle, [type]:!toggle[type]
        }))  
    } 



//todo. 지점별 버튼 


const handleClick= () => {}

return(
<div className="mypage_modal_out">
    <div className="mypage_modal">
        <div className="mybranch_head">
        <button onClick={pre}><FontAwesomeIcon icon={faArrowLeft} /></button>
        <button className="mypage_close_btn" onClick={close}>
            <img src="/img/mypage/btn-layer-popup-close-x.png" className="mypage_close_btn"/>
        </button>
        </div>
        <p className="mybranch_title">나의 관심지정 설정</p>

<div className="mybranch_info">
<p className="mybranch_info_key">관심 지정은 1개만 선택 가능합니다</p>
<p className="mybranch_info_text">설정하신 관심지정은 추천 강좌 안내 시에 활용되며, 관심 지점외에 지점에서 진행하는 강좌들도 정상적으로 수강 가능합니다.</p>
</div>

<div className="branch_total">

    <div className="branch_subject_dropdown">
        <p className="branch_subject">서울점</p>
        <button onClick={()=>handleToggle('seoul')}>
            <img src='/img/mypage/icon-dropdown-arrow.png' 
            className="mybranch_drop_img"/>
            </button>
            </div>
{isOpen.seoul && (
    <div className="branchs">
    <div className="branch_name">
        <button onClick={()=>handleClick()}>잠실점</button></div>
    <div className="branch_name">
    <button onClick={()=>handleClick()}>본점</button></div>
    <div className="branch_name">
    <button onClick={()=>handleClick()}>강남점</button></div>
    <div className="branch_name">
    <button onClick={()=>handleClick()}>건대스타시티점</button></div>
    </div>
)}


<div className="branch_subject_dropdown">
    <p className="branch_subject">수도권점</p>
    <button onClick={()=>handleToggle('metro')}>
    <img src='/img/mypage/icon-dropdown-arrow.png' 
        className="mybranch_drop_img"/></button>
    </div>
    {isOpen.metro && (
        <div className="branchs">
        <div className="branch_name">
        <button onClick={()=>handleClick()}></button>인천점</div>
        <div className="branch_name">
        <button onClick={()=>handleClick()}></button>동탄점</div>
        <div className="branch_name">
        <button onClick={()=>handleClick()}></button>구리점</div>
        <div className="branch_name">
        <button onClick={()=>handleClick()}></button>분당점</div>
        </div>
    )}



<div className="branch_subject_dropdown">
        <p className="branch_subject">지방점</p>
        <button onClick={()=>handleToggle('etc')}>
            <img src='/img/mypage/icon-dropdown-arrow.png' 
            className="mybranch_drop_img"/></button>
            </div>
            {isOpen.etc &&(
                <div className="branchs">
                <div className="branch_name">
                <button onClick={()=>handleClick()}></button>부산본점</div>
                <div className="branch_name">
                <button onClick={()=>handleClick()}></button>광복점</div>
                <div className="branch_name">
                <button onClick={()=>handleClick()}></button>광주점</div>
                <div className="branch_name">
                <button onClick={()=>handleClick()}></button>대구점</div>
                </div>
            )}


</div>

    </div>
</div>
    )
}


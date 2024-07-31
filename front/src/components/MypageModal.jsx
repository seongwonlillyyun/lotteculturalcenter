import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {getUser,removeUser} from '../util/localStorage'
import '../css/mypagemodal.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../modules/reduxMain";
import { getCount } from '../modules/reduxCartAxios.js';



//! Mypage 모달! 
export function MypageModal({next, close}){

    const navigate = useNavigate()

    const handleClickMember= ()=>{
        navigate('/changememberinfo');
        close()
    }

    const handleClickCart =()=>{
        navigate('/cart')
        close()
    }

    const handleClickHistory =()=>{
        navigate('/coursehistory')
        close()
    }

    const handleClickReview =()=>{
        navigate('/review')
        close()
    }

    const handleClickQna = () =>{
        navigate('/board/personal')
        close()
    }

    const handleLogout =()=>{
        removeUser();
        alert('로그아웃 되었습니다');
        navigate('/');
        close();
    }
     
//! 서버연동 
const [memberInfo, setMemberInfo]= useState({})
const userInfo = getUser() ? getUser() : {user_id : ""};
const userId = userInfo && userInfo.user_id;

useEffect(()=>{

    const url='http://127.0.0.1:8080/member/mypage'
    axios({
        method : 'post',
        url : url,
        data : {user_id : userInfo.user_id}
    })
    .then(res =>{
    setMemberInfo(res.data)
    })
    .catch(error=>console.log(error))
},[])

//! courseInfo => 수강내역수량 표시
const[courseInfo, setCourseInfo] =useState([])
useEffect(()=>{
    const url ='http://127.0.0.1:8080/history/list'
    axios({
        method : 'post',
        url : url,
        data : {user_id : userInfo.user_id }
    })
    .then(res =>setCourseInfo(res.data))
    .catch(error=>console.log(error))
},[])

// console.log('mypage => courseInfo.lenght',courseInfo.length);
// console.log('mypage => courseInfo',courseInfo);

//! review count
const [reviewNum, setReviewNum]= useState({})
useEffect(()=>{
    const url ='http://127.0.0.1:8080/history/reviewNo'

    axios({
        method :'post',
        url : url, 
        data : {user_id : userInfo.user_id }
    })
    .then(res=>setReviewNum(res.data))
    .catch(error=>console.log(error))
},[])

// console.log('mypage : reviewNum->', reviewNum);
const dispatch = useDispatch()
const count = useSelector(state => state.cart.count);
useEffect(()=>{ 
    dispatch(getCount(userId));
  },[userId])

return (
<div className="mypage_modal_out">
    <div className="mypage_modal">
        <div className="mypage_head">
        <button type='button' className="mypage_logout"
                onClick={handleLogout}>로그아웃</button>
        <button className="mypage_close_btn" 
            onClick={close}>×</button>
        </div>

    <div className="mypage_member">
        {/* //todo 회원정보 변경 코드 넣기  */}
        <button type="button" onClick={handleClickMember} className="member_change_btn">

        <p className="mypage_name">{memberInfo.user_name}</p>

        <FontAwesomeIcon icon={faAngleRight} className="mypage_name_arrow" /></button>
    </div>

<div className="mypage_middle">
    <div className="mypage_middle_top">
    <div className="mypage_mybranch" onClick={next}>
        <p className="mypage_middle_top_subject">관심지점</p>
        <button className="mypage_middle_top_value" onClick={next}>
            {memberInfo.name}</button>
    </div>
    <div>
        <p className="mypage_middle_top_subject">POINT</p>
        <p className="mypage_middle_top_value">{memberInfo.point}</p>
    </div>
    </div>
    <div className="mypage_blocks">
    <div className="mypage_block">
    <button type="button" onClick={handleClickCart}  className="mypage_block_btns">
    <img src='/img/mypage/icon-mypage-class-cart.png' 
            className="mypage_img"
            alt ='mypagecart'/>
    <p className="mypage_block_subject">장바구니</p>
    <p className="mypage_block_value">{count}</p>
    </button>
</div> 
<div className="mypage_block">
    <button type="button" onClick={handleClickHistory} className="mypage_block_btns">
    <img src='/img/mypage/icon-mypage-class-history.png' alt='mypagecoursehistory'
            className="mypage_img"/>
            
    <p className="mypage_block_subject">수강내역</p>
    <p className="mypage_block_value">{courseInfo.length}</p>
            </button>
</div>
<div className="mypage_block">
 <button type="button" onClick={handleClickReview} className="mypage_block_btns">
    <img src='/img/mypage/icon-mypage-class-review-course.png' alt='mypage review'
            className="mypage_img"/>
    <p className="mypage_block_subject">수강후기</p>
    <p className="mypage_block_value">{reviewNum.reviewNum}</p>
 </button>
</div>


    </div>
    </div>
<div className="mypage_bottom">
    <button type='button' onClick={handleClickQna} className="mypage_qna_btn">
        <div className="mypage_bottom_left">
        <FontAwesomeIcon icon={faPenToSquare} />
        <p className="mypage_bottom_text">1대1문의</p>
        </div>
         <FontAwesomeIcon icon={faChevronRight} className="mypage_arrow" />
    </button>
</div>
    </div>
</div>
    )
}


//! 나의 관심지점 변경페이지
export function MyBranchModal({pre, close, setStep}){
    
const navigate = useNavigate()

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

const [memberInfo, setMemberInfo]= useState({}) // memberInfo 호출용
const [btnData, setBtnData] =useState() // 초기관심지점용?
// console.log('memberInfo->', memberInfo);
const userInfo = getUser();
// console.log('userInfo->', userInfo);
const dispatch = useDispatch();

useEffect(()=>{
    const url='http://127.0.0.1:8080/member/mypage'
    axios({
        method : 'post',
        url : url,
        data : {user_id : userInfo.user_id}
    })
    .then(res =>{
    setMemberInfo(res.data)
    setBtnData(res.data.name) //오홍?!
})
    .catch(error=>console.log(error))
},[])

// console.log('mypage memberInfo->',memberInfo);




//! location table에서 location 정보불러서 버튼이름!보여주기
const [branchList, setBranchList]= useState([])
useEffect(()=>{
    const url='http://127.0.0.1:8080/member/branch'
    axios({
        method : 'post',
        url : url
    })
    .then(res =>{setBranchList(res.data)})
        .catch(error=>console.log(error))
},[])
// console.log('mypage branch->', branchList);

const seoul = branchList.filter((data) => data.type === "서울점");
const metro = branchList.filter((data) => data.type === "수도권점");
const etc = branchList.filter((data) => data.type === "지방점");
// console.log("seoul ==> ", seoul);
// console.log("metro ==> ", metro);
// console.log("etc ==> ", etc);

//! 버튼 클릭시 색상변경및 지점변경 
 const handleClick= (name) => {
    //  console.log('Clicked branchName->', name);
     setBtnData(name)
    }


const handleSubmit =()=>{
    const url = 'http://127.0.0.1:8080/member/branchupdate'
    axios({
        method :'post',
        url :url, 
        data : { user_id :memberInfo.user_id,
                name : btnData
        } 
    })
.then(result=>{
    if(result.data.cnt ===1)
        // console.log('update result->', result.data);
    alert('관심지점이 변경되었습니다.')
    close()
    setStep(1)
    navigate('/') 
    dispatch(updateUser());
})
.catch(error=>console.log(error))
}
// console.log('update->', btnData);


return(
<div className="mypage_modal_out">
    <div className="mypage_modal">
        <div className="mybranch_head">
        <button onClick={pre}><FontAwesomeIcon icon={faArrowLeft} /></button>
        <button className="mypage_close_btn" onClick={close}>
            <img src="/img/mypage/btn-layer-popup-close-x.png" alt="mypageclose" className="mypage_close_btn"/>
        </button>
        </div>
        <p className="mybranch_title">나의 관심지점 설정</p>

<div className="mybranch_info">
<p className="mybranch_info_key">관심 지점은 1개만 선택 가능합니다</p>
<p className="mybranch_info_text">설정하신 관심지점은 추천 강좌 안내 시에 활용되며, 관심 지점외에 지점에서 진행하는 강좌들도 정상적으로 수강 가능합니다.</p>
</div>

<div className="branch_total">
    <div className="branch_subject_dropdown">
        <p className="branch_subject">서울점</p>
        <button onClick={()=>handleToggle('seoul')}>
            <img src='/img/mypage/icon-dropdown-arrow.png' 
            className="mybranch_drop_img" alt='mypagedropdown'/>
            </button>
            </div>
{ isOpen.seoul && 
 (<div className="branchs">
        {seoul.map(item=>(
            <div className="">
            <button className={item.name === btnData ?'mypage_branch_btn_active' :'mypage_branch_btn'} 
                    key={item.loc_id} 
                    onClick={()=>handleClick(item.name)}>
                {item.name}</button>
            </div>
        ))
        }
    </div>
)}
{/* {isOpen.seoul && (
    <div className="branchs">
    <div className="branch_name">
    <button onClick={()=>handleClick('잠실점')}>잠실점</button></div>
    <div className="branch_name">
    <button onClick={()=>handleClick('본점')}>본점</button></div>
    <div className="branch_name">
    <button onClick={()=>handleClick('강남점')}>강남점</button></div>
    <div className="branch_name">
    <button onClick={()=>handleClick('건대스타시티점')}>건대스타시티점</button></div>
    </div>
)} */}


<div className="branch_subject_dropdown">
    <p className="branch_subject">수도권점</p>
    <button onClick={()=>handleToggle('metro')}>
    <img src='/img/mypage/icon-dropdown-arrow.png' 
        className="mybranch_drop_img"
        alt='mypagedropdown'/></button>
    </div>
    { isOpen.metro && 
 (<div className="branchs">
        {metro.map(item=>(
            <div>
             <button className={item.name === btnData ?'mypage_branch_btn_active' :'mypage_branch_btn'} 
            key={item.loc_id} 
                    onClick={()=>handleClick(item.name)}>
                {item.name}
            </button>
            </div>
        ))
        }
    </div>
)}


<div className="branch_subject_dropdown">
        <p className="branch_subject">지방점</p>
        <button onClick={()=>handleToggle('etc')}>
            <img src='/img/mypage/icon-dropdown-arrow.png' 
            className="mybranch_drop_img"
            alt='mypagedropdown'/></button>
            </div>
            { isOpen.etc && 
 (<div className="branchs">
        {etc.map(item=>(
              <div>
             <button className={item.name === btnData ?'mypage_branch_btn_active' :'mypage_branch_btn'} 
            key={item.loc_id} 
                    onClick={()=>handleClick(item.name)}>
                {item.name}
            </button>
            </div>
        ))
        }
    </div>
)}

</div>
<div className="branch_modal_btn_div">
    <button type='button' className="branchsave_btn" onClick={handleSubmit}>저장</button>
</div>
    </div>
</div>
    )
}


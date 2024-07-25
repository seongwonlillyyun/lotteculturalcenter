import React,{useState, useEffect} from "react";
import axios from "axios";
import '../css/changememberinfo.css'
import { getUser } from "../util/localStorage.js";

export default function ChangeMemberInfo(){
    
//todo 버튼 클릭시 회원정보 변경되는 이벤트 만들기
const [memberInfo, setMemberInfo]= useState({})

const userInfo = getUser();
console.log('userInfo->', userInfo);


useEffect(()=>{
const url = 'http://127.0.0.1:8080/member/mypage'
    axios({
        method : 'post',
        url : url,
        data : {user_id : userInfo.user_id}
    })
    .then(res => setMemberInfo(res.data))
    .catch(error=>console.log(error))
},[])

// const birthData = memberInfo.birth
// const birth = birthData.substring(0,10)

// console.log('birth->',birth);
console.log(memberInfo);


    return (
        <div className=''>
        <div className="sub_visual">
            <h2 className="heading">회원정보변경</h2>
            </div>

<div className="section basic_page min_inner">
    <p className='member_info_title'>회원정보</p>
    <div className='member_info'>
    <div className='member_info_left'>
        <ul>

        <li><span className='member_info_subject'>이름</span>
        <span className='member_info_value'>{memberInfo.user_name}</span></li>

        <li><p className='member_info_subject'>생년월일</p>
        <span className='member_info_value'>{memberInfo.birth}</span></li>

        <li><p className='member_info_subject'>휴대전화</p>
        <span className='member_info_value'>{memberInfo.phone}</span></li>



        </ul>
    </div>
    <div className='member_info_right'>
        <ul>
        <li><p className='member_info_subject'>아이디</p>
        <span className='member_info_value'>{memberInfo.user_id}</span></li>
        <li><p className='member_info_subject'>이메일</p>
        <span className='member_info_value'>{memberInfo.emailId}@{memberInfo.emailDomain}</span></li>
        <li><p className='member_info_subject'>주소</p>
        <span className='member_info_value'>{memberInfo.address}</span></li>
    </ul>
</div>
        </div>
        <div className='change_member_btn_div'>
            <button type='button' className='change_memeber_btn'>회원정보 변경</button>
        </div>

                </div>

        </div>
    )
}
import React, {useState, useRef } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import "../css/login.css"

//! 나중에 다른대로 이동?
import * as cookie from '../util/cookies.js'
import {jwtDecode} from 'jwt-decode'

//! 리덕스 용 
// import {useSelector, useDispatch} from 'react-redux';

export default function Login(){
    const userIdRef = useRef(null)
    const userPwRef = useRef(null)
    const [formData, setFormData] = useState({user_id: '', user_pw:''})

    // const dispatch = useDispatch(); 

    const handleChange =(event) => {
        const{name, value} =event.target                
        setFormData({...formData, [name]: value})
     }

const handleSubmit =(e) =>{
    e.preventDefault() 
    if(validationCheck()){
        // console.log('formData->', formData);
        const url = "http://127.0.0.1:8080/member/login"
    
        axios({
            method : "POST",
            url : url, 
            data : formData,
        })
        .then((res)=>{
            if(res.data.cnt ===1){
                cookie.setCookie('x-auth-jwt', res.data.token)

                const userInfo = jwtDecode(res.data.token)
                localStorage.setItem('userInfo', JSON.stringify(userInfo))
                alert('로그인 성공')
                navigate('/')
            }else{
                alert('아이디와 비밀번호를 재확인해 주세요')
                setFormData({user_id: '', user_pw:''})
                userIdRef.current.focus();
            }
        })
.catch((error)=>console.log(error))
    }
}


 const validationCheck =() =>{
    let checkFlag = true;

    if(!formData.user_id.trim()){
        alert('ID를 입력해주세요')
        checkFlag = false
        userIdRef.current.focus()
        return false
    }else if(!formData.user_pw.trim()){
        alert('비번을 입력해주세요')
        userPwRef.current.focus()
        checkFlag=false
    }else{ return checkFlag} }

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/join')}

return(
<div className="login main wrap">
    <div className ='login_left'>
    <div className="login_left_texts">
        <p className="login_left_title">롯데백화점 문화센터에 <br/>처음 오셨나요?</p>
        <p className="login_left_sub">수강신청 관련 서비스를 이용하시려면 롯데 회원에 가입해주세요.</p>
        <button type="button" className="login_join_btn" onClick={handleClick}>회원가입 </button>
     </div>
    </div>
    <div className ='login_right'>
        <div className="login_right_texts">
            <p className="login_right_title">로그인</p>
            <form className="login_form" onSubmit={handleSubmit}>
                <ul>
                 <li><input type="text" name="user_id" className="login_input login_input_id"
                 ref={userIdRef} value={formData.user_id} onChange={handleChange}
                 placeholder="아이디를 입력해주세요."/></li>
                 <li><input type="password" name="user_pw" className="login_input login_input_pw"
                 ref={userPwRef} value={formData.user_pw} onChange={handleChange}
                 placeholder="비밀번호를 입력해주세요."/></li>
                 <li><button className="login_btn">로그인</button></li>
                </ul>

            </form>
        </div>
        </div>
</div>

)

}
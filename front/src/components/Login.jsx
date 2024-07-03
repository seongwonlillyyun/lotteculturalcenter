import React, {useState, useRef, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import "../css/login.css"

export default function Login(){
    const userIdRef = useRef(null)
    const userPwRef = useRef(null)
    const [formData, setFormData] = useState({user_id: '', user_pw:''})

//! 로그인버튼클릭 -> 서버연동 
    const handleChange =(event) => {
        const{name, value} =event.target                
        setFormData({...formData, [name]: value})
     }

const handleSubmit =(e) =>{
    e.preventDefault() 
    validationCheck()
    console.log('formData->', formData);
}

 //! validationCheck 추후 이동예정  
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
    }else{
        return checkFlag}
    }

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/join')
    }

return(
<div className="login">
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
                 <li><input type="text" name="user_pw" className="login_input login_input_pw"
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
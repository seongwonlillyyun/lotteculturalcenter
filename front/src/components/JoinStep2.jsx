import React from "react";
import axios from 'axios';
import{useState, useRef} from 'react'
import { validateCheckStep2,pwCheck } from "../apis/validate.js";
import DaumPostCode from 'react-daum-postcode'

//! step2 정보입력 
export default function JoinStep2({next,pre,formData,handleChange, handleAddress}){

        const handleSubmit =() =>{
                validateCheckStep2(refs)
                pwCheck(refs)
                console.log('submit->', formData);

        }

const [isOpen, setIsOpen] = useState(false)
const handleToggle =() => {setIsOpen(!isOpen)}

// 주소관련 더 해야함 


const refs = {
    idRef : useRef(null), 
    pwRef : useRef(null), 
    repwRef : useRef(null), 
    nameRef : useRef(null), 
    emailIdRef : useRef(null), 
    emailDomainRef :useRef(null), 
    phoneNo2Ref : useRef(null), 
    zipcodeRef : useRef(null), 
    addressRef : useRef(null), 
    detailAddressRef : useRef(null)
} // Ref앞에 이름 formdata이름이랑 맞춰야하나? 

    return(
        <div>
            <div>
            <p>STEP2 </p>
            <p>짠! 벌써 마지막 단계입니다!</p>
            <p>회원가입에 필요한 정보를 입력해주세요</p>
            </div>
            <br/>
<form className="join_step2_form">
<p>회원정보입력 <span>*는 필수입력 항목입니다.</span></p>
<ul>
<li><span className="join_ess">*</span><label>아이디</label>
<input type="text" name="user_id" placeholder="4~12자, 영어, 숫자"
        value={formData.user_id} onChange={handleChange} ref={refs.idRef}/>
<button type="button" >중복확인</button> {/* 아이디 중복 체크 관련 */}</li>
<li><span className="join_ess">*</span><label>비밀번호</label>
<input type="text" name="user_pw" placeholder="비밀번호를 입력해주세요"
        value={formData.user_pw} onChange={handleChange} ref={refs.pwRef}/>
<input type="text" name="user_repw" placeholder="비밀번호를 다시한번 입력해주세요"
        value={formData.user_repw} onChange={handleChange} ref={refs.repwRef}/></li>
<li><span className="join_ess">*</span><label>이름</label>
<input type="text" name="user_name" placeholder="이름을 입력해주세요"
        value={formData.user_name} onChange={handleChange} ref={refs.nameRef}/></li>

<li><span className="join_ess">*</span><label>이메일</label>
<input type="text" name="emailId" placeholder="이메일을 입력해주세요"
        value={formData.emailId} onChange={handleChange} ref={refs.emailIdRef}/>
@
<input type="text" name="emailDomain" value={formData.emailDomain} 
        onChange={handleChange} ref={refs.emailDomainRef} />

<select name="emailDomain">
    <option value="self">직접입력</option>
    <option value="naver.com">네이버</option>
    <option value="gmail.com">구글</option>
    <option value="hanmail.net">한메일</option>
</select></li>


<li><span className="join_ess">*</span><label>휴대폰번호</label>
<select name="phoneNo1">
    <option>010</option>
    <option>011</option>
    <option>016</option>
    <option>018</option>
    <option>019</option>
</select>
<input type="text" placeholder="0000-0000" name="phoneNo2"
        value={formData.phoneNo2} onChange={handleChange} ref={refs.phoneNo2Ref}/></li>
<li>    
<label>주소</label>
<div>
<input type="text" name="zipcode" value={formData.zipcode} 
        onChange={handleChange} ref={refs.zipcodeRef}/>
<button type='button'>주소검색</button>
</div>

</li>
<li><label>생년월일</label>
<input type="date" name="birth" value={formData.birth}/></li> 

</ul>

<div>
        <button onClick={pre}>이전</button>
        <button onClick={handleSubmit} type='button'>가입완료</button>


</div>


</form>
        </div>
    )

}
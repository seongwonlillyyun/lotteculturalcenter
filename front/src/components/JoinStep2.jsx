import React from "react";
import axios from 'axios';
import{useState, useRef} from 'react'
import { validateCheckStep2,pwCheck, changeEmailDomain } from "../apis/validate.js";
import DaumPostCode from 'react-daum-postcode'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPeace } from "@fortawesome/free-solid-svg-icons/faHandPeace";



//! step2 정보입력 
export default function JoinStep2({next,pre,formData,handleChange, handleAddress}){

// const [selectDate, setSelectDate] = useState('')
// const handleDate=(e)=>{
//         setSelectDate(e.target.value)
// console.log('edate->', e.target.value);
// }

        const handleSubmit =() =>{
        if(validateCheckStep2(refs)){
                if(pwCheck(refs)){
                console.log('submit->', formData);
                alert('임시회원가입완료')
        //todo. 서버연동 추가 

                }
                }
        }

       //todo. ID 중복체크 하려면 또 서버연동.. {cnt :1 } 

const [isOpen, setIsOpen] = useState(false)
const handleToggle =() => {setIsOpen(!isOpen)}

//! DaumPostCode 
const themeObj = {
        bgColor: "#162525", //바탕 배경색
        searchBgColor: "#162525", //검색창 배경색
        contentBgColor: "#162525", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
        pageBgColor: "#162525", //페이지 배경색
        textColor: "#FFFFFF", //기본 글자색
        queryTextColor: "#FFFFFF", //검색창 글자색
        //postcodeTextColor: "", //우편번호 글자색
        //emphTextColor: "", //강조 글자색
        outlineColor: "#444444"
        }

const postCodeStyle = {
        width : '420px',
        height : '480px',
      }
// 검색해서 선택한 주소 
const completeHandler =(data) => {
        const {address, zonecode} = data;
        handleAddress({zipcode:zonecode, address:address})
}

const closeHandler =(state)=>{
        if(state === 'FORCE_CLOSE'){
         setIsOpen(false)
        }else if(state === 'COMPLETE_CLOSE'){
        setIsOpen(false)
        refs.detailAddressRef.current.value=''
        refs.detailAddressRef.current.focus()
        }
}


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
<div className="join_step2_total">
        
<div className="join_step2_top">
        <div className="join_titles">
        <img src="/img/join/step2.png" alt="join_img" className="join_img"/>
        <p className="join_step_title">회원정보입력</p>
        </div>

        <p className="join_step_desc">짠! 벌써 마지막 단계입니다!</p>
        <p className="join_step_text">회원가입에 필요한 정보를 입력해주세요</p>
</div>
            

<form className="join_step2_form">
        <div className="join_step2_subtitles">
<p className="join_step2_subtitle">회원정보입력 <span className="join_ess">(*는 필수입력 항목입니다.)</span></p>
        </div>
<ul>
        <li className="join_step2_item">
        <div className="join_step2_categories">
        <span className="join_ess">*</span>
        <p className="join_step2_category">아이디</p>
        </div>
        <div>
        <input type="text" name="user_id" placeholder="4~12자, 영어, 숫자" 
                className="join_step2_input"
                value={formData.user_id} onChange={handleChange} ref={refs.idRef}/>
        <button type="button" className="join_step2_dupli_btn" >중복확인</button> {/* 아이디 중복 체크 관련 */}
        </div>
        </li>

<li className="join_step2_item">
         <div className="join_step2_categories">
        <span className="join_ess">*</span>
        <label className="join_step2_category">비밀번호</label>
        </div>
        <input type="password" name="user_pw" placeholder="비밀번호를 입력해주세요"  
        className="join_step2_input"
        value={formData.user_pw} onChange={handleChange} ref={refs.pwRef}/>
        </li>

        <li className="join_step2_item">
         <div className="join_step2_categories">
        <span className="join_ess">*</span>
        <label className="join_step2_category">비밀번호 확인</label>
        </div>
        <input type="password" name="user_repw" placeholder="비밀번호를 다시한번 입력해주세요"  
        className="join_step2_input"
        value={formData.user_repw} onChange={handleChange} ref={refs.repwRef}/>
        </li>

<li className="join_step2_item">
<div className="join_step2_categories">
        <span className="join_ess">*</span>
        <label className="join_step2_category">이름</label>
        </div>        
<input type="text" name="user_name" placeholder="이름을 입력해주세요"  
        className="join_step2_input"
        value={formData.user_name} onChange={handleChange} ref={refs.nameRef}/></li>

<li className="join_step2_item">
<div className="join_step2_categories">
        <span className="join_ess">*</span><label className="join_step2_category">이메일</label>
        </div>
<div className="join_step2_email">
<input type="text" name="emailId" placeholder="이메일을 입력해주세요"  
        className="join_step2_input"
        value={formData.emailId} onChange={handleChange} ref={refs.emailIdRef}/>
        <p className="join_dat">@</p>
<input type="text" name="emailDomain" value={formData.emailDomain} 
        className="join_step2_input"
        onChange={handleChange} ref={refs.emailDomainRef} />


<select name="emailDomain" 
        className="join_step2_select join_stpe2_select_domain"
        onChange={(e)=>changeEmailDomain(e, refs, handleChange)}>
    <option value="self">직접입력</option>
    <option value="naver.com">네이버</option>
    <option value="gmail.com">구글</option>
    <option value="hanmail.net">한메일</option>
    <option value="daum.net">다음</option>
</select>
</div>
</li>


<li className="join_step2_item">
<div className="join_step2_categories">
        <span className="join_ess">*</span>
        <label className="join_step2_category">휴대폰번호</label>
        </div>
        
<div>
<select name="phoneNo1" className="join_step2_select join_stpe2_select_phone">
    <option>010</option>
    <option>011</option>
    <option>016</option>
    <option>018</option>
    <option>019</option>
</select>
<span className="join_step2_telbar">-</span>
<input type="text" placeholder="휴대폰번호 뒷자리를 입력해주세요" name="phoneNo2" 
        className="join_step2_input"
        value={formData.phoneNo2} onChange={handleChange} ref={refs.phoneNo2Ref}/>
</div>        
        </li>

<li className="join_step2_item">    
<label className="join_step2_category">주소</label>
<ul>
<li>
<span className="join_step2_address_text">우편번호</span>
<input type="text" name="zipcode"  className="join_step2_input join_stpe2_input_addr"
        value={formData.zipcode} onChange={handleChange} 
        ref={refs.zipcodeRef} placeholder="우편번호"/>
        <button type='button' onClick={handleToggle} className="join_addr_btn">우편번호 검색</button>
        </li>
<li>
<span className="join_step2_address_text addr_text_add">주소</span>
<input type="text" name="address" className="join_step2_input join_stpe2_input_addr"
        value={formData.address} ref={refs.addressRef} />
</li>
<li>
<span className="join_step2_address_text">상세주소</span>
<input type="text" name="detailAddress" value={formData.detailAddress} 
        className="join_step2_input join_stpe2_input_addr" ref={refs.detailAddressRef} 
        onChange={handleChange} placeholder="상세주소"/>
</li>
</ul>
{isOpen &&
        <div>
        <DaumPostCode className="join_postmodal" theme={themeObj} style={postCodeStyle}
        onComplete={completeHandler} onClose={closeHandler}/>
        </div>}

{/* 
<div>
        <label>우편번호</label>
<input type="text" name="zipcode"  className="join_step2_input"
        value={formData.zipcode} onChange={handleChange} 
        ref={refs.zipcodeRef} placeholder="우편번호"/>
<button type='button' onClick={handleToggle} className="join_addr_btn">우편번호 검색</button>
</div>
<span>주소</span>
<input type="text" name="address" 
value={formData.address} ref={refs.addressRef} className="join_step2_input"/>
<span>상세주소</span>
<input type="text" name="detailAddress" value={formData.detailAddress} 
        className="join_step2_input" ref={refs.detailAddressRef} 
        onChange={handleChange} placeholder="상세주소"/>
{isOpen &&
        <div>
        <DaumPostCode className="join_postmodal" theme={themeObj} style={postCodeStyle}
        onComplete={completeHandler} onClose={closeHandler}/>
        </div>} */}

</li>



<li className="join_step2_item"><label className="join_step2_category">생년월일</label>
<input type="date" name="birth" value={formData.birth} className="join_step2_input"
       onChange={handleChange} min="1900-01-01" max="2025-01-01"/></li> 
</ul>



</form>
<div className="join_btns">
        <button onClick={pre} className="join_pre_btn">이전</button>
        <button onClick={handleSubmit} type='button' className="join_next_btn">가입완료</button>
</div>
        </div>
    )

}
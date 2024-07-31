import React,{useState, useEffect, useRef} from "react";
import axios from "axios";
import '../css/changememberinfo.css'
import { getUser } from "../util/localStorage.js";
import { useNavigate } from "react-router-dom";
import DaumPostCode from 'react-daum-postcode'



export default function ChangeMemberInfo(){
const navigate = useNavigate();
const [memberInfo, setMemberInfo]= useState({})
const [showInput, setShowInput]= useState(false)

const userInfo = getUser();
// console.log('userInfo->', userInfo);

const [formData, setFormData] = useState({phone : '', address : '', user_id:'', zipcode :'' })

const updateValue = (e) => {
    const{name, value} = e.target;
    setFormData({...formData, [name]:value})
    }

// console.log(formData);

useEffect(()=>{
const url = 'http://127.0.0.1:8080/member/mypage'
    axios({
        method : 'post',
        url : url,
        data : {user_id : userInfo.user_id}
    })
    .then(res => {
        setMemberInfo(res.data)
        setFormData({phone : res.data.phone, 
                    address : res.data.address, 
                    zipcode : res.data.zipcode,  
                    user_id: res.data.user_id })
    })
    .catch(error=>console.log(error))
},[])

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

const postCodeStyle = {width : '420px', height : '480px',}

const handleAddress =(e) =>{
    setFormData({...formData, zipcode : e.zipcode, address:e.address})
}
// 검색해서 선택한 주소 
const completeHandler =(data) => {
        const {address, zonecode} = data;
        handleAddress({zipcode:zonecode, address:address})}

const closeHandler =(state)=>{
        if(state === 'FORCE_CLOSE'){
         setIsOpen(false)
        }else if(state === 'COMPLETE_CLOSE'){
        setIsOpen(false)
        refs.detailAddressRef.current.value=''
        refs.detailAddressRef.current.focus()
        }
}


const handleChange = () =>{
    setShowInput(true)
}

const handleSubmit =() => {
const url = 'http://127.0.0.1:8080/member/memberinfoupdate'

if(refs.detailAddressRef.current.value===''){
    alert('상세주소를 입력해주세요')
    refs.detailAddressRef.current.focus()
}else{
    axios({
        method :'post',
        url : url , 
        data : formData
    })
    .then(res=>{
        if(res.data.cnt ===1){  
            alert('회원 정보가 변경되습니다!')
            navigate('/') }
    })
    .catch(error=>console.log(error))}
}

const refs = { detailAddressRef : useRef(null)}

const handlePre =()=>{navigate('/')}

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

    {showInput 
    ? <li><p className='member_info_subject'>휴대전화</p>
    <input className='member_info_value member_info_update_phone' placeholder="000-0000-0000"
            type="text" value={formData.phone} onChange={updateValue} name='phone' /> </li>
    : <li><p className='member_info_subject'>휴대전화</p>
    <span className='member_info_value'>{memberInfo.phone}</span>
    </li>
    }

        </ul>

    </div>
    <div className='member_info_right'>
        <ul>
        <li><p className='member_info_subject'>아이디</p>
        <span className='member_info_value'>{memberInfo.user_id}</span></li>
        <li><p className='member_info_subject'>이메일</p>
        <span className='member_info_value'>{memberInfo.emailId}@{memberInfo.emailDomain}</span></li>
        
        {showInput
        ? <li>
        {/* <p className='member_info_subject'>주소</p> */}
        {/* <span className='member_info_value'>(기존주소){memberInfo.address}</span> */}

        <div className="member_info_update">
        <div>
        <p className='member_info_subject'>우편번호</p>
        <input type="text" name='zipcode' placeholder="우편번호" onChange={updateValue} 
            className="memeberinfo_update_input_zipcode" value={formData.zipcode}/>
        <button type='button' onClick={handleToggle} className="member_info_zipcode_btn">
                우편번호 검색</button>    
        </div>
        <div>
        <span className='member_info_subject'>주소</span>
        <input type="text" name='address' placeholder="주소" onChange={updateValue} 
            className="memeberinfo_update_input" value={formData.address}/>
        </div>
        <div>

        <span className='member_info_subject'>상세주소</span>
        <input type="text" name='detailAddress' placeholder="상세주소(직접입력)" 
                onChange={updateValue} ref={refs.detailAddressRef}
                className="memeberinfo_update_input"/>
        </div>
        </div>
        </li>
    
        :<li><p className='member_info_subject'>주소</p>
        <span className='member_info_value'>{memberInfo.address}</span></li>
       }
   
    </ul>
</div>
        </div>

        {isOpen &&
        <div className='postmodal_out' >
    
        <DaumPostCode className="join_postmodal" theme={themeObj} style={postCodeStyle}
        onComplete={completeHandler} onClose={closeHandler}/>

    </div>
    }

    <div className='change_member_btn_div'>    
    {showInput
     ?
     <div>
        <button type='button'  className='change_memeber_btn' 
        onClick={handlePre}>홈으로</button>
         <button type='button' className='change_memeber_btn_save'
         onClick={handleSubmit}>저장</button>
     </div>
      :<button type='button' className='change_memeber_btn'
                onClick={handleChange}>회원정보 변경</button>
    }
        
        </div>
                </div>

        </div>
    )
}
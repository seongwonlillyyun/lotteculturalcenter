//! 회원가입 step1 약관동의
export const validateCheckStep1 =(next, formData) => {
    if(!formData.membership){
        alert('필수항목인 회원약관에 동의해주세요')
        document.getElementById('membership').style.outline="1px solid red"
    }else if(!formData.personal){
        alert('필수항목인 개인정보 필수항목에 대한 수집 및 이용 약관에 동의해 주세요')
        document.getElementById('personal').style.outline="1px solid red"
    }else{
        next()
    }
}


//!  회원가입 step2 정보입력 
export const validateCheckStep2 =(refs) => {
    let checkFlag = true;
    if(refs.idRef.current.value === ''){
        alert('ID를 입력하여 생성해주세요')
        refs.idRef.current.focus()
        checkFlag=false
    }

    else if(refs.pwRef.current.value===''){
        alert('비밀번호를 입력하여 생성해주세요')
        refs.pwRef.current.focus()
        checkFlag=false;
    }
    else if(refs.repwRef.current.value===''){
        alert('비밀번호 확인란을 입력하여 생성해주세요')
        refs.repwRef.current.focus()
        checkFlag=false;
    }
    else if(refs.nameRef.current.value===''){
        alert('이름을 입력해 주세요')
        refs.nameRef.current.focus()
        checkFlag=false;
    }
    else if(refs.emailIdRef.current.value===''){
        alert('이메일 아이디를 입력해 주세요')
        refs.emailIdRef.current.focus()
        checkFlag=false;
    }
    else if(refs.emailDomainRef.current.value===''){
        alert('이메일 도메인을 입력/선택해 주세요')
        refs.emailDomainRef.current.focus()
        checkFlag=false;
    }
    else if(refs.phoneNo2Ref.current.value===''){
        alert('휴대전화 뒷번호를 입력해 주세요')
        refs.phoneNo2Ref.current.focus()
        checkFlag=false;
    }
    else if(refs.branchRef.current.value===''){
        alert('관심지점을 선택해 주세요')
        refs.branchRef.current.focus()
        checkFlag=false;
    }
    else if(refs.birthRef.current.value===''){
        alert('생년월일을 입력해 주세요')
        refs.birthRef.current.focus()
        checkFlag=false;
    }
    
return checkFlag
}

//! step2 비밀번호 확인 
export const pwCheck =(refs) => {
    let checkFlag = true ;
    const pw = refs.pwRef.current
    const repw = refs.repwRef.current

    if(pw.value !== repw.value){
        alert('암호가 불일치하니 재확인해주세요')
        pw.value='';
        repw.value ='';
        pw.focus();
        checkFlag=false;
    }
    return checkFlag
}

//! 이메일 도메인 관련 
// 옵션선택하면 input란에 나오게 하는 방법 
export const changeEmailDomain = (e, refs, handleChange) => {
    // const name = e.target.name;
    const value = e.target.value;
if(value === 'self'){
    refs.emailDomainRef.current.value = ''
    refs.emailDomainRef.current.focus()
}else{
    refs.emailDomainRef.current.value=value; 
    handleChange(e)}
}


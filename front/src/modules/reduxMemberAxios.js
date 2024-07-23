import {setIsLogin, setIsLogout} from '../reducers/memberReducer'
import {axiosGet, axiosPost} from './reduxAxios'

import * as cookie from '../util/cookies.js'
import {jwtDecode} from 'jwt-decode'

export const validationCheck = ({formData, useIdRef, usePwRef})=>{
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

//! Login

export function getIsLogin({formData}){

    const url = 'http://127.0.0.1:8080/member/login'
    const data = formData

    return async (dispatch)=>{
        const loginResult = await axiosPost({url, data})
        console.log('loginResult->', loginResult); // loginResult :{cnt :1, token : xxxxx }

        const cnt = loginResult.cnt

        if(cnt ===1){
            cookie.setCookie('x-auth-jwt',loginResult.token)
            const userInfo = jwtDecode(loginResult.token)
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            
            dispatch(setIsLogin({cnt})) //{1}
       
        }
    }
}

//! 로그아웃 
export function getIsLogout(){
    return (dispatch)=>{
        dispatch(setIsLogout())
    }
}
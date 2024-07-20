import {db} from '../db/database_mysql80'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//!  회원가입, 로그인처리
export const getLogin =async (user_id, user_pw)=>{
    console.log('repository ->', user_id, user_pw);

}

//! ID  중복체크
//! 회원가입
export const getJoin = async(formData)=>{
let result_row = 0;
console.log('formData->', formData);

    // 휴대전화 번호010-0000-0000 구조 
     let phone1 = formData.telnum1
     let phone2 = ''
     let phone3 = ''
}
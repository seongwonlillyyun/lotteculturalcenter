import {db} from '../db/database_mysql80.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//!  로그인처리
export const getLogin =async (user_id, user_pw)=>{
    console.log('repository ->', user_id, user_pw);

    let login_result = 0;
    let login_token ='';

    const sql = `
select count(user_id) cnt, any_value(user_pw) user_pw 
from lotte_member where user_id=?
`
try {
    const [result] = await db.execute(sql,[user_id])
    console.log('login result->>', result[0].cnt) // 1
    console.log('login result[0]->>', result[0]) // [{cnt:1, pass:~~~}]

    if(result[0].cnt ===1){
        // const pwCheck = bcrypt.compareSync(user_pw, result[0].user_pw)
        if(bcrypt.compareSync(user_pw, result[0].user_pw))
            login_result =1 ;

        //todo. 토큰 생성하기! 
        login_token = jwt.sign({user_id : user_id},'aG9uZw==')
        console.log('token->', login_token);
    }
} catch (error) {
    
}return{
    cnt : login_result,
    token : login_token
}


}

//! ID  중복체크
 export const getIdCheck = async(user_id)=>{
    const sql =`
    select count(user_id) cnt from lotte_member where user_id=?
    `;
return db.execute(sql, [user_id])
        .then((result)=>result[0][0])
 }



//! 회원가입
export const getJoin = async(formData)=>{
let result_rows = 0;


    //todo  휴대전화 합치기! 010-1234-5678 형태 
    const phoneNum = formData.phoneNo1.concat('-',formData.phoneNo2,'-',formData.phoneNo3) 
    // console.log('phoneNum->', phoneNum);
    //  let phone1 = formData.phoneNo1
    //  let phone2 = ''
    //  let phone3 = ''

    //  if(formData.phoneNo2.length === 8){
    //      phone2 = formData.phoneNo2.slice(0,4)
    //      phone3= formData.phonNo3.slice(4)
    //  }else{
    //      phone2= formData.phoneNo2.slice(0,3)
    //      phone3= formData.phoneNo3.slice(3)
    //  }
    //  console.log('phone ->', phone1.concat('-',phone2,'-',phone3));


     console.log('join Result-->', formData);
     
     //! DB 연동
const params = [
    formData.user_id, 
    bcrypt.hashSync(formData.user_pw, 9), // formData.user_pw ,   bcrypt.hashSync(formData.user_pw,7)
    formData.user_name, 
     phoneNum, //전화번호 
     formData.emailId,
     formData.emailDomain, 
     // 관심지점 
     formData.address.concat(' ',formData.detailAddress),
     formData.zipcode,
     formData.birth,
     // 포인트
]
console.log('params-->', params);
console.log('params : formData.user_pw-->', formData.user_pw);
console.log('parmas : hash-->',bcrypt.hashSync(formData.user_pw,9));

     const sql = `
   insert into lotte_member(user_id ,user_pw, 
                            user_name, phone, 
                            emailId, emailDomain, 
                            address, 
                            zipcode, birth, 
                            join_date) 
 values(?,?,?,?,
        ?,?,?,?,
        ?,now())`;

     try{
        const [result] = await db.execute(sql, params);
        result_rows = result.affectedRows;
        console.log('rows->', result.affectedRows);  
     }catch(error){
        console.log(error);
     }

return {cnt : result_rows} // 


     // 비번 암호화 테스트
    //  const hpass = bcrypt.hashSync(formData.user_pw,7)
    //  console.log('hash->', hpass);
    //  console.log('hash length ->', hpass.length);
     
     

    }


import {db} from '../db/database_mysql80.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//!  로그인처리
export const getLogin =async (user_id, user_pw)=>{
    // console.log('repository ->', user_id, user_pw);

    let login_result = 0;
    let login_token ='';

    const sql = `
select count(user_id) cnt, any_value(user_pw) user_pw 
from member where user_id=?
`
try {
    const [result] = await db.execute(sql,[user_id])
    // console.log('login result->>', result[0].cnt) // 1
    // console.log('login result[0]->>', result[0]) // [{cnt:1, pass:~~~}]

    if(result[0].cnt ===1){
        // const pwCheck = bcrypt.compareSync(user_pw, result[0].user_pw)
        if(bcrypt.compareSync(user_pw, result[0].user_pw))
            login_result =1 ;

        //todo. 토큰 생성하기! 
        login_token = jwt.sign({user_id : user_id},'aG9uZw==')
        // console.log('token->', login_token);
    }
} catch (error) {
    
}return{
    cnt : login_result,
    token : login_token
}}

//! ID  중복체크
 export const getIdCheck = async(user_id)=>{
    const sql =`
    select count(user_id) cnt from member where user_id=?
    `;
return db.execute(sql, [user_id])
        .then((result)=>result[0][0])
 }



//! 회원가입
export const getJoin = async(formData)=>{


    const phoneNum = formData.phoneNo1.concat('-',formData.phoneNo2,'-',formData.phoneNo3) 
    //  console.log('join Result-->', formData);
    const pw = bcrypt.hashSync(formData.user_pw,7);
    const user_address =formData.address.concat(' ',formData.detailAddress)

     //! DB 연동
     //todo. params에 넣은 순서랑 sql에 넣은 순서랑 동일해야함 + params안에서는 로직수행하지 않도록 하기   
const params = [
    formData.user_id, 
    pw, // formData.user_pw ,
    formData.user_name,
     phoneNum, //전화번호 
     formData.emailId,
     formData.emailDomain, 
     formData.name, 
     formData.birth,
     user_address,
     formData.zipcode,
     // 포인트
]
// console.log('params-->', params);
// console.log('params : formData.user_pw-->', formData.user_pw);
// console.log('parmas : hash-->',bcrypt.hashSync(formData.user_pw,7));

     const sql = `
   insert into member(user_id ,user_pw, 
                            user_name, phone, 
                            emailId, emailDomain, 
                            name, birth, 
                            address, zipcode, 
                            join_date) 
     values(?,?,?,?,
        ?,?,?,?,
        ?,?,now())`;

        let result_rows = 0;

     try{
        const [result] = await db.execute(sql, params);
        result_rows = result.affectedRows;
        // console.log('rows->', result.affectedRows);  
     }catch(error){
        console.log(error);
     }

return {cnt : result_rows} 


     // 비번 암호화 테스트
    //  const hpass = bcrypt.hashSync(formData.user_pw,7)
    //  console.log('hash->', hpass);
    //  console.log('hash length ->', hpass.length);

    }

//!  mypage, 관심지점 정보 부르기  
export const memberInfoCheck = async(user_id)=>{

    const sql =`
    select user_name, user_id, emailId, emailDomain, left(birth,10) birth, address, phone, 
    name, point, zipcode 
    from member where user_id =?
    `
    return db.execute(sql,[user_id])
        .then(result=>result[0][0])
}

//! 회원정보 변경 
export const memberInfoUpdate = async(formData)=>{
// console.log('reposi->',formData.address);
// console.log('reposi->',formData.detailAddress);
const updateAddress = formData.address.concat(' ',formData.detailAddress)

    const sql = `
    update member set zipcode=?, address =?, phone =? where user_id =?
    `
    const params = [
        formData.zipcode,
        updateAddress,
        formData.phone, 
        formData.user_id
    ]

    let result_rows = 0;

    try{
       const [result] = await db.execute(sql, params);
       result_rows = result.affectedRows;
       // console.log('rows->', result.affectedRows);  
    }catch(error){
       console.log(error);
    }return {cnt : result_rows} 

}


//! 지점이름 호출! 
export const branchCheck = async(name)=>{
    const sql=`
     select loc_id,type, name from location`

     return db.execute(sql,[name])
     .then(result=>result[0])
}

//! 관심지점 변경

export const branchUpdate = async(memberInfo)=>{
    const sql=`update member set name = ? where user_id=?
    `
    let result_rows = 0;
try{
    const[result]= await db.execute(sql,[memberInfo.name, memberInfo.user_id])
    result_rows=result.affectedRows;
    // console.log(result_rows);
}catch(error){ console.log(error);
}return{cnt: result_rows}
}
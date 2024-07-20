import * as repository from '../repository/memberRepository.js'

//! 로그인 
export const getLogin = async(req,res) => {
const {user_id, user_pw} = req.body;
const result = await repository.getLogin(user_id, user_pw)
console.log('result->', result);
res.json(result)
res.end()
}

//! ID 중복체크
export const getIdCheck = async(req, res)=>{
    const {user_id} = req.body
    const result = await repository.getIdCheck(user_id)
   res.json(result)
   res.end()
}

//! 회원가입 
export const getJoin = async(req,res)=>{
    const formData = req.body
    const result = await repository.getJoin(formData)
    res.json(result)
    res.end()
}
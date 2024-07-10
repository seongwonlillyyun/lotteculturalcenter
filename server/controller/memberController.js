import * as repository from '../repository/memberRepository.js'

//! 로그인 
export const getLogin = async(req,res) => {
const {user_id, user_pw} = req.body;
const result = await repository.getLogin(user_id, user_pw)
console.log('result->', result);
res.json(result)
res.end()
}
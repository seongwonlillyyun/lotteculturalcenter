import * as repository from '../repository/memberRepository.js'

//! 로그인 
export const getLogin = async(req,res) => {
const {user_id,user_pw} = req.body;
const result = await repository.getLogin(user_id,user_pw)
// console.log('controller : result->', result);
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

//! member table의 정보 호출!해서 보여주기
export const memberInfoCheck = async(req,res)=>{
    const{user_id} = req.body
    const result = await repository.memberInfoCheck(user_id)
    // console.log('controller->', result);
    
    res.json(result)
    res.end()
}

//! 회원정보 변경
export const memberInfoUpdate = async (req,res)=>{
    const formData = req.body
    const result = await repository.memberInfoUpdate(formData)
    
        // console.log('controller-> update ->>', result);
    
    res.json(result)
    res.end()
}




//! 지점이름 부르기~~
export const branchCheck =async(req,res)=>{
    const name = req.body;
    const result = await repository.branchCheck(name)
    res.json(result)
    res.end()
 }

 //! 관심지점 변경~
 export const branchUpdate =async(req,res)=>{
    const memberInfo  = req.body;
    // console.log('controller memberInfo_user_id->', memberInfo.user_id);
    const result = await repository.branchUpdate(memberInfo)
    res.json(result)
    res.end()
 }


import * as repository from '../repository/historyRepository.js'

//! 전체보여주기페이지 
export const getHistory = async(req,res)=>{
    //todo. 뭘로 부르지?
    const {user_id}= req.body
    const result = await repository.getHistory(user_id)
    res.json(result)
    res.end()
}
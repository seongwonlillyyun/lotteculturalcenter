import * as repository from '../repository/historyRepository.js'

//! 전체보여주기페이지 
export const getHistory = async(req,res)=>{
    const {user_id} = req.body
    const result = await repository.getHistory(user_id)
    // console.log('controller->', user_id);
    // console.log('controller->',result[0][0]);
    
    res.json(result)
    res.end()
}

//! 취소 전체 페이지
export const getCancelHistory = async(req,res)=>{
    const{user_id} = req.body
    const result = await repository.getCancelHistory(user_id)
    //  console.log('controller->',result[0]);
res.json(result)
res.end()
}

//! 내역보기 눌렀을때 상세페이지 (get방식! )
export const getHistoryDetail = async(req,res)=>{
    const orderId = req.params.orderId


const result = await repository.getHistoryDetail(orderId)
res.json(result)
res.end()
}

//! 결제취소하기! 
export const cancelHistory =async(req,res)=>{
    const cancelInfo = req.body;
    const result = await repository.cancelHistory(cancelInfo)
    // console.log('controller->', result); //{cnt : 0,1 }
    // console.log('controller : cancelInfo->', cancelInfo); // { orderId: '10', cancel_info: '강사불만' }
    res.json(result)
    res.end()
}

//! 검색하기 (결제완료건만)
export const searchHistory = async(req,res)=>{
const searchInfo = req.body;
const result = await repository.searchHistory(searchInfo)

    // console.log('controller: result==>', result );
    // console.log('controller : course->', searchInfo);

    res.json(result)
    res.end()
}

//! 검색하기 (결제취소건만)
export const searchCancelHistory = async(req,res)=>{
    const searchInfo = req.body;
    const result = await repository.searchCancelHistory(searchInfo)
    
        // console.log('controller: result==>', result );
        // console.log('controller Cancel : course->', searchInfo);
    
        res.json(result)
        res.end()
    }

//! 수강후기 수량 부르기
export const reviewNo = async (req,res) =>{
    const {user_id} = req.body;
    const result = await repository.reviewNo(user_id)
    
    // console.log('controller->result', result);


    res.json(result)
    res.end()
}

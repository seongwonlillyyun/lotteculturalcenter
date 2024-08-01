import {db} from '../db/database_mysql80.js'

//! 수강내역조회 
export const getHistory = async(user_id)=>{
const sql =`
select orderId, 
left(order_date,10) order_date, 
course_name, teacher_name,
left(course_start,10) course_start, 
left(course_end,10) course_end,
left(start_time,5) start_time, 
left(end_time,5) end_time,
cnumber,
format(price,0) price, 
name, user_name, status, isReviewed
from location lo, payment pa where lo.loc_id = pa.loc_id and user_id=? and status='결제완료'
`
return db.execute(sql, [user_id])
                .then(result=>result[0])
}


//!  취소내역 전체조회 
export const getCancelHistory = async(user_id)=>{
    const sql = `
select orderId, 
left(order_date,10) order_date, 
course_name, teacher_name,
left(course_start,10) course_start, 
left(course_end,10) course_end,
left(start_time,5) start_time, 
left(end_time,5) end_time,
cnumber,
format(price,0) price, 
name, user_name, status, isReviewed
from location lo, payment pa where lo.loc_id = pa.loc_id and user_id=? and status='결제취소'
`
return db.execute(sql, [user_id])
        .then(result=>result[0])
}

//! 내역보기 상세페이지
// get방식 : params 
export const getHistoryDetail = async(orderId)=>{
    // console.log('orderId->', orderId);
const sql =`select 
    left(order_date,10) order_date, 
    course_name, teacher_name, 
		name, 
		left(course_start,10) course_start, 
		left(course_end,10) course_end,
		left(start_time,5) start_time, 
		left(end_time,5) end_time,
		cnumber,
		format(price,0) price,  
		user_name, status, isReviewed,
        cancel_info, 
        left(cancel_date,10) cancel_date
    from location lo, payment pa where orderId=? and lo.loc_id = pa.loc_id`

    return db.execute(sql,[orderId])
            .then(result=>result[0][0])
}

//!  status 결제취소 만들기 
 export const cancelHistory = async(cancelInfo) =>{
    // console.log('repository cancelInfo->', cancelInfo); //> { orderId: '4', cancel_info: '강좌불만' }
    // console.log('repository : result_rows->', result_rows);
    
    const sql = ` 
update payment set status = '결제취소', cancel_info=?, cancel_date= now() where orderId = ?
`

    let result_rows = 0
    
    try {
        const[result] = await db.execute(sql,[cancelInfo.cancel_info,cancelInfo.orderId])
        result_rows=result.affectedRows;
    } catch (error) {console.log(error)
    } return {cnt : result_rows}

 }

 //! 수강내역 조회 검색창~
 export const searchHistory = async(searchInfo)=>{
    // console.log('repository-->', searchInfo.course_name);
    // console.log('repository-->searchInfo.user_id-->', searchInfo.user_id);

const sql =`
select orderId, 
left(order_date,10) order_date, 
course_name, teacher_name,
left(course_start,10) course_start, 
left(course_end,10) course_end,
left(start_time,5) start_time, 
left(end_time,5) end_time,
cnumber,
format(price,0) price, 
name, user_name, status
from location lo, payment pa where lo.loc_id = pa.loc_id and course_name like "%${searchInfo.course_name}%"
and pa.status ='결제완료' and pa.user_id=?
`
return db.execute(sql,[searchInfo.user_id])
     .then(result=>result[0])
 }


  //! 취소내역 조회 검색창~
  export const searchCancelHistory = async(searchInfo)=>{
    // console.log('repository-->', searchInfo.course_name);
    // console.log('repository-->', searchInfo.user_id);

const sql =`
select 
orderId, 
left(order_date,10) order_date, 
course_name, teacher_name,
left(course_start,10) course_start, 
left(course_end,10) course_end,
left(start_time,5) start_time, 
left(end_time,5) end_time,
cnumber,
format(price,0) price, 
name, user_name, status
from location lo, payment pa where lo.loc_id = pa.loc_id and course_name like "%${searchInfo.course_name}%"
and pa.status ='결제취소' and pa.user_id=?
`
return db.execute(sql,[searchInfo.user_id])
     .then(result=>result[0])
 }


 //! 수강후기 수량 불러오기
export const reviewNo = async(user_id) =>{
    const sql =`
    select count(*) reviewNum from payment where user_id =? and status='결제완료' and isReviewed= 0
    `
    return db.execute(sql, [user_id])
            .then(result=>result[0][0])
 }

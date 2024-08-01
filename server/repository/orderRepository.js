import { db } from "../db/database_mysql80.js";



// 결제내역 
export const getPayList = async(userId) => {
  const sql = `
    select price, total_price, point, order_no from payment
	    where user_id = ?
      order by order_date desc
  `;
  return db.execute(sql, [userId])
           .then(result => result[0])
}


// 회원 포인트 업데이트
export const usePoint = async(data) => {
  const sql = `
    update member set point = point-?
      where user_id = ?
  `;
  const [result] = await db.execute(sql, [data.point, data.userId]);
  const result_rows = result.affectedRows;
  // console.log('result_rows->', result_rows);
  return {'cnt' : result_rows};
        
} 

// 회원 포인트 가져오기
export const getPoint = async(userId) => {
  const sql = `
    select point from member
      where user_id = ?
  `
  return db
        .execute(sql, [userId])
        .then(result =>  result[0][0]
        )
} 

export const setPayment = async(cartItemList, total_price, point) => {
  let data = {};
  // 주문번호 랜덤생성 8자리
  let orderNum = '2024'+ Math.trunc(Math.random()* 9999)
  data.orderNum = orderNum;

  let sql = 
  `insert into payment (
    order_no , order_date, cart_id, loc_id, course_img, course_name, teacher_name,
    course_start, course_end, start_time, end_time, cnumber, price, total_price,
    point, user_name, user_id
)
select order_no , order_date, cart_id, loc_id, course_img, course_name, teacher_name,
    course_start, course_end, start_time, end_time, cnumber, price, total_price,
    point, user_name, user_id
from view_cart where course_id in ( `;

  cartItemList.map((item, index) => {
   (cartItemList.length-1 !== index) ? 
     sql += item.id + ',' : sql += item.id
  })
  sql += ')';

  // console.log('repository sql1111->', sql);

  const [resultStep1] = await db.execute(sql, []);
  const resultStep1Count = resultStep1.affectedRows; 
  if(resultStep1Count !== 0){
    const endRows = cartItemList.length;
    let sql2 = `
      select orderId
        from (select row_number() over(order by order_date desc) rno, orderId, order_date
        from (select orderId, order_date from payment) p1) p2
          where rno between 1 and ?
    `
    const orderIdList = await db.execute(sql2, [endRows])
                            .then(res => res[0]);

      // console.log('orderIdList->', orderIdList);
      if(orderIdList.length !== 0) {
        let sql3 = `
        update payment set total_price = ${parseInt(total_price.replace(',',""))}, point = ${point}, order_no = ${orderNum}
            where orderId in (
      `;
        orderIdList.map((item, index) => {
          (orderIdList.length-1 !== index) ? 
           sql3 += item.orderId + ',' : sql3 += item.orderId
        })

        sql3 += ')';
    
        // console.log('order repository', cartItemList, total_price, point, orderNum);
  
      const resultStep2 = await db.execute(sql3)
        .then(([rows]) => rows.affectedRows);
      // const resultStep2Count = resultStep2.affectedRows;
      // console.log('resultStep2Count fff->', resultStep2);

      data.result = (resultStep2 === cartItemList.length) ? true : false;

      }

  }

  return data;
} 


// 수강결제 리스트 (상세페이지에서 바로 결제)
export const getCourseList = async(cartItemList) => {
  let list = [];

  for(let i = 0; i < cartItemList.length; i++){
    const sql = `
      select
        course_id,
        status,
        l.name loc,
        course_name,
        teacher_name,
        course_week,
        date_format(course_start, "%Y-%m-%d") course_start,
        date_format(course_end, "%Y-%m-%d") course_end,
        time_format(start_time, "%H:%m") start_time,
        time_format(end_time, "%H:%m") end_time,
        format(price, 0) allprice
      from course c
        inner join location l on l.loc_id = c.loc_id
      where course_id = ${cartItemList[i].id};
    `;

    await db.execute(sql)
      .then(([rows]) => list.push(rows[0]));
  }

  return list;
}
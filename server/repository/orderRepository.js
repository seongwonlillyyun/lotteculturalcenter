import { db } from "../db/database_mysql80.js";


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
  // 주문번호 랜덤생성 8자리
  let orderNum = '2024'+ Math.trunc(Math.random()* 9999)



  let sql = 
  `insert into payment (
    order_no , order_date, cart_id, loc_id, course_img, course_name, teacher_name,
    course_start, course_end, start_time, end_time, cnumber, price, total_price,
    point, user_name, user_id, status
)
select order_no , order_date, cart_id, loc_id, course_img, course_name, teacher_name,
    course_start, course_end, start_time, end_time, cnumber, price, total_price,
    point, user_name, user_id, status
from view_cart where course_id in ( `;

  cartItemList.map((item, index) => {
   (cartItemList.length-1 !== index) ? 
     sql += item.id + ',' : sql += item.id
  })
  sql += ')';

  console.log('repository sql1111->', sql);

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
      console.log('orderIdList->', orderIdList);
      if(orderIdList.length !== 0) {
        let sql3 = `
        update payment set total_price = ${parseInt(total_price.replace(',',""))}, point = ${point}, order_no = ${orderNum}
            where orderId in (
      `;
      orderIdList.map((item, index) => {
        (orderIdList.length-1 !== index) ? 
          sql += item.orderId + ',' : sql += item.orderId
        })
        
        sql += ')';
    
        console.log('order repository', cartItemList, total_price, point, orderNum);
        console.log('sql->', sql);
  
      const [resultStep2] = await db.execute(sql3);
      const resultStep2Count = resultStep2.affectedRows; 
      console.log('resultStep2Count fff->', resultStep2Count);

      }

  }             
  
  
  
  // return db
  //       .execute(sql, [orderPriceAllPay, inputPoint, orderNum])
} 

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
import { db } from '../db/database_mysql80.js';


// 카트리스트
export const getCart = async(userId) => {
  // console.log('reposuitory user_id->', userId);
  const sql = `
   select row_number() over(order by c.cdate desc) as rno, c.user_id,
      c.cart_id,l.loc_id,c.course_id,l.name loc,cs.status, cs.course_name, cs.teacher_name,
      left(cs.course_start, 10) course_start, left(cs.course_end, 10) course_end, cs.course_week,
      left(cs.start_time, 5) start_time, left(cs.end_time, 5) end_time, cs.num_of_course, cs.price, format(cs.price, 0) as allprice
        from course cs, location l , cart c, member m
            where cs.loc_id = l.loc_id
                and cs.course_id = c.course_id
                and c.user_id = m.user_id
                and m.user_id = ?
  `;
  return db
          .execute(sql, [userId])
          .then(result => result[0])
}

// 카운트
export const getCount = async(userId) => {
  const sql = `
      select count(cart_id) count from cart
			  where user_id = ?
  `
  return db
          .execute(sql, [userId])
          .then(result => result[0][0]) // {count:1}
}

// 장바구니 체크 : 상품id랑 같은지 체크 -> 동일상품 없으면 카트에 추가
export const cartCheck = async(items) => {
  const sql = `
      select count(cart_id) cnt, cart_id cid, course_id id  from cart
	      where course_id = ? 
        group by cart_id
  `;
  return db
          .execute(sql, [items.id]) 
          .then(result => result[0][0])
}


// 카트 추가
export const insert = async(items) => {
  const checkResult = await cartCheck(items);
  
  let result_rows = 0;
  let sql = ``;

    if(checkResult === undefined){
      sql = `
          insert into cart(course_id, user_id, cdate) values(? , ? ,now())
        `
      const [result] = await db
                            .execute(sql, [items.id, items.userId])
                            
                            result_rows = result.affectedRows;
    }

    return {cnt : result_rows};
}

// 카트 삭제
export const remove = async(cartItemList) => {
  // console.log('cartItemList repository->', cartItemList);
  let sql = `delete from cart where course_id in ( `
   cartItemList.map((item, index) => {
    (cartItemList.length-1 !== index) ? 
      sql += item.id + ',' : sql += item.id
   })
   sql += ')';
  //  console.log('sql->', sql);
  //   let sql = `
  //   delete from cart where course_id in (${deleteArray}) 
  // `
  return db
          .execute(sql)
}
 
// 카트 전체삭제
export const removeAll = async(userId) => {
  console.log('userId', userId);
  let sql = `
    delete from cart where user_id = ?
  `
  return db
          .execute(sql, [userId])
          .then(result=> result[0].affectedRows)
}






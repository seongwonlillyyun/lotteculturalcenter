import { db } from '../db/database_mysql80.js';


// 리스트
export const getCart = async(userId) => {
  const sql = `
   select row_number() over(order by c.cdate desc) as rno, c.user_id,
      c.cart_id,l.loc_id,c.course_id,l.name loc,p.status, p.course_name, p.teacher_name,
      left(p.course_start, 10) course_start, left(p.course_end, 10) course_end, p.course_week,
        left(p.start_time, 5) start_time, left(p.end_time, 5) end_time, p.num_of_course, p.price
        from product p, location l , cart c, member m
          where p.loc_id = l.loc_id
                and p.course_id = c.course_id
                and c.user_id = m.user_id
  `
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





// 상품리스트
export const getProduct = async(product) => {
  const sql = `
   select course_id, status, course_name, teacher_name,
				left(course_start, 10) course_start, 
                left(course_end, 10) course_end, 
                course_week,
                left(start_time, 5) start_time, 
                left(end_time, 5) end_time, 
                num_of_course, 
                price
    from product
  `
  return db
          .execute(sql, [product])
          .then(result => result[0])
}

// 디테일
export const getProductDetail = async(id) => {
  const sql = `
    select course_id as id, course_name
      from product
        where course_id = ? 
  `
  return db
          .execute(sql, [id])
          .then(result => result[0][0]);
}
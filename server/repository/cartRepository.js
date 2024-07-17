import { db } from '../db/database_mysql80.js';


// 리스트
export const getCart = async(cart) => {
  const sql = `
  `
  return db
          .execute(sql, [cart])
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
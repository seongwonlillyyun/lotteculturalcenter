import { db } from '../db/database_mysql80.js';


// 리스트
export const getCart = async(cart) => {
  const sql = `
  `
  return db
          .execute(sql, [cart])
          .then(result => result[0])
}


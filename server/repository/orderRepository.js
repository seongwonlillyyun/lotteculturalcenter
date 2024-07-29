import { db } from "../db/database_mysql80.js";


export const getPoint = async() => {
  const sql = `
    select point from member
  `
  return db
        .execute(sql)
        .then(result => result[0][0])
} 

export const setPoint = async({point}) => {
  console.log('point repository', point);  
  const sql = `
     update member set point = ?
      where user_id = 'test'
  `
  return db
        .execute(sql, [point])
} 
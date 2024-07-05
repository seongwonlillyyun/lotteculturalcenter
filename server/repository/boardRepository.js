import { db } from "../db/database_mysql80.js";

export const getQnA = async({type, keyword}) => {
  let sql = "";

  if(type && keyword){
    sql = `
      select
        title,
        content
      from (
        select * from qna where type = "${type}"
      ) t where title like "%${keyword}%" or content like "%${keyword}%"
    `
  } else {
    if(type) {
      sql = `
        select
          title,
          content
        from qna
        where type = "${type}"
      `
    } else {
      sql = `
        select
          title,
          content
        from qna
        where title like "%${keyword}%" or content like "%${keyword}%" 
      `
    }
  }
  
  return db.execute(sql)
    .then(([rows]) => rows);
}

export const getQnATabs = async() => {
  const sql = `
    select
      type
    from qna
    group by type;
  `

  return db.execute(sql)
    .then(([rows]) => rows);
}

export const getSearchQnA = async(keyword) => {
  const sql = `
    select 
      type,
      title,
      content
    from qna
    where title like "%${keyword}%" 
      or content like "%${keyword}%"
  `

  return db.execute(sql)
    .then(([rows]) => rows);
}
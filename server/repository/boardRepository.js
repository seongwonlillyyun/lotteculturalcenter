import { db } from "../db/database_mysql80.js";

export const getQnA = async({type, keyword, count}) => {
  const typeSql = type ? `where type = "${type}"` : ""
  const keywordSql = keyword ? 
    type ? `and (title like "%${keyword}%" or content like "%${keyword}%")` 
    : `where (title like "%${keyword}%" or content like "%${keyword}%")` 
    : ""
  
  const sql = `
    select
      title,
      content
    from (
      select 
        row_number() over(order by bid) rno,
        title,
        content
      from qna
      ${typeSql}
      ${keywordSql}
    ) t where rno between 1 and ${count};
  `;
  
  return db.execute(sql)
    .then(([rows]) => rows);
}

export const getQnACount = async({type, keyword}) => {
  const typeSql = type ? `where type = "${type}"` : ""
  const keywordSql = keyword ? 
    type ? `and (title like "%${keyword}%" or content like "%${keyword}%")` 
    : `where (title like "%${keyword}%" or content like "%${keyword}%")` 
    : ""
  const sql = `
    select
      count(*) count
    from qna
    ${typeSql}
    ${keywordSql}
  `

  return db.execute(sql)
    .then(([rows]) => rows[0].count);
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

export const setNotiEvent = async(data) => {
  let result = false;
  const sql = `
    insert into noti_event(loc_id, type, isMust, title, content, reg_date)
    value(?, ?, ?, ?, ?, now());
  `
  const params = [
    data.loc_id, 
    data.type, 
    data.isMust, 
    data.title, 
    data.content
  ];

  await db.execute(sql, params)
    .then(([rows]) => {
      if(rows.affectedRows === 1) result = true;
    })

  return result;
}
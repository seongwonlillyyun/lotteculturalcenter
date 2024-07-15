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

export const getNotiEvtList = async({location, keyword, type, count}) => {
  let filterSql = "";
  let changeLoc = (location === "전체지점") ? "" : location;

  if(keyword && changeLoc){
    filterSql = `and ((name = "${changeLoc}" and title like "%${keyword}%") or isMust = true)`
  } else {
    if(keyword){
      filterSql = `and (title like "%${keyword}%" or isMust = true)`
    } else if(changeLoc){
      filterSql = `and (name = "${changeLoc}" or isMust = true)`
    }
  }

  const sql = `
    select
      bid,
      isMust,
      title,
      reg_date,
      name
    from (
      select 
        row_number() over(order by isMust desc, n.reg_date desc) rno,
        bid, 
        isMust, 
        title, 
        date_format(n.reg_date, '%Y-%m-%d') reg_date, 
        name 
      from noti_event n
      inner join location l on l.loc_id = n.loc_id
      where n.type = "${type}"
      ${filterSql}
    ) t where rno between 1 and ${count};
  `

  return db.execute(sql)
    .then(([rows]) => rows)
}

export const getNotiEvtCount = async({location, keyword, type}) => {
  let filterSql = "";
  let changeLoc = (location === "전체지점") ? "" : location;

  if(keyword && changeLoc){
    filterSql = `and ((name = "${changeLoc}" and title like "%${keyword}%") or isMust = true)`
  } else {
    if(keyword){
      filterSql = `and (title like "%${keyword}%" or isMust = true)`
    } else if(changeLoc){
      filterSql = `and (name = "${changeLoc}" or isMust = true)`
    }
  }

  const sql = `
    select 
      count(*) count  
    from noti_event n
    inner join location l on l.loc_id = n.loc_id
    where n.type = "${type}"
    ${filterSql}
  `

  return db.execute(sql)
    .then(([rows]) => rows[0].count)
}

export const getNotiEvt = async(id) => {
  const sql = `
    select
      ne.type,
      name,
      title,
      content,
      date_format(ne.reg_date, "%Y.%m.%d") date
    from noti_event ne
      inner join location l on l.loc_id = ne.loc_id
    where bid = ?;
  `
  
  return db.execute(sql, [id])
    .then(([rows]) => rows[0]);
}

export const setPersonal = async(data) => {
  let result = false;
  const sql = `
    insert into personalQnA(
      user_id,
      type,
      loc_id,
      title,
      content,
      reg_date
    ) values (?, ?, ?, ?, ?, now());
  `;

  const params = [
    data.user_id,
    data.type,
    data.loc_id,
    data.title,
    data.content
  ]

  await db.execute(sql, params)
    .then(([rows]) => {
      if(rows.affectedRows === 1) result = true;
    })

  return result;
}

export const getPersonal = async({user_id, status}) => {
  const statusSql = status ? `and status = "${status}"` : "" 

  const sql = `
    select
      bid,
      pq.type,
      title,
      status,
      date_format(pq.reg_date, "%Y-%m-%d") date,
      name
    from personalQnA pq
      inner join location l on l.loc_id = pq.loc_id
    where user_id = ?
      ${statusSql}
  `

  return db.execute(sql, [user_id])
    .then(([rows]) => rows);
}
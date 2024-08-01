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

export const getAllNotiEvtList = async() => {
  const sql = `
    select
      bid,
      type,
      title,
      content,
      date_format(reg_date, "%Y-%m-%d") date
    from noti_event
    order by reg_date desc;
  `

  return db.execute(sql)
    .then(([rows]) => rows);
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

export const getNoReplyList = async() => {
  const sql = `
    select
      bid,
      title
    from personalqna
    where status = "접수중"
  `;

  return db.execute(sql)
    .then(([rows]) => rows)
}

export const getPersonalList = async({user_id, status}) => {
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

export const getPersonal = async(id) => {
  const sql = `
    select
      bid,
      p.type,
      title,
      content,
      status,
      date_format(p.reg_date, "%Y-%m-%d %T") date,
      name,
      answer
    from personalqna p
      inner join location l on l.loc_id = p.loc_id
    where bid = ?
  `
  return db.execute(sql, [id])
    .then(([rows]) => rows[0]);
}

export const removePersonal = async (id) => {
  const sql = `
    delete from personalqna
    where bid = ?;
  `;

  return db.execute(sql, [id])
    .then(([rows]) => rows.affectedRows)
}

export const updatePersonal = async ({bid, answer}) => {
  const sql = `
    update personalqna set status = "답변완료", answer = ?
    where bid = ?;
  `

  return db.execute(sql, [answer, bid])
    .then(([rows]) => rows.affectedRows)
}

export const getMyReview = async (data) => {
  const sql = `
    select
      pay.orderId,
      course_img,
      course_name,
      name,
      teacher_name,
      concat(course_start, " ~ ", course_end) course_date,
      isReviewed,
      star,
      rid
    from payment pay
      inner join location l on l.loc_id = pay.loc_id
      left outer join review on review.orderId = pay.orderId
    where user_id = ?
      and status = "결제완료"
  `

  const params = [
    data.userId,
  ]

  return db.execute(sql, params)
    .then(([rows]) => rows)
}

export const setReview = async (data) => {
  let result = false;

  const sql = `
    insert into review(orderId, star, title, content, reg_date)
    values(?, ?, ?,?, now())
  `;

  const params = [
    data.orderId,
    data.star,
    data.title,
    data.content
  ]

  await db.execute(sql, params);
  await updateIsReviewed(data.orderId)
    .then(([rows]) => {
      if(rows.affectedRows) result = true;
    });

  return result;
}

const updateIsReviewed = async (id) => {
  const sql = `
    update payment set isReviewed = true
    where orderId = ?;
  `

  return db.execute(sql, [id]);
}

export const getHitsReview = async () => {
  const sql = `
    select 
      rid,
      star,
      title,
      content,
      date_format(r.reg_date, "%Y-%m-%d") date,
      l.name,
      course_img,
      course_name,
      teacher_name,
      concat(
        left(user_name,1),
        repeat("*",char_length(user_name) - 2),
        right(user_name, 1)
      ) user_name,
      course_start,
      course_end,
      view
    from review r
      inner join payment p on p.orderId = r.orderId
      inner join location l on l.loc_id = p.loc_id
    order by view desc
  `

  return db.execute(sql)
    .then(([rows]) => rows);
}

export const getReview = async(id) => {
  const sql = `
    select 
      rid,
      star,
      title,
      content,
      date_format(r.reg_date, "%Y-%m-%d") date,
      l.name,
      course_img,
      course_name,
      teacher_name,
      concat(
        left(user_name,1),
        repeat("*",char_length(user_name) - 2),
        right(user_name, 1)
      ) user_name,
      date_format(course_start, "%Y-%m-%d") course_start,
      date_format(course_end, "%Y-%m-%d") course_end,
      view
    from review r
      inner join payment p on p.orderId = r.orderId
      inner join location l on l.loc_id = p.loc_id
    where rid = ?;
  `

  return db.execute(sql, [id])
    .then(([rows]) => rows[0]);
}

export const getReviewList = async({location, keyword, count}) => {
  let list = []
  let totalCount = {}

  const locationSql = location ? `where l.name = "${location}"` : ""
  const keywordSql = keyword ? 
  location ? `and (title like "%${keyword}%" or content like "%${keyword}%")` 
    : `where (title like "%${keyword}%" or course_name like "%${keyword}%")` 
    : ""

  const sql = `
    select
      *
    from (
      select
        row_number() over(order by r.reg_date desc) rno, 
        rid,
        star,
        title,
        content,
        date_format(r.reg_date, "%Y-%m-%d") date,
        l.name,
        course_img,
        course_name,
        teacher_name,
        concat(
        left(user_name,1),
        repeat("*",char_length(user_name) - 2),
        right(user_name, 1)
        ) user_name,
        date_format(course_start, "%Y-%m-%d") course_start,
        date_format(course_end, "%Y-%m-%d") course_end,
        view	
      from review r
        inner join payment p on p.orderId = r.orderId
        inner join location l on l.loc_id = p.loc_id
      ${locationSql}
      ${keywordSql}
    ) t1 where rno between 1 and ${count};
  `

  list = await db.execute(sql)
    .then(([rows]) => rows);

  totalCount = await getReviewTotalCount(locationSql, keywordSql);

  return {list, totalCount : totalCount.count};
}

const getReviewTotalCount = async(locationSql, keywordSql) => {
  const sql = `
    select
      count(*) count
    from review r
      inner join payment p on p.orderId = r.orderId
      inner join location l on l.loc_id = p.loc_id
    ${locationSql}
    ${keywordSql};
  `

  return db.execute(sql)
    .then(([rows]) => rows[0])
}
import { db } from "../db/database_mysql80.js";

export const getCategoryCourse = async (data) => {
  const locationSql = data.location ? `and l.name = "${data.location}"` : ""

  const sql = `
    select 
      course_id,
      course_img,
      status,
      l.name,
      course_name,
      teacher_name,
      course_week,
      time_format(start_time, "%H:%i") start_time,
      time_format(end_time, "%H:%i") end_time,
      num_of_course,
      format(price, 0) price
    from course p
      inner join category_sub cs on cs.csid = p.csid
      inner join category c on c.cid = cs.cid
      inner join location l on l.loc_id = p.loc_id
    where c.cid = ${data.cid}
    ${locationSql}
  `

  return db.execute(sql)
    .then(([rows]) => rows);
}

export const getCourse = async (id) => {
  const sql = `
    select
      course_id,
      status,
      course_img,
      course_name,
      course_summary,
      course_content,
      course_note,
      course_schedule,
      teacher_name,
      date_format(course_start, '%Y-%m-%d') course_start,
      date_format(course_end, '%Y-%m-%d') course_end,
      course_week,
      time_format(start_time, "%H:%m") start_time,
      time_format(end_time, "%H:%m") end_time,
      num_of_course,
      num_of_people,
      format(price,0) price,
      date_format(apply_start, '%Y-%m-%d') apply_start,
      date_format(apply_end, '%Y-%m-%d') apply_end,
      l.name loc_name,
      tel
    from course c
      inner join category_sub cs on cs.csid = c.csid
      inner join location l on l.loc_id = c.loc_id
    where course_id = ?;
  `
  return db.execute(sql, [id])
    .then(([rows]) => rows[0])
}

export const setCourse = async (data) => {
  const sql = `
    insert into course(
      loc_id,
      csid,
      course_img,
      course_name,
      course_summary,
      course_content,
      course_note,
      course_schedule,
      teacher_name,
      course_start,
      course_end,
      course_week,
      start_time,
      end_time,
      num_of_course,
      num_of_people,
      price,
      apply_start,
      apply_end,
      reg_date
    ) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,now())
  `

  const params = [
    data.loc_id,
    data.csid,
    data.course_img,
    data.course_name,
    data.course_summary,
    data.course_content,
    data.course_note,
    data.course_schedule,
    data.teacher_name,
    data.course_start,
    data.course_end,
    data.course_week,
    data.start_time,
    data.end_time,
    data.num_of_course,
    data.num_of_people,
    data.price,
    data.apply_start,
    data.apply_end
  ]

  return db.execute(sql, params)
    .then(([rows]) => rows.affectedRows);
}

export const getBestCourse = async () => {
  const sql = `
    select
      course_id,
      course_img,
      status,
      l.name,
      course_name,
      teacher_name,
      course_week,
      time_format(start_time, "%H:%i") start_time,
      time_format(end_time, "%H:%i") end_time,
      num_of_course,
      format(price, 0) format_price
    from course p
      inner join category_sub cs on cs.csid = p.csid
      inner join category c on c.cid = cs.cid
      inner join location l on l.loc_id = p.loc_id
    where price < 100000
    order by price
    limit 10;
  `

  return db.execute(sql)
    .then(([rows]) => rows);
}

export const getNewCourse = async (data) => {
  const locationSql = data.location ? `where l.name = "${data.location}"` : "";

  const sql = `
    select
      course_id,
      course_img,
      status,
      l.name,
      course_name,
      teacher_name,
      course_week,
      time_format(start_time, "%H:%i") start_time,
      time_format(end_time, "%H:%i") end_time,
      num_of_course,
      format(price, 0) format_price
    from course p
      inner join category_sub cs on cs.csid = p.csid
      inner join category c on c.cid = cs.cid
      inner join location l on l.loc_id = p.loc_id
    ${locationSql}
    order by p.reg_date
    limit 10;
  `;

  return db.execute(sql)
    .then(([rows]) => rows);
}
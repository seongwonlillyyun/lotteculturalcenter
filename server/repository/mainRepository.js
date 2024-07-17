import { db } from "../db/database_mysql80.js";

export const setMainSlide = async(data) => {
  const sql = `
    insert into main_visual(
      img_path,
      title,
      summary,
      bid
    ) values (?, ?, ?, ?);
  `

  const params = [
    data.imgList[0],
    data.title,
    data.summary,
    data.bid
  ]

  return db.execute(sql, params)
    .then(([rows]) => rows.affectedRows)
}

export const getMainSlide = async() => {
  const sql = `
    select
      img_path,
      title,
      summary,
      bid
    from main_visual;
  `

  return db.execute(sql)
    .then(([rows]) => rows);
}
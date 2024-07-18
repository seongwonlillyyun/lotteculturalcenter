import { db } from "../db/database_mysql80.js";

export const getCategory = async () => {
  const sql = `
    select 
      csid,
      c.name name,
      cs.name sub_name
    from category_sub cs
      inner join category c on cs.cid = c.cid
  `

  return db.execute(sql).then(([rows]) => rows);
}

export const getCategoryTheme = async () => {
  const sql = `
    select
      cid,
      name,
      bg_color,
      img_path
    from category;
  `

  return db.execute(sql)
    .then(([rows]) => rows);
}

export const setCategory = async (data) => {
  const sql = `
    insert into category(name, bg_color, img_path)
    values(?,?,?);
  `

  const params = [
    data.name,
    data.bg_color,
    data.img_path
  ]

  return db.execute(sql, params)
    .then(([rows]) => rows.affectedRows);
}
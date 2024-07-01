import { db } from '../db/database_mysql80.js';

export const setLocation = async (data) => {
  const sql = `
    insert into location(type, name, addr, addr_detail, tel, lat, lng, reg_date)
    values(?, ?, ?, ?, ?, ?, ?, now());
  `
  
  const params = [
    data.type,
    data.name,
    data.addr,
    data.addr_detail,
    data.tel,
    data.lat,
    data.lng
  ]

  const loc_id = await db.execute(sql, params)
    .then(([rows]) => rows.insertId)

  return setLocationSlides(loc_id, data.imgList)
}

export const setLocationSlides = async (loc_id, data) => {
  let count = 0;

  for(let i=0; i < data.length; i++){
    const sql = `
      insert into location_slide(loc_id, img_path)
      values(?, ?);
    `

    count += await db.execute(sql, [loc_id, data[i]])
      .then(([rows]) => rows.affectedRows)
  }

  return (count === data.length) ? true : false;
}
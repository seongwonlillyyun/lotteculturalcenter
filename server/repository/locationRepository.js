import { db } from '../db/database_mysql80.js';

export const getLocation = async () => {
  const sql = `
    select
      loc_id,
      type,
      name,
      addr,
      addr_detail,
      tel,
      lat,
      lng,
      c_lat,
      c_lng
    from (
      select 
        (min(lat) + max(lat))/2 c_lat, 
        (min(lng) + min(lng))/2 c_lng
      from location
      where type = "서울점"
    ) center, location
    where type = "서울점"
  `

  return db.execute(sql)
    .then(([rows]) => rows)
}

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
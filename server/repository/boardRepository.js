import { db } from "../db/database_mysql80.js";

export const getQnA = async() => {
  const sql = `
    select 
      type,
      title,
      content
    from qna;
  `
  return db.execute(sql)
    .then(([rows]) => rows);
}
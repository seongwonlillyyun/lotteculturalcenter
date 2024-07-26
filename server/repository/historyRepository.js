import {db} from '../db/database_mysql80.js'

//! 수강내역조회 
export const getHistory = async(user_id)=>{

    const sql =`
    
    `

    return db.execute(sql, [])
                .then(result=>result[0])
}
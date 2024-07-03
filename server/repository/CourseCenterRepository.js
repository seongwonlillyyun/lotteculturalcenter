import {promises as fsPromises} from 'fs';
import {db} from '../db/database_mysql80.js'

export const getCoursesbyCenter = async(id) =>{
    const sql = `select 
                    c.course_id, l.name as center_name, c.statues, c.loc_id, 
                    c.sub_id, c.course_name, c.course_sum, 
					c.teacher_name,
                    concat_ws(':',hour(start_time),minute(start_time)) as start_time,
		            concat_ws(':',hour(end_time),minute(end_time)) as end_time,
                    c.course_week, 
                    c.num_of_course, c.num_of_people, format(c.price, '#,#') as price, 
                    c.apply_start, c.apply_end, c.course_content 
		            from course c , location l 
                    where l.loc_id = c.loc_id and c.loc_id = ?`
    return db
        .execute(sql,[id])
        .then(result=>result[0])
}

export const getCenter = async(id)=>{
    const sql = `select loc_id, name from location where loc_id = ?`;
    return db 
            .execute(sql,[id])
            .then(result=>result[0])
}
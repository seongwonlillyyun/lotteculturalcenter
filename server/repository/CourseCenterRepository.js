import {promises as fsPromises} from 'fs';
import {db} from '../db/database_mysql80.js'

export const getCoursesbyCenter = async(params) =>{
    const sql = `select rno, course_id, statues, loc_id, sub_id,
		course_name, course_sum, teacher_name, left(start_time,5) start_time, 
        left(end_time,5) end_time, course_week, num_of_course, num_of_people,
        format(price, '#,#') as price, name from (
        select row_number() over(order by c.course_id) as rno, 
					c.course_id, 
					c.statues, c.loc_id, 
                    c.sub_id, c.course_name, c.course_sum, 
					c.teacher_name, c.start_time,
					c.end_time,
                    c.course_week, 
                    c.num_of_course, c.num_of_people, c.price, 
                    l.name as center_name,
                    c.apply_start, c.apply_end,
                    l.name
                    from course c, location l where c.loc_id = l.loc_id) t1 
                    where loc_id = ? and rno between ? and ?;`
    return db
        .execute(sql,[params.id, params.startIndex, params.endIndex])
        .then(result=>result[0])
}

/* export const getCenter = async(id)=>{
    const sql = `select loc_id, name from location where loc_id = ?`;
    return db 
            .execute(sql,[id])
            .then(result=>result[0])
} */
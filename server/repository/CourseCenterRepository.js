import {promises as fsPromises} from 'fs';
import {db} from '../db/database_mysql80.js'

export const getCenter = async(id)=>{
    const sql = `select loc_id, type, name as center_name 
                from location where loc_id = ?`
    return db  
            .execute(sql,[id])
            .then(result=>result[0])
}

export const getCoursesbyCenter = async(params) =>{
    const sql = `select rno, course_id, statues, loc_id, mid_id, sub_id,
		course_name, course_sum, teacher_name, left(start_time,5) start_time, 
        left(end_time,5) end_time, course_week, num_of_course, num_of_people,
        format(price, '#,#') as price, name 
        from (		select row_number() over(order by c.course_id) as rno, 
					c.course_id, 
					c.statues, c.loc_id, 
                    c.sub_id, c.course_name, c.course_sum, 
					c.teacher_name, c.start_time,
					c.end_time,
                    c.course_week, 
                    c.num_of_course, c.num_of_people, c.price, 
                    l.name as center_name,
                    c.apply_start, c.apply_end,
                    l.name, s.mid_id
                    from course c, location l, sub_category s 
                    where c.loc_id = l.loc_id and c.sub_id = s.sub_id) t1 
                    where loc_id = all(select distinct loc_id from location where loc_id = ?) and
						mid_id = all (select distinct mid_id from sub_category where mid_id = ?) and 
                        sub_id = all (select distinct sub_id from sub_category where sub_id = ?);`
    return db
        .execute(sql,[params.id, params.mid_id, params.sub_id])
        .then(result=>result[0])
}

/* export const getCourseMid = async(params)=>{
    const sql = `select rno, course_id, statues, loc_id, mid_id, sub_id,
		course_name, course_sum, teacher_name, left(start_time,5) start_time, 
        left(end_time,5) end_time, course_week, num_of_course, num_of_people,
        format(price, '#,#') as price, name 
        from (		select row_number() over(order by c.course_id) as rno, 
					c.course_id, 
					c.statues, c.loc_id, 
                    c.sub_id, c.course_name, c.course_sum, 
					c.teacher_name, c.start_time,
					c.end_time,
                    c.course_week, 
                    c.num_of_course, c.num_of_people, c.price, 
                    l.name as center_name,
                    c.apply_start, c.apply_end,
                    l.name, s.mid_id
                    from course c, location l, sub_category s 
                    where c.loc_id = l.loc_id and c.sub_id = s.sub_id) t1 
                    where loc_id = ? and mid_id = ?`
    return db 
            .execute(sql,[params.id, params.mid_id])
            .then(result=>result[0])
} */


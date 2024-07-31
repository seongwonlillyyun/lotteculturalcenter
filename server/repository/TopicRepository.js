import {promises as fsPromises} from 'fs';
import {db} from '../db/database_mysql80.js'

export const getTopic = async(id)=>{
    const sql = `select s.csid, c.cid, s.name as smallname, c.name as middlename 
                from category_sub s, category c where c.cid = s.cid and s.csid = ?`
    return db  
            .execute(sql,[id])
            .then(result=>result[0])
}

export const getCoursesbyTopic = async(params) =>{
    let sql = '';
    if(params.sort === 10){
        sql = ` select course_id, status, loc_id, cid, csid, course_img,
                course_name, course_start, price, course_summary, teacher_name, left(start_time,5) start_time, 
                left(end_time,5) end_time, course_week, num_of_course, num_of_people,
                format(price, '#,#') as price, name , dayofweek(course_start) , date_format(start_time,'%p')
                from (	select 
                        c.course_id, 
                        c.status, c.loc_id, c.course_img,
                        c.csid, c.course_name, c.course_summary, 
                        c.teacher_name, c.start_time,
                        c.end_time,
                        c.course_week, 
                        c.num_of_course, c.num_of_people, c.price, 
                        l.name as center_name,
                        c.apply_start, c.apply_end,
                        l.name, s.cid, c.course_start
                        from course c, location l, category_sub s 
                        where c.loc_id = l.loc_id and c.csid = s.csid) t1 
                        where
                            csid = all (select distinct csid from category_sub where csid = ?) and
							loc_id in (select distinct loc_id from location where loc_id in (?)) and
                            dayofweek(course_start) in (select distinct dayofweek(course_start) from course where dayofweek(course_start) in (?)) and 
                            date_format(start_time, '%p') = all(select distinct date_format(start_time,'%p') from course where date_format(start_time,'%p') = ? ) and
                            (course_name,teacher_name) in (select distinct course_name, teacher_name from course where course_name like ? or teacher_name like ?) 
                            order by 9 desc
                            limit ?`
                        return db
                            .query(sql,[params.csid, params.loc_id, params.day, params.time,
                                        params.text,params.text,params.end])
                            .then(result=>result[0])
    } else {
        sql = `select course_id, status, loc_id, cid, csid,course_img,
                course_name, course_start, price, course_summary, teacher_name, left(start_time,5) start_time, 
                left(end_time,5) end_time, course_week, num_of_course, num_of_people,
                format(price, '#,#') as price, name , dayofweek(course_start) , date_format(start_time,'%p')
                from (	select 
                        c.course_id, 
                        c.status, c.loc_id, c.course_img,
                        c.csid, c.course_name, c.course_summary, 
                        c.teacher_name, c.start_time,
                        c.end_time,
                        c.course_week, 
                        c.num_of_course, c.num_of_people, c.price, 
                        l.name as center_name,
                        c.apply_start, c.apply_end,
                        l.name, s.cid, c.course_start
                        from course c, location l, category_sub s 
                        where c.loc_id = l.loc_id and c.csid = s.csid) t1 
                        where
                            csid = all (select distinct csid from category_sub where csid = ?) and
							loc_id in (select distinct loc_id from location where loc_id in (?)) and
                            dayofweek(course_start) in (select distinct dayofweek(course_start) from course where dayofweek(course_start) in (?)) and 
                            date_format(start_time, '%p') = all(select distinct date_format(start_time,'%p') from course where date_format(start_time,'%p') =? ) and
                            (course_name,teacher_name) in (select distinct course_name, teacher_name from course where course_name like ? or teacher_name like ?) 
                            order by ?
                            limit ?`
                        return db
                            .query(sql,[params.csid, params.loc_id, params.day, params.time, 
                                        params.text,params.text,params.sort,params.end])
                            .then(result=>result[0])
    }
}
export const getCountbyTopic = async(params) =>{
    let sql = '';
    if(params.sort === 10){
        sql = ` select count(*) as count
                from (	select 
                        c.course_id, 
                        c.status, c.loc_id, c.course_img,
                        c.csid, c.course_name, c.course_summary, 
                        c.teacher_name, c.start_time,
                        c.end_time,
                        c.course_week, 
                        c.num_of_course, c.num_of_people, c.price, 
                        l.name as center_name,
                        c.apply_start, c.apply_end,
                        l.name, s.cid, c.course_start
                        from course c, location l, category_sub s 
                        where c.loc_id = l.loc_id and c.csid = s.csid) t1 
                        where
                            csid = all (select distinct csid from category_sub where csid = ?) and
							loc_id in (select distinct loc_id from location where loc_id in (?)) and
                            dayofweek(course_start) in (select distinct dayofweek(course_start) from course where dayofweek(course_start) in (?)) and 
                            date_format(start_time, '%p') = all(select distinct date_format(start_time,'%p') from course where date_format(start_time,'%p') = ? ) and
                            (course_name,teacher_name) in (select distinct course_name, teacher_name from course where course_name like ? or teacher_name like ?)`
                        return db
                            .query(sql,[params.csid, params.loc_id, params.day, params.time,
                                        params.text,params.text,params.end])
                            .then(result=>result[0])
    } else {
        sql = `select count(*) as count
                from (	select 
                        c.course_id, 
                        c.status, c.loc_id, c.course_img,
                        c.csid, c.course_name, c.course_summary, 
                        c.teacher_name, c.start_time,
                        c.end_time,
                        c.course_week, 
                        c.num_of_course, c.num_of_people, c.price, 
                        l.name as center_name,
                        c.apply_start, c.apply_end,
                        l.name, s.cid, c.course_start
                        from course c, location l, category_sub s 
                        where c.loc_id = l.loc_id and c.csid = s.csid) t1 
                        where
                            csid = all (select distinct csid from category_sub where csid = ?) and
							loc_id in (select distinct loc_id from location where loc_id in (?)) and
                            dayofweek(course_start) in (select distinct dayofweek(course_start) from course where dayofweek(course_start) in (?)) and 
                            date_format(start_time, '%p') = all(select distinct date_format(start_time,'%p') from course where date_format(start_time,'%p') =? ) and
                            (course_name,teacher_name) in (select distinct course_name, teacher_name from course where course_name like ? or teacher_name like ?)`
                        return db
                            .query(sql,[params.csid, params.loc_id, params.day, params.time, 
                                        params.text,params.text,params.sort,params.end])
                            .then(result=>result[0])
    }
}



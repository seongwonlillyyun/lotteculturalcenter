import * as repository from '../repository/CourseCenterRepository.js'

/* 센터 정보 */
export const getCenter = async(req,res)=>{
    const id = req.params.id
    const center = await repository.getCenter(id);
    res.json(center)
}

/* 센터별 강의 가져오기 */
export const getCoursesByCenter = async(req,res) =>{
    const params = req.body
    const courses = await repository.getCoursesbyCenter(params);
    console.log(courses, 'params=>', params)
    res.json(courses)
}

/* 중분류  */
export const getCourseMid = async(req,res)=>{
    const params = req.body;
    const course = await repository.getCourseMid(params)
    console.log(params)
    res.json(course)
}
/* 소분류 */
/* export const getCourseSub = async(req,res)=>{
    const params = req.body;
    const course = await repository.getCourseSub(params)
    res.json(course)
} */
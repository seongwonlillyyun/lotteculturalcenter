import * as repository from '../repository/CourseCenterRepository.js'

/* 센터별 강의 가져오기 */
export const getCoursesByCenter = async(req,res) =>{
    const id = req.params.id;
    const courses = await repository.getCoursesbyCenter(id);
    res.json(courses)
}

export const getCenter = async(req,res)=>{
    const id = req.params.id;
    const center = await repository.getCenter(id)
    console.log('test',center)
    res.json(center)
}
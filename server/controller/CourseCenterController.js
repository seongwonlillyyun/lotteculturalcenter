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
    const count = await repository.getCountByCenter(params);
    res.json({courses, count})
}


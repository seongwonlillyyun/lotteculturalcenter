import * as repository from '../repository/TopicRepository.js'

/* 센터 정보 */
export const getTopic = async(req,res)=>{
    const id = req.params.id
    const center = await repository.getTopic(id);
    res.json(center)
}

/* 센터별 강의 가져오기 */
export const getCoursesByTopic = async(req,res) =>{
    const params = req.body
    const courses = await repository.getCoursesbyTopic(params);
    const count = await repository.getCountbyTopic(params);
    res.json({courses,count})
}

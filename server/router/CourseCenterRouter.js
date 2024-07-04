import express from 'express';
import * as controller from '../controller/CourseCenterController.js'

const router = express.Router();
router
    .get('/:id', controller.getCenter)
    .post('/:id/course', controller.getCoursesByCenter)
    .post('/:id/course/search', controller.getCourseMid)
    /* .post('/:id/course/search/sub', controller.getCourseSub)
 */
    export default router
import express from 'express';
import * as controller from '../controller/CourseCenterController.js'

const router = express.Router();
router
    .post('/:id/course', controller.getCoursesByCenter)
    /* .get('/:id', controller.getCenter) */

    export default router
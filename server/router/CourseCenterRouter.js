import express from 'express';
import * as controller from '../controller/CourseCenterController.js'

const router = express.Router();
router
   .get('/:id', controller.getCenter)
   .post('/:id/course', controller.getCoursesByCenter)
   .post('/:id/count', controller.getCoursesByCenter)

   export default router
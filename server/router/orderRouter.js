import express from 'express';
import * as controller from '../controller/orderController.js'


const router = express.Router();

router.post('/pointget', controller.getPoint) 
router.post('/pointset', controller.setPoint)

export default router
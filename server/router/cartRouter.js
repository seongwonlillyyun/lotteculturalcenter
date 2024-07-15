import express from 'express';
import * as controller from '../controller/cartController.js';



const router = express.Router();

router.post('/', controller.getCart); // 리스트



export default router;
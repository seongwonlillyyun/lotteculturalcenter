import express from 'express';
import * as controller from '../controller/cartController.js';



const router = express.Router();

router.post('/', controller.getCart); // 리스트
router.post('/count', controller.getCount);// 카운트
router.post('/add', controller.insert); // 카트 추가
router.post('/remove', controller.remove)// 카트 삭제
router.post('/removeall', controller.removeAll)// 카트 전체삭제



export default router;
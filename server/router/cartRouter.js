import express from 'express';
import * as controller from '../controller/cartController.js';



const router = express.Router();

router.post('/', controller.getCart); // 리스트
router.post('/count', controller.getCount);// 카운트
router.post('/add', controller.insert); // 카트 추가




router.post('/product', controller.getProduct);// 상품리스트
router.get('/product/:id', controller.getProductDetail);// 상품디테일


export default router;
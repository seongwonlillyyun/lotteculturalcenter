import { db } from '../db/database_mysql80.js';
import * as repository from '../repository/cartRepository.js';


// 리스트
export const getCart = async(req, res) => {
  const {userId} = req.body;
  const cartList = await repository.getCart(userId);
  res.json(cartList);
  res.end();
}

// 카운트
export const getCount = async(req, res) => {
  const {userId} = req.body;
  const result = await repository.getCount(userId);
  // console.log('userid->', userId);
  res.json(result);
  res.end();
}









// 상품리스트
export const getProduct = async(req, res) => {
  const product = req.body;
  const result = await repository.getProduct({product})
  res.json(result);
  res.end();

}

// 디테일
export const getProductDetail = async(req, res) => {
  const detail = await repository.getProductDetail(req.params.id);
  res.json(detail);
}
import { db } from '../db/database_mysql80.js';
import * as repository from '../repository/cartRepository.js';


// 리스트
export const getCart = async(req, res) => {
  const {userId} = req.body;
  const result = await repository.getCart(userId);
  res.json(result);
  res.end();
}

// 카운트
export const getCount = async(req, res) => {
  const {userId} = req.body;
  // console.log('controller userId->', userId);
  const result = await repository.getCount(userId);
  // console.log('contr result->', result);
  res.json(result);
  res.end();
}

// 카트 추가
export const insert = async(req, res) => {
  const items = req.body;
  const result = await repository.insert(items);
  res.json(result);
  res.end();
}

// 카트 삭제
export const remove = async(req, res) => {
  const {cartItemList} = req.body;
  const result = await repository.remove(cartItemList);
  res.json(result);
  res.end();
}


// 카트 전체삭제
export const removeAll = async(req, res) => {
  const {userId} = req.body;
  const result = await repository.removeAll(userId);
  res.json(result);
  res.end();
}

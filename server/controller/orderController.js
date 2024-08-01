import * as repository from '../repository/orderRepository.js'




export const getPayList = async(req, res) => {
  const {userId} = req.body;
  const result = await repository.getPayList(userId)
   console.log('controller->', result);
  res.json(result)
  res.end()
} 

export const usePoint = async(req, res) => {
  const data = req.body;
  const result = await repository.usePoint(data)
  res.json(result)
  res.end()
} 

export const getPoint = async(req, res) => {
  const {userId} = req.body;
  const result = await repository.getPoint(userId)
  res.json(result)
  res.end()
} 


export const setPayment = async(req, res) => {
  const {cartItemList, total_price, point} = req.body;
  const result = await repository.setPayment(cartItemList, total_price, point)
  res.json(result)
  res.end()
} 

export const getCourseList = async(req, res) => {
  const {cartItemList} = req.body;
  const result = await repository.getCourseList(cartItemList);
  res.json(result);
  res.end();
}
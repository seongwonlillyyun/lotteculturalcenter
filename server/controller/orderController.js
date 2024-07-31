import * as repository from '../repository/orderRepository.js'



export const getPoint = async(req, res) => {
  const {userId} = req.body;
  console.log('point controller', userId);
  const result = await repository.getPoint(userId)
  res.json(result)
  res.end()
} 


export const setPoint = async(req, res) => {
  const {orderPriceAllPay, inputPoint} = req.body;
  const result = await repository.setPoint(orderPriceAllPay, inputPoint)
  res.json(result)
  res.end()
} 
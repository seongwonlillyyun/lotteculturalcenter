import * as repository from '../repository/orderRepository.js'



export const getPoint = async(req, res) => {
  // const point = req.body;
  const result = await repository.getPoint()
  res.json(result)
  res.end()
} 


export const setPoint = async(req, res) => {
  const point = req.body;
  // console.log('point controller', point);
  const result = await repository.setPoint(point)
  res.json(result)
  res.end()
} 
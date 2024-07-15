import * as repository from '../repository/cartRepository.js';


// 리스트
export const getCart = async(req, res) => {
  const cart = req.body;
  const cartList = await repository.getCart({cart});
  res.json(cartList);
  res.end();
}


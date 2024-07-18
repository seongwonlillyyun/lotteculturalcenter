import * as repository from "../repository/mainRepository.js"

export const setMainSlide = async(req, res) => {
  const data = req.body;
  const result = await repository.setMainSlide(data);
  res.json(result);
  res.end();
}

export const getMainSlide = async(req, res) => {
  const result = await repository.getMainSlide();
  res.json(result);
  res.end();
}
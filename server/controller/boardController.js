import * as repository from "../repository/boardRepository.js"

export const getQnA = async(req, res) => {
  const data = req.body;
  const result = await repository.getQnA(data);
  res.json(result);
  res.end();
}

export const getQnaTabs = async(req, res) => {
  const result = await repository.getQnATabs();
  res.json(result);
  res.end();
}
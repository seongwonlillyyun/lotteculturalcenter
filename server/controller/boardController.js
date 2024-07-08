import * as repository from "../repository/boardRepository.js"

export const getQnA = async(req, res) => {
  const result = {list : [], count : 0};
  const data = req.body;
  result.list = await repository.getQnA(data);
  result.count = await repository.getQnACount(data);
  res.json(result);
  res.end();
}

export const getQnaTabs = async(req, res) => {
  const result = await repository.getQnATabs();
  res.json(result);
  res.end();
}

export const setNotiEvent = async(req, res) => {
  const data = req.body;
  const result = await repository.setNotiEvent(data);
  res.json(result);
  res.end();
}
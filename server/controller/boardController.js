import * as repository from "../repository/boardRepository.js"

export const getQnA = async(req, res) => {
  const data = req.body;
  const result = await repository.getQnA();
  res.json(result);
  res.end();
}
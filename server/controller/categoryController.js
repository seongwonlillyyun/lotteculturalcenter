import * as repository from "../repository/categoryRepository.js"

export const getCategory = async (req, res) => {
  const result = await repository.getCategory();
  res.json(result);
  res.end();
}

export const getCategoryTheme = async (req, res) => {
  const result = await repository.getCategoryTheme();
  res.json(result);
  res.end();
}

export const setCategory = async (req, res) => {
  const data = req.body;
  const result = await repository.setCategory(data);
  res.json(result);
  res.end();
}
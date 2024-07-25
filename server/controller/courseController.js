import * as repository from "../repository/courseRepository.js"

export const getCourse = async (req, res) => {
  const { id } = req.params;
  const result = await repository.getCourse(id);
  res.json(result);
  res.end();
}

export const getCategoryCourse = async(req, res) => {
  const data = req.body;
  const result = await repository.getCategoryCourse(data);
  res.json(result);
  res.end();
}

export const setCourse = async (req, res) => {
  const data = req.body;
  const result = await repository.setCourse(data);
  res.json(result);
  res.end();
}

export const getBestCourse = async (req, res) => {
  const result = await repository.getBestCourse();
  res.json(result);
  res.end();
}

export const getNewCourse = async (req, res) => {
  const data = req.body;
  const result = await repository.getNewCourse(data);
  res.json(result);
  res.end();
}
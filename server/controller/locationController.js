import * as repository from "../repository/locationRepository.js";

export const getLocation = async (req, res) => {
  const { type } = req.body;
  const result = await repository.getLocation(type)
  res.json(result);
  res.end();
}

export const setLocation = async (req, res) => {
  const data = req.body;
  const result = await repository.setLocation(data);
  res.json(result);
  res.end();
}

export const getLocationSlide = async (req, res) => {
  const { id } = req.params;
  const result = await repository.getLocationSlide(id);
  res.json(result);
  res.end();
}
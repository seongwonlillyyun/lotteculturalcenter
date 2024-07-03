import * as repository from "../repository/locationRepository.js";

export const getLocation = async (req, res) => {
  const result = await repository.getLocation()
  res.json(result);
  res.end();
}

export const setLocation = async (req, res) => {
  const data = req.body;
  const result = await repository.setLocation(data);
  res.json(result);
  res.end();
}
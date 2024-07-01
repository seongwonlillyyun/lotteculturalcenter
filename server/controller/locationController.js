import * as repository from "../repository/locationRepository.js";

export const setLocation = async (req, res) => {
  const data = req.body;
  const result = await repository.setLocation(data);
  res.json(result)
}
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

export const getNotiEvtList = async(req, res) => {
  const data = req.body;
  const result = {list : [], count : 0}
  result.list = await repository.getNotiEvtList(data);
  result.count = await repository.getNotiEvtCount(data);
  res.json(result);
  res.end();
}

export const getAllNotiEvtList = async(req, res) => {
  const result = await repository.getAllNotiEvtList();
  res.json(result);
  res.end();
}

export const getNotiEvt = async(req, res) => {
  const {id} = req.params;
  const result = await repository.getNotiEvt(id);
  res.json(result)
  res.end()
}

export const setPersonal = async(req, res) => {
  const data = req.body;
  const result = await repository.setPersonal(data);
  res.json(result);
  res.end();
}

export const getNoReplyList = async(req, res) => {
  const result = await repository.getNoReplyList();
  res.json(result);
  res.end();
}

export const getPersonalList = async(req, res) => {
  const data = req.body;
  const result = await repository.getPersonalList(data);
  res.json(result);
  res.end();
}

export const getPersonal = async (req, res) => {
  const {id} = req.params;
  const result = await repository.getPersonal(id);
  res.json(result);
  res.end();
}

export const removePersonal = async (req, res) => {
  const {id} = req.params;
  const result = await repository.removePersonal(id);
  res.json(result);
  res.end();
}

export const updatePersonal = async(req, res) => {
  const data = req.body;
  const result = await repository.updatePersonal(data);
  res.json(result);
  res.end();
}

export const getMyReview = async(req, res) => {
  const data = req.body;
  const result = await repository.getMyReview(data);
  res.json(result);
  res.end();
}

export const setReview = async (req, res) => {
  const data = req.body;
  const result = await repository.setReview(data);
  res.json(result);
  res.end();
}

export const getHitsReview = async (req, res) => {
  const result = await repository.getHitsReview();
  res.json(result);
  res.end();
}

export const getReview = async (req, res) => {
  const {id} = req.params;
  const result = await repository.getReview(id);
  res.json(result)
  res.end();
}

export const getReviewList = async(req, res) => {
  const data = req.body;
  const result = await repository.getReviewList(data);
  console.log(result);
  res.json(result)
  res.end()
}
import { axiosPost } from "./reduxAxios";
import { setFilter, setList, setCount, resetInit } from "../reducers/notievtReducer"

export const updateFilter = (filter) => {
  return (dispatch) => dispatch(setFilter(filter))
};

export const getList = (filter) => {
  const url = "//localhost:8080/board/notievt"
  const data = filter;

  return async(dispatch) => {
    const result = await axiosPost(url, data);
    if(result){
      dispatch(setList(result.list));
      dispatch(setCount(result.count));
    };
  }
}

export const resetData = () => {
  return (dispatch) => dispatch(resetInit())
}
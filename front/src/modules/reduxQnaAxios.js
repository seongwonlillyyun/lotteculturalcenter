import { axiosGet, axiosPost } from "./reduxAxios.js"
import { resetFilter, setQnAList, setQnATabs, setQnaCount, setQnaFilter } from "../reducers/qnaReducer.js";

export function getQnAList (filter) {
  const url = "//localhost:8080/board/qna";
  const data = filter;

  return async (dispatch) => {
    const result = await axiosPost(url, data);
    if(result) {
      dispatch(setQnAList(result.list))
      dispatch(setQnaCount(result.count))
    };
  }
}

export function getQnaTabs () {
  const url = "//localhost:8080/board/qna/tabs";

  return async(dispatch) => {
    const result = await axiosGet(url);
    if(result) dispatch(setQnATabs(result));
  }

}

export function updateQnaFilter (filter) {
  return (dispatch) => dispatch(setQnaFilter(filter));
}

export function resetInitFilter () {
  return dispatch => dispatch(resetFilter());
}
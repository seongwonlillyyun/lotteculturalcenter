import { axiosGet, axiosPost } from "./reduxAxios.js"
import { setQnAList, setQnATabs } from "../reducers/boardReducer.js";

export function getQnAList (filter) {
  const url = "//localhost:8080/board/qna";
  const data = filter;

  return async (dispatch) => {
    const result = await axiosPost(url, data);
    if(result) dispatch(setQnAList(result));
  }
}

export function getQnaTabs () {
  const url = "//localhost:8080/board/qna/tabs";

  return async(dispatch) => {
    const result = await axiosGet(url);
    if(result) dispatch(setQnATabs(result));
  }

}
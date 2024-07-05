import { axiosPost } from "./reduxAxios.js"
import { setQnAList } from "../reducers/boardReducer.js";

export function getQnAList () {
  const url = "//localhost:8080/board/qna";

  return async (dispatch) => {
    const result = await axiosPost(url);
    if(result) dispatch(setQnAList(result));
  }
}
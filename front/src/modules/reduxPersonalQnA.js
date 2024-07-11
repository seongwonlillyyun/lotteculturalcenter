import { setCount, setList } from "../reducers/personalQnaReducer";
import { axiosPost } from "./reduxAxios";

export const getPersonalList = (data) => {
  const url = "//localhost:8080/board/personal";
  return async (dispatch) => {
    const result = await axiosPost(url, data) 
    if(result) {
      dispatch(setList(result))
      dispatch(setCount(result.length));
    }
  }
}
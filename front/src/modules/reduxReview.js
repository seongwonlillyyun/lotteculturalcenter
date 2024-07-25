import { axiosGet, axiosPost } from "./reduxAxios";
import { setFilter, setList } from "../reducers/reviewReducer";

export const getList = (filter) => {
  const url = "//localhost:8080/board/review"
  const data = filter

  return async(dispatch) => {
    const result = await axiosPost(url, data);

    if(result) {
      dispatch(setList(result));
    }
  }
}

export const updateFilter = (filter) => (dispatch) => dispatch(setFilter(filter))
import { axiosPost, axiosGet } from "./reduxAxios";
import { setLocationList, setCategoryList } from "../reducers/menuReducer.js"

export const getLocationList = () => {
  const url = "//localhost:8080/location"
  return async (dispatch) => {
    const result = await axiosPost(url);
    if(result) dispatch(setLocationList(result))
  }
}

export const getCategoryList = () => {
  const url = "//localhost:8080/category";
  return async (dispatch) => {
    const result = await axiosGet(url);
    if(result) dispatch(setCategoryList(result));
  }
}
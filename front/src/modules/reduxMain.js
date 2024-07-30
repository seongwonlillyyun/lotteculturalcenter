import { setUpdateUser } from "../reducers/mainReducer";

export const updateUser = () => {
  return (dispatch) => dispatch(setUpdateUser());
}
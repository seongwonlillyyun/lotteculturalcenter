import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userState : false,
}

const mainReducer = createSlice({
  name : "main",
  initialState,
  reducers : {
    setUpdateUser : (state, action) => ({...state, userState : !state.userState})
  }
})

export const {setUpdateUser} = mainReducer.actions;
export default mainReducer.reducer;
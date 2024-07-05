import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  qnaList : [],
}

const boardReducer = createSlice({
  name : "board",
  initialState,
  reducers : {
    setQnAList : (state, action) => ({...state, qnaList : action.payload}),
  }
})

export const {setQnAList} = boardReducer.actions;
export default boardReducer.reducer;
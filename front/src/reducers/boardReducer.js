import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  qnaList : [],
  qnaTabs : [],
}

const boardReducer = createSlice({
  name : "board",
  initialState,
  reducers : {
    setQnAList : (state, action) => ({...state, qnaList : action.payload}),
    setQnATabs : (state, action) => ({...state, qnaTabs : action.payload})
  }
})

export const {setQnAList, setQnATabs} = boardReducer.actions;
export default boardReducer.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  qnaCount : 0,
  qnaList : [],
  qnaTabs : [],
}

const boardReducer = createSlice({
  name : "board",
  initialState,
  reducers : {
    setQnaCount : (state, action) => ({...state, qnaCount : action.payload}),
    setQnAList : (state, action) => ({...state, qnaList : action.payload}),
    setQnATabs : (state, action) => ({...state, qnaTabs : action.payload})
  }
})

export const {setQnAList, setQnATabs, setQnaCount} = boardReducer.actions;
export default boardReducer.reducer;
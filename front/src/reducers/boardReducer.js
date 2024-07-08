import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  qnaCount : 0,
  qnaList : [],
  qnaTabs : [],
  qnaFilter : {type : "", keyword : "", count : 10}
}

const boardReducer = createSlice({
  name : "board",
  initialState,
  reducers : {
    setQnaFilter : (state, action) => ({...state, qnaFilter : {...state.qnaFilter, ...action.payload}}),
    setQnaCount : (state, action) => ({...state, qnaCount : action.payload}),
    setQnAList : (state, action) => ({...state, qnaList : action.payload}),
    setQnATabs : (state, action) => ({...state, qnaTabs : action.payload})
  }
})

export const {setQnAList, setQnATabs, setQnaCount, setQnaFilter} = boardReducer.actions;
export default boardReducer.reducer;
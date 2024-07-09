import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  qnaCount : 0,
  qnaList : [],
  qnaTabs : [],
  qnaFilter : {type : "", keyword : "", count : 10},
}

const qnaReducer = createSlice({
  name : "qna",
  initialState,
  reducers : {
    setQnaFilter : (state, action) => ({...state, qnaFilter : {...state.qnaFilter, ...action.payload}}),
    setQnaCount : (state, action) => ({...state, qnaCount : action.payload}),
    setQnAList : (state, action) => ({...state, qnaList : action.payload}),
    setQnATabs : (state, action) => ({...state, qnaTabs : action.payload}),
  }
})

export const {setQnAList, setQnATabs, setQnaCount, setQnaFilter } = qnaReducer.actions;
export default qnaReducer.reducer;
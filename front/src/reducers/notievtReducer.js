import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter : {
    type : "공지사항", 
    keyword : "", 
    location : "전체지점", 
    count : 10
  },
  list : [],
  count : 0,
}

const notievtReducer = createSlice({
  name : "notievt",
  initialState,
  reducers : {
    setFilter : (state, action) => ({...state, filter : {...state.filter, ...action.payload}}),
    setList : (state, action) => ({...state, list : action.payload}),
    setCount : (state, action) => ({...state, count : action.payload}),
    resetInit : (state, action) => ({...state, ...initialState})
  }
})

export const {setFilter, setList, setCount, resetInit} = notievtReducer.actions;
export default notievtReducer.reducer;
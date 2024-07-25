import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter : {
    keyword : "",
    location : "",
    count : 5,
  },
  list : [],
  totalCount : 0,
}

const reviewReducer = createSlice({
  name : "review",
  initialState,
  reducers : {
    setList : (state, action) => ({...state, ...action.payload}),
    setFilter : (state, action) => ({...state, filter : {...state.filter, ...action.payload}})
  }
})

export const {setList, setFilter} = reviewReducer.actions;
export default reviewReducer.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationList : [],
  categoryList : [],
}

const boardReducer = createSlice({
  name : "menu",
  initialState,
  reducers : {
    setLocationList : (state, action) => ({...state, locationList : action.payload}),
    setCategoryList : (state, action) => ({...state, categoryList : action.payload}),
  }
})

export const { setLocationList, setCategoryList } = boardReducer.actions;
export default boardReducer.reducer;
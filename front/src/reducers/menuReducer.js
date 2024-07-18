import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active : "지점",
  locationList : [],
  categoryList : [],
}

const boardReducer = createSlice({
  name : "menu",
  initialState,
  reducers : {
    setActive : (state, action) => ({...state, active : action.payload}),
    setLocationList : (state, action) => ({...state, locationList : action.payload}),
    setCategoryList : (state, action) => ({...state, categoryList : action.payload}),
  }
})

export const { setLocationList, setCategoryList, setActive } = boardReducer.actions;
export default boardReducer.reducer;
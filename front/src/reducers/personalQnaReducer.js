import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count : 0,
  list : []
}

const PersonalQnAReducer = createSlice({
  name : "personal",
  initialState,
  reducers : {
    setList : (State, action) => ({...State, list : action.payload}),
    setCount : (state, action) => ({...state, count : action.payload}),
  }
})

export const {setList, setCount} = PersonalQnAReducer.actions;
export default PersonalQnAReducer.reducer;
import { createSlice } from '@reduxjs/toolkit';

 const initialState = {
    list : [],
    count : 0
 };


 const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 리스트
    setCartList(state, action) {
      state.list = action.payload.clist;
    },
    // 카운트
    setCount(state, action) {
      state.count = action.payload.count;
    }
  }
 })

 export const { setCartList, setCount } = cartReducer.actions;
 export default cartReducer.reducer;
import { createSlice } from '@reduxjs/toolkit';

 const initialState = {
    list : [] 
 };


 const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 리스트
    setCartList(state, action) {
      state.list = action.payload.clist;
    }
  }
 })

 export const { setCartList } = cartReducer.actions;
 export default cartReducer.reducer;
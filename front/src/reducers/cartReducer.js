import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

 const initialState = {
    list : [],
    count : 0,
    currentPos : 'cart'
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
    },
    // 카트 추가
    setCartItem(state, action) {
      if(action.payload.cnt === 1) {
        alert('장바구니에 추가되었습니다.');
       } else{
         alert('동일한 상품이 장바구니에 있습니다.')
       }
    }, 
    // 페이지별
    setCurrentPos(state, action){

    }
  }
 })

 export const { setCartList, setCount, setCartItem } = cartReducer.actions;
 export default cartReducer.reducer;
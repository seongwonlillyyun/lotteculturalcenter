import { createSlice } from '@reduxjs/toolkit';


 const initialState = {
    list : [],
    count : 0,
    currentPos : 'cart',
    
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
      // console.log('count->', action.payload.count);
      state.count = action.payload.count;
    },
    // 카트 추가
    setCartItem(state, action) {
      if(action.payload.cnt === 1) {
        state.count += 1;
       }
    }, 
    // 카트 삭제
    removeCartItem(state, action) {
      const deleteCount = action.payload.result[0].affectedRows; 
      if(deleteCount !== 0) {
        state.count -= deleteCount;
      }
    }, 
 
    // 페이지별
    setCurrentPos(state, action){

    }
  }
 })

 export const { setCartList, setCount, setCartItem, removeCartItem } = cartReducer.actions;
 export default cartReducer.reducer;
import { axiosGet, axiosPost} from './reduxAxios';
import { setCartList, setCount, setCartItem } from '../reducers/cartReducer';



// 리스트
export function cartListAxios(userId) {
  const url = 'http://127.0.0.1:8080/cart';
  const data = {'userId':userId};
  
  return async(dispatch) => {
    const clist = await axiosPost(url, data);
    dispatch(setCartList({clist}));
  }
}

// 카운트 
export function getCount(userId){
  const url = 'http://127.0.0.1:8080/cart/count'
  const data = {'userId': userId};

  return async(dispatch) => {
    const carts = await axiosPost(url, data);
    const count = carts.count;
    dispatch(setCount({count}));
    // console.log('count->', count);
  }
}

// 카트 추가
// export function cartItemAdd(id, userId){
//   const url =`http://127.0.0.1:8080/cart/add`;
//   const data = {
//     id : id, userId: userId
//   }
//   console.log('data->', data);
//   return async(dispatch) => {
//     const cnt = await axiosPost(url, data);
//     dispatch(setCartItem(cnt));
    
//   }
// }
import { axiosGet, axiosPost} from './reduxAxios';
import { setCartList, setCount, setCartItem, removeCartItem } from '../reducers/cartReducer';



// 결제 insert
export async function cartPaymentAxios(data){
  const url =`http://127.0.0.1:8080/order/add`;
  const payInsert = await axiosPost(url, data);
  
}


// 리스트
export function cartListAxios(userId) {
  const url = 'http://127.0.0.1:8080/cart';
  const data = {'userId':userId};
  return async(dispatch) => {
    const clist = await axiosPost(url, data);
    dispatch(setCartList({clist}));
  }
}

// 선택삭제
export function cartCheckRemoveAxios(cartItemList) {
  const url = 'http://127.0.0.1:8080/cart/remove';
  const data = {'cartItemList':cartItemList};
  return async(dispatch) => {
    const result = await axiosPost(url, data);
  
    dispatch(removeCartItem({result}));
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
  }
}

// 카트 추가
export function cartItemAdd(id, userId){
  const url =`http://127.0.0.1:8080/cart/add`;
  const data = {
    id : id, userId: userId
  }

  return async(dispatch) => {
    const cnt = await axiosPost(url, data);
    dispatch(setCartItem(cnt));
  }
}


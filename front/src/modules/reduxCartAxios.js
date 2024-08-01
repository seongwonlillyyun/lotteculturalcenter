import { axiosGet, axiosPost} from './reduxAxios';
import { setCartList, setCount, setCartItem, removeCartItem } from '../reducers/cartReducer';



// 결제리스트
// export async function cartPayList(userId){
//   const url = `http://127.0.0.1:8080/order/pay`;
//   const data = {'userId':userId};
//   const result = await axiosPost(url, data);
//   return result;

// }


// 사용 포인트
export async function cartUsePoint(data){
  const url = `http://127.0.0.1:8080/order/point`;
  const result = await axiosPost(url, data);
  return result;
} 


// 결제 insert
export async function cartPaymentAxios(data){
  const url =`http://127.0.0.1:8080/order/add`;
  const result = await axiosPost(url, data);

  return result;
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

// 전체삭제
export function cartCheckAllRemoveAxios(userId) {
  const url = 'http://127.0.0.1:8080/cart/removeall';
  const data = {'userId':userId};
  return async(dispatch) => {
    const result = await axiosPost(url, data);
    
    if(result === 1){
      dispatch(setCartList({clist : []}));
    }
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
    const {cnt} = await axiosPost(url, data);
    dispatch(setCartItem({cnt}));
    return cnt;
  }
}

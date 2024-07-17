import { axiosGet, axiosPost} from './reduxAxios';
import { setCartList, setCount} from '../reducers/cartReducer';



// 리스트
export function cartListAxios() {
  const url = 'http://127.0.0.1:8080/cart';
  const data = {'test':test};

  return async(dispatch) => {
    const clist = await axiosPost({url, data});
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
    console.log('count->', count);
  }
}
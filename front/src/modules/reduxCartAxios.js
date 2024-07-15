import { axiosGet, axiosPost} from './reduxAxios';
import { setCartList } from '../reducers/cartReducer';



// 리스트
export function cartListAxios() {
  const url = 'http://127.0.0.1:8080/cart';
  const data = {'test':test};

  return async(dispatch) => {
    const clist = await axiosPost({url, data});
    dispatch(setCartList({clist}));
  }
}
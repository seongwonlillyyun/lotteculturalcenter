import { createContext, useState } from 'react';
import { useSelector} from 'react-redux';


export const CheckContext = createContext();

export const CheckboxProvider = ({children}) => {
  const cartList = useSelector(state => state.cart.list); // 장바구니 db 리스트
  const [checkList, setCheckList] = useState([]); //장바구니 체크된 상품아이디
  const [inputCheck, setInputCheck] = useState(false) // 체크여부
  
    


  // 개별체크
  const handleCheck = (id, isChecked) => {
      if(isChecked){
        setCheckList((item => [...item, id]));
      }else{
        setCheckList(checkList.filter(item => item !== id))
      }
  };
  
  console.log('checkList개별체크', checkList);


  // 전체체크
  const handleAllCheck = (isChecked) => {
    if(isChecked){
      setCheckList(cartList.map(item => item.course_id));
    }else{
      setCheckList([]);
    }
    console.log('all->',checkList );
  }


  // false, true 체크 
  const checkedHandle = (isChecked) => {
    setInputCheck(isChecked);
  }

  console.log('inputCheck', inputCheck);




  // 체크박스 유효성검사(동의)
  const validateCheck = () => {




  }


  // 삭제하기
  const checkRemove = item => {
    // setCheckList(checkList.filter(el => el !== item))
  }


  return(
    <CheckContext.Provider value={{ handleCheck, checkedHandle,handleAllCheck, checkList}} >
      {children}
    </CheckContext.Provider>
  )

}


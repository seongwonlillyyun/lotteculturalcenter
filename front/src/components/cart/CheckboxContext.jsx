import { createContext, useState } from 'react';

const CheckContext = createContext();

export const CheckboxProvider = ({children}) => {

  
  // 삭제하기
  // const onRmove = item => {
  //   setCheckList(checkList.filter(el => el !== item))
  // }


  return(
    <CheckContext.Provider >
      {children}
    </CheckContext.Provider>
  )

}



export default CheckContext;
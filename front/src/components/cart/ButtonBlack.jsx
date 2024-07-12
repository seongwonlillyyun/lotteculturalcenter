import React from 'react';

export default function CartButtonBlack({name, color}) {
  return(
    
    <button type='button' className={color} >{name}</button>
  
  );
}
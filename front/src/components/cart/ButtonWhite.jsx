import React from 'react';

export default function CartButtonWhite({name, color}) {
  return(
      <button type='button' className={color} >{name}</button>
  );
}
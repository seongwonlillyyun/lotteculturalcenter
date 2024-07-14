import React from 'react';

export default function ButtonWhite({name, color, onClick}) {

  return(
      <button type='button' onClick={onClick} className={`btn ${color}`} >{name}</button>
  );
}
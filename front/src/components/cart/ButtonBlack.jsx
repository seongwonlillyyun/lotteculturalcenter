import React from 'react';

export default function ButtonBlack({name, color, onClick}) {
  
  return(
    <button type='button' onClick={onClick} className={`btn ${color}`} >{name}</button> 
  );
}
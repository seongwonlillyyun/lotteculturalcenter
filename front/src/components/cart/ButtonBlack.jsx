import React from 'react';

export default function ButtonBlack({name, color, onClick}) {

  const clickHandler = () => {
    onClick();
  }

  return(
    <button type='button' onClick={clickHandler} className={`btn ${color}`} >{name}</button> 
  );
}
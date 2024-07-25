import React, { useState } from 'react';
import OrderStep1 from '../components/cart/OrderStep1';
import OrderStep2 from '../components/cart/OrderStep2';



export default function Order() {
  const [stepOrder, setStepOrder] = useState(1)

  const nextStep = () => {
    setStepOrder(stepOrder + 1);
  }

  

  return(
    <div className=''>
      { stepOrder === 1 && (
        <OrderStep1 next={nextStep} stepOrder={stepOrder} />
      )}
      { stepOrder === 2 && (
        <OrderStep2 stepOrder={stepOrder} />
      )}
    </div>
  );
}
import React, { useState } from 'react';
import OrderStep1 from '../components/cart/OrderStep1';
import OrderStep2 from '../components/cart/OrderStep2';



export default function Order() {
  const [step, setStep] = useState(1)

  const nextStep = () => {
    setStep(step + 1);
  }

  

  return(
    <div className=''>
      { step === 1 && (
        <OrderStep1 next={nextStep} step={step} />
      )}
      { step === 2 && (
        <OrderStep2 step={step} />
      )}
    </div>
  );
}
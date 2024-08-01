import React, { useState, useEffect } from 'react';
import OrderStep1 from '../components/cart/OrderStep1';
import OrderStep2 from '../components/cart/OrderStep2';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Order() {
  const location = useLocation();
  const {cartItemList} = location.state
  const [stepOrder, setStepOrder] = useState(1)
  const [courseList, setCourseList] = useState([]);
  const initFinal = {
    order_no : "",
    orderPriceAll : "",
    inputPoint : 0,
    orderPrieAllPay : ""
  }
  const [finalData, setFinalData] = useState();

  useEffect(()=>{
    const url = "//localhost:8080/order/course";

    axios.post(url, {cartItemList})
      .then(result => setCourseList(result.data))
  },[])


  const nextStep = () => {
    setStepOrder(stepOrder + 1);
  }


  return(
    <div className=''>
      { stepOrder === 1 && (
        <OrderStep1 next={nextStep} stepOrder={stepOrder} courseList={courseList} cartItemList={cartItemList} setFinalData={setFinalData}/>
      )}
      { stepOrder === 2 && (
        <OrderStep2 stepOrder={stepOrder} finalData={finalData}/>
      )}
    </div>  
  );
}
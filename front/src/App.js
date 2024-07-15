import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState, useEffect } from "react";

// redux
import { useDispatch } from "react-redux";
import { getLocationList } from "./modules/reduxMenuAxios";

// root
import Root from "./Root";
import SearchByCenter from "./pages/SearchByCenter";
import SearchByTopic from "./pages/SearchByTopic";
import Test from "./pages/Test";
import Cart from "./pages/Cart";
import Order from "./pages/Order";


// pages
import CourseDetail from "./pages/CourseDetail";
import Login from "../src/components/Login.jsx"
import Join from "./pages/Join.jsx";
import CourseHistory from "./pages/CourseHistory.jsx";
import DetailHistory from "./pages/DetailHistory.jsx";
import {MypageModal}  from "./components/MypageModal.jsx";
import Location from "./pages/Location";
import QnA from "./pages/board/QnA";
import PersonalQnA from "./pages/board/PersonalQnA";
import NotiEvent from "./pages/board/NotiEvent";
import NotiEventDetail from "./pages/board/NotiEventDetail";

export default function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getLocationList());    
  },[])


  //! Mypage Model용
const [step, setStep] =useState(1)
const nextStep = () => {setStep(step+1)}
const preStep = () => {setStep(step-1)}


  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {path : "/course/:id", element : <CourseDetail/> },
      {path : "/location", element : <Location/> },
      {path : "/board/qna", element : <QnA/>},
      {path : "/board/personal", element : <PersonalQnA/>},
      {path : "/board/notievent", element : <NotiEvent/>},
      {path : "/board/notievent/:id", element : <NotiEventDetail/>},
      {path : "/location", element : <Location/> },
      {  path : "/login", element : <Login/> },
      { path : "/join" , element : <Join/> },
      {path:'/center/:id', element:<SearchByCenter/>},
      {path:'/topic/:id', element:<SearchByTopic/>},
      {path:'/test', element:<Test/>},
      {path : "/cart", element : <Cart/> },
      {path : "/order", element : <Order/> },
      {path :"/courseHistory", element : <CourseHistory/>},
      {path :"/detailHistory", element : <DetailHistory/>}, // path 변경예정
      {path :"/mypage", element : <MypageModal/>} // path 변경예정
    ]
  }])

  return <RouterProvider router={router}/>;
}
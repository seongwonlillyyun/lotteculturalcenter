import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState, useEffect } from "react";

// redux
import { useDispatch } from "react-redux";
import { getCategoryList, getLocationList } from "./modules/reduxMenuAxios";

// root
import Root from "./Root";
import SearchByCenter from "./pages/SearchByCenter";
import SearchByTopic from "./pages/SearchByTopic";

import Cart from "./pages/Cart";
import Order from "./pages/Order";


// pages
import CourseDetail from "./pages/CourseDetail";
import Login from "../src/components/Login.jsx"
import Join from "./pages/Join.jsx";
import CourseHistory from "./pages/CourseHistory.jsx";
import DetailHistory from "./pages/DetailHistory.jsx";
import ChangeMemberInfo from "./pages/ChangeMemberInfo.jsx";
import Location from "./pages/Location";
import QnA from "./pages/board/QnA";
import PersonalQnA from "./pages/board/PersonalQnA";
import NotiEvent from "./pages/board/NotiEvent";
import NotiEventDetail from "./pages/board/NotiEventDetail";
import PersonalDetail from "./pages/board/PersonalDetail";
import Main from './pages/Main';
import Review from './pages/board/Review';
import PersonalReview from "./pages/board/PersonalReview";
import ReviewDetail from "./pages/board/ReviewDetail";


export default function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getLocationList());
    dispatch(getCategoryList());
  },[])


  //! Mypage Model용
// const [step, setStep] =useState(1)
// const nextStep = () => {setStep(step+1)}
// const preStep = () => {setStep(step-1)}

// const [mypageModalOpen, setMypageModalOpen]=useState(false);
// const openMypage=()=>{
//   setMypageModalOpen(true)
// }
// const closeMypage=()=>{
//   setMypageModalOpen(false)
// }



  
  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {path : "/", element : <Main/>},
      {path : "/course/:id", element : <CourseDetail />},
      {path : "/location", element : <Location/> },
      {path : "/board/qna", element : <QnA/>},
      {path : "/board/personal", element : <PersonalQnA/>},
      {path : "/board/personal/:id", element : <PersonalDetail/>},
      {path : "/board/notievent", element : <NotiEvent/>},
      {path : "/location", element : <Location/> },
      {path : "/login", element : <Login/> },
      {path : "/join" , element : <Join/> },
      {path : '/center/:id', element:<SearchByCenter/>},
      {path : '/topic/:id', element:<SearchByTopic />},
      {path : "/cart", element : <Cart/> },
      {path : "/order", element : <Order/> },
      {path : "/changememberinfo" , element : <ChangeMemberInfo/> },
      {path : "/courseHistory", element : <CourseHistory/>},
  
      {path : "/board/notievent/:id", element : <NotiEventDetail/>},
      {path : "/board/review", element : <Review/>},
      {path : "/board/review/:id", element : <ReviewDetail/>},
      {path : "/review", element : <PersonalReview />},
      {path :"/courseHistory", element : <CourseHistory/>},
      {path :"/courseHistory/:orderId", element : <DetailHistory/>}, 
    ]
  }])

  return <RouterProvider router={router}/>;
}
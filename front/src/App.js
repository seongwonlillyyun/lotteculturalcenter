import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React,{useState} from "react";

// root
import Root from "./Root";

// pages
import Login from "../src/components/Login.jsx"
import Join from "./pages/Join.jsx";
import CourseHistory from "./pages/CourseHistory.jsx";
import DetailHistory from "./pages/DetailHistory.jsx";
import {MypageModal}  from "./components/MypageModal.jsx";
import ChangeMemberInfo from "./pages/ChangeMemberInfo.jsx";



export default function App() {

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
      {path : "/login", element : <Login/> },
      {path : "/join" , element : <Join/> },
      {path : "/changememberinfo" , element : <ChangeMemberInfo/> },
      {path :"/courseHistory", element : <CourseHistory/>},
      {path :"/detailHistory", element : <DetailHistory/>}, // path 변경예정
      // {path :"/mypage", element : <MypageModal modalState={mypageModalOpen} next={nextStep} close={closeMypage}/>} // path 변경예정
    ]
  }])

  return <RouterProvider router={router}/>;
}
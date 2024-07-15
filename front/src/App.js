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



export default function App() {

  //! Mypage Model용
const [step, setStep] =useState(1)
const nextStep = () => {setStep(step+1)}
const preStep = () => {setStep(step-1)}


  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {  path : "/login", element : <Login/> },
      { path : "/join" , element : <Join/> },
      {path :"/courseHistory", element : <CourseHistory/>},
      {path :"/detailHistory", element : <DetailHistory/>}, // path 변경예정
      {path :"/mypage", element : <MypageModal/>} // path 변경예정
    ]
  }])

  return <RouterProvider router={router}/>;
}
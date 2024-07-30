import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React,{useState} from "react";

// root
import Root from "./Root";

// pages
import Login from "../src/components/Login.jsx"
import Join from "./pages/Join.jsx";
import CourseHistory from "./pages/CourseHistory.jsx";
import DetailHistory from "./pages/DetailHistory.jsx";
import ChangeMemberInfo from "./pages/ChangeMemberInfo.jsx";

export default function App() {


  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {path : "/login", element : <Login/> },
      {path : "/join" , element : <Join/> },
      {path : "/changememberinfo" , element : <ChangeMemberInfo/> },
      {path :"/courseHistory", element : <CourseHistory/>},
      {path :"/courseHistory/:orderId", element : <DetailHistory/>}, 
    ]
  }])

  return <RouterProvider router={router}/>;
}
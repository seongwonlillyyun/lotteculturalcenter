import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

// redux
import { useDispatch } from "react-redux";
import { getLocationList } from "./modules/reduxMenuAxios";

// root
import Root from "./Root";

// pages
import CourseDetail from "./pages/CourseDetail";
import Location from "./pages/Location";
import QnA from "./pages/board/QnA";
import PersonalQnA from "./pages/board/PersonalQnA";
import NotiEvent from "./pages/board/NotiEvent";

export default function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getLocationList());    
  },[])

  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {path : "/course/:id", element : <CourseDetail/> },
      {path : "/location", element : <Location/> },
      {path : "/board/qna", element : <QnA/>},
      {path : "/board/personal", element : <PersonalQnA/>},
      {path : "/board/notievent", element : <NotiEvent/>},
    ]
  }])

  return <RouterProvider router={router}/>;
}
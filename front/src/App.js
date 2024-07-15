import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

// redux
import { useDispatch } from "react-redux";
import { getLocationList } from "./modules/reduxMenuAxios";

// root
import Root from "./Root";
import SearchByCenter from "./pages/SearchByCenter";
import SearchByTopic from "./pages/SearchByTopic";
import SearchByText from "./pages/SearchByText";

// pages
import CourseDetail from "./pages/CourseDetail";
import Login from "../src/components/Login.jsx"
import Join from "./pages/Join.jsx";
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
      {path:'/topic', element:<SearchByTopic/>},
      {path:'/text', element:<SearchByText/>}
    ]
  }])

  return <RouterProvider router={router}/>;
}
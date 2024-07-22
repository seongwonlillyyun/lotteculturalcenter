import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

// redux
import { useDispatch } from "react-redux";
import { getCategoryList, getLocationList } from "./modules/reduxMenuAxios";

// root
import Root from "./Root";

// pages
import CourseDetail from "./pages/CourseDetail";
import Location from "./pages/Location";
import QnA from "./pages/board/QnA";
import PersonalQnA from "./pages/board/PersonalQnA";
import NotiEvent from "./pages/board/NotiEvent";
import NotiEventDetail from "./pages/board/NotiEventDetail";
import PersonalDetail from "./pages/board/PersonalDetail";
import Main from './pages/Main';
import Review from './pages/board/Review';
import PersonalReview from "./pages/board/PersonalReview";

export default function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getLocationList());
    dispatch(getCategoryList());
  },[])

  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {path : "/", element : <Main/>},
      {path : "/course/:id", element : <CourseDetail/> },
      {path : "/location", element : <Location/> },
      {path : "/board/qna", element : <QnA/>},
      {path : "/board/personal", element : <PersonalQnA/>},
      {path : "/board/personal/:id", element : <PersonalDetail/>},
      {path : "/board/notievent", element : <NotiEvent/>},
      {path : "/board/notievent/:id", element : <NotiEventDetail/>},
      {path : "/board/review", element : <Review/>},
      {path : "/review", element : <PersonalReview />}
    ]
  }])

  return <RouterProvider router={router}/>;
}
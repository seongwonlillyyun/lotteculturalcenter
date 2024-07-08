import { createBrowserRouter, RouterProvider } from "react-router-dom";

// root
import Root from "./Root";

// pages
import CourseDetail from "./pages/CourseDetail";
import Location from "./pages/Location";
import QnA from "./pages/board/QnA";
import PersonalQnA from "./pages/board/PersonalQnA";

export default function App() {
  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {path : "/course/:id", element : <CourseDetail/> },
      {path : "/location", element : <Location/> },
      {path : "/board/qna", element : <QnA/>},
      {path : "/board/personal", element : <PersonalQnA/>}
    ]
  }])

  return <RouterProvider router={router}/>;
}
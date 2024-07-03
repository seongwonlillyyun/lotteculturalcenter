import { createBrowserRouter, RouterProvider } from "react-router-dom";

// root
import Root from "./Root";

// pages
import CourseDetail from "./pages/CourseDetail";
import Location from "./pages/Location";

export default function App() {
  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {path : "/course/:id", element : <CourseDetail/> },
      {path : "/location", element : <Location/> }
    ]
  }])

  return <RouterProvider router={router}/>;
}
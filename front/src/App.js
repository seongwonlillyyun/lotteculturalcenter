import { createBrowserRouter, RouterProvider } from "react-router-dom";

// root
import Root from "./Root";
import SearchByCenter from "./components/SearchByCenter";
import SearchByTopic from "./components/SearchByTopic";
import SearchByText from "./components/SearchByText";

// pages
import CourseDetail from "./pages/CourseDetail";

export default function App() {
  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {path : "/course/:id", element : <CourseDetail/> },
      {path:'/center/:id', element:<SearchByCenter/>},
      {path:'/topic', element:<SearchByTopic/>},
      {path:'/text', element:<SearchByText/>}
    ]
  }])

  return <RouterProvider router={router}/>;
}
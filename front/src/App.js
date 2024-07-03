import { createBrowserRouter, RouterProvider } from "react-router-dom";

// root
import Root from "./Root";
import SearchByCenter from "./pages/SearchByCenter";
import SearchByTopic from "./pages/SearchByTopic";
import SearchByText from "./pages/SearchByText";

// pages
import CourseDetail from "./pages/CourseDetail";
import Login from "../src/components/Login.jsx"
import Join from "./pages/Join.jsx";



export default function App() {
  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {path : "/course/:id", element : <CourseDetail/> },
      {  path : "/login", element : <Login/> },
      { path : "/join" , element : <Join/> },
      {path:'/center/:id', element:<SearchByCenter/>},
      {path:'/topic', element:<SearchByTopic/>},
      {path:'/text', element:<SearchByText/>}
    ]
  }])

  return <RouterProvider router={router}/>;
}
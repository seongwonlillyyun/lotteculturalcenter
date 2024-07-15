import { createBrowserRouter, RouterProvider } from "react-router-dom";

// root
import Root from "./Root";
<<<<<<< HEAD
import SearchByCenter from "./pages/SearchByCenter";
import SearchByTopic from "./pages/SearchByTopic";
import SearchByText from "./pages/SearchByText";
=======
import Cart from "./pages/Cart";
import Order from "./pages/Order";
>>>>>>> choi

// pages
import CourseDetail from "./pages/CourseDetail";
import Login from "../src/components/Login.jsx"
import Join from "./pages/Join.jsx";
import Location from "./pages/Location";

export default function App() {
  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
<<<<<<< HEAD
      {path : "/course/:id", element : <CourseDetail/> },
      {path : "/location", element : <Location/> },
      {  path : "/login", element : <Login/> },
      { path : "/join" , element : <Join/> },
      {path:'/center/:id', element:<SearchByCenter/>},
      {path:'/topic', element:<SearchByTopic/>},
      {path:'/text', element:<SearchByText/>}
=======
      {path : "/cart", element : <Cart/> },
      {path : "/order", element : <Order/> }
>>>>>>> choi
    ]
  }])

  return <RouterProvider router={router}/>;
}
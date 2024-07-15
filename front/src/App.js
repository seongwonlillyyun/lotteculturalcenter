import { createBrowserRouter, RouterProvider } from "react-router-dom";

// root
import Root from "./Root";
import SearchByCenter from "./pages/SearchByCenter";
import SearchByTopic from "./pages/SearchByTopic";
import Test from "./pages/Test";


// pages

export default function App() {
  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {path:'/center/:id', element:<SearchByCenter/>},
      {path:'/topic/:id', element:<SearchByTopic/>},
      {path:'/test', element:<Test/>},
    ]
  }])

  return <RouterProvider router={router}/>;
}
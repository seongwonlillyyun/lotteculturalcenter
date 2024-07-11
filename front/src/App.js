import { createBrowserRouter, RouterProvider } from "react-router-dom";

// root
import Root from "./Root";
import SearchByCenter from "./pages/SearchByCenter";
import SearchByTopic from "./pages/SearchByTopic";


// pages

export default function App() {
  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {path:'/center/:id', element:<SearchByCenter/>},
      {path:'/topic/:id', element:<SearchByTopic/>},
    ]
  }])

  return <RouterProvider router={router}/>;
}
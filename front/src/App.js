import { createBrowserRouter, RouterProvider } from "react-router-dom";

// root
import Root from "./Root";

// pages

export default function App() {
  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : []
  }])

  return <RouterProvider router={router}/>;
}
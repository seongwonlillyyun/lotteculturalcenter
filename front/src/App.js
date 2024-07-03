import { createBrowserRouter, RouterProvider } from "react-router-dom";

// root
import Root from "./Root";

// pages
import Login from "../src/components/Login.jsx"
import Join from "./pages/Join.jsx";



export default function App() {
  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {  path : "/login", element : <Login/> },
      { path : "/join" , element : <Join/> }
    ]
  }])

  return <RouterProvider router={router}/>;
}
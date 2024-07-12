import { createBrowserRouter, RouterProvider } from "react-router-dom";

// root
import Root from "./Root";
import Cart from "./pages/Cart";
import Order from "./pages/Order";

// pages

export default function App() {
  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {path : "/cart", element : <Cart/> },
      {path : "/order", element : <Order/> }
    ]
  }])

  return <RouterProvider router={router}/>;
}
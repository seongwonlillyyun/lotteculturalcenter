import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";

// root
import Root from "./Root";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import { useEffect, useState } from "react";

// pages

export default function App() {
  const [cartCount, setCartCount] = useState(0);//카트갯수 카운트

  // 카운트
  const addCartCount = (result) =>{
    if(result === 1) setCartCount(cartCount + 1);
  }


  
  const router = createBrowserRouter([{
    path : "/",
    element: <Root />,
    children : [
      {path : "/cart", element : <Cart/> },
      {path : "/order", element : <Order/> },
      {path : "/product", element : <Product /> },
      {path : "/product/:id", element : <ProductDetail addCartCount={addCartCount} /> }
    ]
  }])

  return <RouterProvider router={router}/>;
}
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom"
import Header from './components/Header';
import Footer from "./components/Footer";

export default function Root() {
  const location = useLocation();

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[location.pathname])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
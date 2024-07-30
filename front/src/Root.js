import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom"
import Header from './components/Header';
import Footer from "./components/Footer";
// import { MypageModal, MyBranchModal } from "./components/MypageModal";

export default function Root() {

 //! Mypage Model용
// const [step, setStep] =useState(1)
// const nextStep = () => {setStep(step+1)}
// const preStep = () => {setStep(step-1)}

// const [modalOpen, setModalOepn] = useState(false)
// const openModal = () => {
//   setModalOepn(true)
// }
// const closeModal = () => {
//   setModalOepn(false)}

const location = useLocation();

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[location.pathname])

  return (
    <>
     {/* { modalOpen === true && step ===1  
    ?<MypageModal next={nextStep} close={closeModal} modalState={modalOpen}/>
    :null}

    {modalOpen ===true && step===2 
    ?<MyBranchModal pre={preStep} close={closeModal}/>
    :null}  */}

      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// svg
import { ReactComponent as Logo } from "./../svg/logo.svg";

// gnb
import { gnb } from "./gnb.js";

// css
import "../css/header.css";

export default function Header() {
  const [activeDepth, setActiveDepth] = useState("applicate")
  let prevScrollY = 0;

  const scrollHandler = () => {
    const header = document.querySelector(".header_wrap");
    const currScrollY = window.scrollY;
 
    if(window.scrollY > 100 && !header.classList.contains("hover")){
      if(prevScrollY > currScrollY){
        header.classList.remove("hide");
        header.classList.add("show");
      } else {
        header.classList.remove("show");
        header.classList.add("hide");
      }
    } else {
      header.classList.remove("hide");
      header.classList.remove("show");
    }

    prevScrollY = currScrollY;
  }

  const mouseHandler = (e) => {
    const header = document.querySelector(".header_wrap");
    if(e.target.closest(".gnb") || e.target.closest(".gnb_child")){
      header.classList.add("hover");
    } else {
      header.classList.remove("hover");
    }
  }

  useEffect(()=>{
    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("mouseover", mouseHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("mouseover", mouseHandler);
    }
  })

  return (
    <>
      <div className="header_wrap">
        <div id="header">
          <div className="full_inner">
            <h1 className="logo">
              <Link to="/">
                <Logo />
              </Link>
            </h1>
            <Gnb setActiveDepth={setActiveDepth}/>
          </div>
        </div>
        <GnbChild activeDepth={activeDepth}/>
      </div>
    </>
  );
}

function Gnb({setActiveDepth}) {
  return (
    <ul className="gnb">
      {
        Object.keys(gnb).map(depth => (
          <li key={depth} onMouseEnter={()=>{setActiveDepth(depth)}}>
            {
              gnb[depth].path ?
              <Link to={gnb[depth].path}>{gnb[depth].name}</Link> :
              <p>{gnb[depth].name}</p>
            }
          </li>
        ))
      }
    </ul>
  );
}

function GnbChild({activeDepth}) {
  return (
    <div className="gnb_child">
      <div className="custom_inner">
        <ul>
          {
            gnb[activeDepth].children.map((link, i) => (
              link.path ?
              <li key={i}><Link to={link.path}>{link.name}</Link></li> :
              <li key={i}><button type="button">{link.name}</button></li>
            ))
          }
        </ul>
        <div className="img_box">
          <img src={gnb[activeDepth].imgPath} alt="" />
        </div>
      </div>
    </div>
  );
}
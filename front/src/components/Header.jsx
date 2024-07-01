import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// svg
import { ReactComponent as IconLogo } from "./../svg/logo.svg";
import { ReactComponent as IconLogIn } from "./../svg/icon-login.svg";
import { ReactComponent as IconLogOut } from "./../svg/icon-logout.svg";
import { ReactComponent as IconMyPage } from "./../svg/icon-mypage.svg";
import { ReactComponent as IconMyCart } from "./../svg/icon-cart.svg";
import { ReactComponent as IconSearch } from "./../svg/icon-search.svg";
import { ReactComponent as IconClose } from "./../svg/icon-close-x.svg"; 

// gnb
import { gnb } from "./gnb.js";

// utils
import { gnbActiveHandler, headerScroll } from "../utils/headerUtils.js";
import { openPopup, closePopup } from "../utils/popupUtils.js";

// css
import "../css/header.css";
import "../css/popup.css";

export default function Header() {
  const isLogin = true;
  const [activeDepth, setActiveDepth] = useState("applicate")
  const [prevScrollY, setPrevScrollY] = useState(0);

  const scrollHandler = () => {
    headerScroll(prevScrollY, setPrevScrollY);
  }
  
  useEffect(()=>{
    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("mouseover", gnbActiveHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("mouseover", gnbActiveHandler);
    }
  })

  return (
    <>
      <div className="header_wrap">
        <div id="header">
          <div className="full_inner">
            <h1 className="logo">
              <Link to="/">
                <IconLogo />
              </Link>
            </h1>
            <Gnb setActiveDepth={setActiveDepth}/>
            <div className="users">
              <SearchBtn />
              {
                isLogin ?
                <>
                  <Link className="mypage" to="/"><IconMyPage/></Link>
                  <Link className="mycart" to="/"><IconMyCart/><span className="cart_num">1</span></Link>
                  <Link to="/"><IconLogOut /></Link>
                </>
                : <Link to="/"><IconLogIn /></Link>
              }
            </div>
          </div>
        </div>
        <GnbChild activeDepth={activeDepth}/>
      </div>
      <SearchPopup />
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

function SearchBtn() {
  return (
    <div className="search_btn" onClick={()=>{openPopup(".search_popup")}}>
      <p className="placeholder">관심있는 강좌를 찾아보세요.</p>
      <IconSearch />
    </div>
  );
}

function SearchPopup() {
  const [keyword, setKeyWord] = useState("");
  const clickHandler = () => closePopup(".search_popup");

  const changeHandler = (e) => {
    const {value} = e.target;
    setKeyWord(value);
  }

  const submitHandler = () => {
    closePopup(".search_popup")
    setKeyWord("");
  }

  return (
    <form className="search_popup" onSubmit={submitHandler}>
      <div className="search">
        <div className="full_inner">
          <button className="close_btn" type="button" onClick={clickHandler}><IconClose /></button>
          <h2 className="tit">관심있는 강좌를<br />찾아보세요</h2>
          <div className="form_search">
            <input type="text" value={keyword} onChange={changeHandler} placeholder="검색어를 입력하세요"/>
            <button className="search_btn"><IconSearch /></button>
          </div>
        </div>
      </div>
      <div className="bg" onClick={clickHandler}></div>
    </form>
  );
}
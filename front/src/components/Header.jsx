import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { updateActive } from "../modules/reduxMenuAxios.js";
import { MypageModal, MyBranchModal } from "./MypageModal";
import { getCount } from '../modules/reduxCartAxios.js';
import { updateUser } from './../modules/reduxMain';

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
import { getUser, removeUser } from './../util/localStorage';

// css
import "../css/header.css";
import "../css/popup.css";

export default function Header() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.cart.count);
  const [activeDepth, setActiveDepth] = useState("applicate")
  const userState = useSelector(state => state.main.userState);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [step, setStep] =useState(1)
  const nextStep = () => {setStep(step+1)}
  const preStep = () => {setStep(step-1)}
  const [modalOpen, setModalOepn] = useState(false)
  const userInfo = getUser();
  const userId = userInfo && userInfo.user_id;

  
  // 카트카운트
  useEffect(()=>{ 
    dispatch(getCount(userId));
  },[userId])

  const openModal = () => {
    setModalOepn(true)
  }
  const closeModal = () => {
    setModalOepn(false)
    setStep(1)
  }

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

  useEffect(()=>{
    // userId = getUser() ? getUser().userId : "";
  },[userState])

  const logOutHandler = () => {
    alert("안전하게 로그아웃 되었습니다.")
    removeUser()
    dispatch(updateUser())
  }

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
              {
                userInfo ?
                <>
                  <button type="button" onClick={openModal}><IconMyPage/></button>
                  <Link className="mycart" to="/cart"><IconMyCart/><span className="cart_num">{count}</span></Link>
                  <button type="button" onClick={logOutHandler}><IconLogOut /></button>
                </>
                  : <Link to="/login"><IconLogIn /></Link>
              }
            </div>
          </div>
        </div>
        <GnbChild activeDepth={activeDepth}/>
      </div>
      <CategoryPopup />
      {
        modalOpen === true && step ===1  
        ?<MypageModal next={nextStep} close={closeModal}/>
        :null
      }
      {
        modalOpen ===true && step===2 
        ? <MyBranchModal pre={preStep} close={closeModal} setStep={setStep}/>
        :null
      }
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
  const dispatch = useDispatch();

  const clickHandler = (e) => {
    const text = e.currentTarget.innerText
    text === "지점으로 찾기" ? 
      dispatch(updateActive("지점")) :
      dispatch(updateActive("강좌"));
    openPopup(".category_popup")
  };

  return (
    <div className="gnb_child">
      <div className="custom_inner">
        <ul>
          {
            gnb[activeDepth].children.map((link, i) => (
              link.path ?
              <li key={i}><Link to={link.path}>{link.name}</Link></li> :
              <li key={i}><button type="button" onClick={clickHandler}>{link.name}</button></li>
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

function CategoryPopup() {
  const dispatch = useDispatch();
  const active = useSelector(state => state.menu.active);
  let locationList = useSelector(state => state.menu.locationList);
  let categoryList = useSelector(state => state.menu.categoryList);

  categoryList = categoryList.reduce((acc, cur) => {
    if(acc[cur.name]){
      return {...acc, [cur.name] : [...acc[cur.name], {csid : cur.csid, sub_name : cur.sub_name}]}
    } else {
      return {...acc, [cur.name] : [{csid : cur.csid, sub_name : cur.sub_name}]}
    }
  }, {})

  locationList = locationList.reduce((acc, cur) => {
    if(acc[cur.type]){
      return {...acc, [cur.type] : [...acc[cur.type], {name : cur.name, loc_id : cur.loc_id}]}
    } else {
      return {...acc, [cur.type] : [{name : cur.name, loc_id : cur.loc_id}]}
    }
  },{})


  const closeHandler = () => closePopup(".category_popup");
  const enterHandler = (e) => {
    document.querySelectorAll('.tab_menu li a').forEach(e => e.classList.add("off"))
    e.currentTarget.classList.remove("off");
  }

  const leaveHandler = () => {
    document.querySelectorAll(".tab_menu li a").forEach(e => e.classList.remove("off"));
  }

  const activeHandler = (text) => dispatch(updateActive(text));

  return (
    <div className="category_popup">
      <div className="inner">
        <button type="button" className="close_btn" onClick={closeHandler}><IconClose /></button>
        <div className="tab_btns">
          <h3 
            className={`btn ${active === "지점" && "on"}`}
            onMouseOver={() => activeHandler("지점")}
          >지점으로 찾기</h3>
          <h3 
            className={`btn ${active === "강좌" && "on"}`}
            onMouseOver={() => activeHandler("강좌")}
          >강좌로 찾기</h3>
        </div>
        <div className="tab_cons">
          <div className={`tab_con ${active === "지점" && "on"}`}>
            {
              Object.keys(locationList).map(key => (
                <div className="tab_menu" key={key}>
                  <h4>{key}</h4>
                  <ul>
                    {
                      locationList[key].map(v => (
                        <li key={v.loc_id}>
                          <Link 
                            to={`/center/${v.loc_id}`}
                            onMouseEnter={enterHandler}
                            onMouseLeave={leaveHandler}
                            onClick={closeHandler}
                          >{v.name}</Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              ))
            }
          </div>
          <div className={`tab_con ${active === "강좌" && "on"}`}>
            {
              Object.keys(categoryList).map(key => (
                <div className="tab_menu" key={key}>
                  <h4>{key}</h4>
                  <ul>
                    {
                      categoryList[key].map(v => (
                        <li key={v.csid}>
                          <Link 
                            to={`/topic/${v.csid}`}
                            onMouseEnter={enterHandler}
                            onMouseLeave={leaveHandler}
                            onClick={closeHandler}
                          >{v.sub_name}</Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

/*
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
*/
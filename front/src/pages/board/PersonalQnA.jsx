import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

import { getUser } from './../../util/localStorage';
import { getPersonalList } from './../../modules/reduxPersonalQnA';
import LoginError from "../../components/LoginError";

// css
import "../../css/board/boardCommon.css";
import "../../css/board/personalQna.css";

// svg
import {ReactComponent as IconNoData} from "../../svg/icon-no-srch.svg";
import {ReactComponent as IconClose} from "../../svg/icon-close-x.svg";

export default function PersonalQnA() {
  const userId = getUser() ? getUser().user_id : "test_soo";
  const [status, setStatus] = useState("");
  const [update, setUpdate] = useState(true);

  return userId ? (
    <>
      <div className="board_page board_personal">
        <div className="sub_visual">
          <h2 className="heading">1:1문의</h2>
        </div>
        <div className="board_personal narrow_page">
          <div className="min_inner">
            <BoardUtils status={status} setStatus={setStatus}/>
            <BoardList status={status} update={update}/>
          </div>
        </div>
        <PopupWrite setUpdate={setUpdate} />
      </div>
    </>
  ) : <LoginError />;
}

function BoardUtils({status, setStatus}) {
  const count = useSelector(state => state.personal.count);
  const [active, setActive] = useState(false);

  const activeHandler = () => {
    setActive(prev => !prev);
  }

  const statusHandler = (e) => {
    const status = e.target.textContent;
    status === "전체" ? setStatus("") : setStatus(status);
    setActive(false)
  }

  return (
    <div className="board_utils">
      <p className="board_count">전체 <b> {count}개</b></p>
      <div className={active ? "custom_select_wrap on" : "custom_select_wrap"}>
        <p onClick={activeHandler}><span>{status || "전체"}</span></p>
        <div className="custom_select">
          <ul>
            <li onClick={statusHandler} className={status === "" ? "on" : ""}>전체</li>
            <li onClick={statusHandler} className={status === "접수중" ? "on" : ""}>접수중</li>
            <li onClick={statusHandler} className={status === "답변완료" ? "on" : ""}>답변완료</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function BoardList({status, update}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = getUser() ? getUser().user_id : "test_soo";
  const list = useSelector(state => state.personal.list);

  useEffect(()=>{
    dispatch(getPersonalList({user_id : userId, status}))
  },[status, update])

  const popupOpen = () => {
    document.querySelector(".popup_wrap").classList.add("on");
    document.querySelector("body").classList.add("popup");
  }

  const clickHanlder = (id) => {
    navigate(`/board/personal/${id}`)
  }

  return (
    <>
      <div className="board_list">
        {
          list.length > 0 ?
          <ul>
            {
              list.map(v => (
                <li onClick={()=> clickHanlder(v.bid)}>
                  <span className={v.status === "접수중" ? "tag green" : "tag"}>{v.status}</span>
                  <p className='title'>{v.title}</p>
                  <p className='etc'>
                    <span>{v.name}</span>
                    <span>{v.type}</span>
                    <span>{v.date}</span>
                  </p>
                </li>
              ))
            }
          </ul> :
          <NoData />
        }
      </div>
      <div className="btns">
        <Link className="basic_btn" to="/board/qna">자주하는 문의</Link>
        <button onClick={popupOpen} className="basic_btn black" type="button">1:1문의 작성하기</button>
      </div>
    </>
  );
}

function NoData() {
  return (
    <div className="board_nodata">
      <IconNoData />
      <h3>문의글이 없습니다.</h3>
    </div>
  );
}

function PopupWrite({setUpdate}) {
  const location = useSelector(state => state.menu.locationList);
  const userId = getUser() ? getUser().user_id : "test_soo";
  const initData = {
    user_id : userId,
    title : "",
    type : "",
    loc_id : "",
    content : "",
  }
  const dataTitle = {
    title : "제목",
    type : "문의 유형",
    loc_id : "지점",
    content : "문의 내용",
  }
  const [data, setData] = useState(initData);
  let errorMsg = "";

  const validation = () => {
    let result = true;

    Object.keys(data).forEach(key => {
      if(!data[key].toString().trim()){
        errorMsg += errorMsg ? `, ${dataTitle[key]}` : dataTitle[key];
        result = false;
      }
    });

    const lastCharCode = errorMsg.charCodeAt(errorMsg.length - 1);
    const isJongSong = (lastCharCode - 0xAC00) % 28;

    errorMsg += `${isJongSong ? "을" : "를"} 입력해 주세요`;

    return result;
  }

  const changeHandler = (e) => {
    const {name, value} = e.target;
    setData(prev => ({...prev, [name] : value}));
  }

  const popupClose = () => {
    document.querySelector(".popup_wrap").classList.remove("on");
    document.querySelector("body").classList.remove("popup");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const url = "//localhost:8080/board/personal/add"

    if(validation()){
      axios({method : "post", url, data})
        .then(result => {
          if(result.data){
            alert("정상적으로 등록되었습니다.")
            popupClose();
            setUpdate(prev => !prev);
            setData(initData);
          }
        });
    } else {
      alert(errorMsg);
    }
  }

  return(
    <form className="popup_wrap" onSubmit={submitHandler}>
      <div className="bg"></div>
      <div className="popup">
        <div className="popup_top">
          <h3>1:1 문의 등록</h3>
          <button type="button" onClick={popupClose}><IconClose /></button>
        </div>
        <div className="popup_content_wrap">
          <div className="scroll_wrap">
            <div className="popup_content">
              <div className="notice">
                <ul>
                  <li>고객서비스의 [자주하는 문의]에서 자주 질문하는 답변을 보실 수 있습니다.</li>
                  <li>자주하는 문의에 없는 질문은 1:1 문의를 해주시면 빠른 시일 안에 답변을 보내드리겠습니다.</li>
                  <li>답변 내용은 마이페이지의 [1:1 문의]에서 확인하실 수 있습니다.</li>
                </ul>
              </div>
              <ul className="data_section">
                <li>
                  <h4>제목</h4>
                  <input type="text" name="title" value={data.title} placeholder="제목을 입력해 주세요." onChange={changeHandler}/>
                </li>
                <li>
                  <h4>문의 유형</h4>
                  <select name="type" value={data.type} onChange={changeHandler}>
                    <option value="">선택</option>
                    <option value="회원가입">회원가입</option>
                    <option value="수강신청">수강신청</option>
                    <option value="강좌/강사">강좌/강사</option>
                    <option value="환불/취소">환불/취소</option>
                    <option value="홈페이지">홈페이지</option>
                    <option value="기타">기타</option>
                  </select>
                </li>
                <li>
                  <h4>지점</h4>
                  <select name="loc_id" value={data.loc_id} onChange={changeHandler}>
                    <option value="">선택</option>
                    {
                      location.map(loc => (
                        <option key={loc.loc_id} value={loc.loc_id}>{loc.name}</option>
                      ))
                    }
                  </select>
                </li>
                <li>
                  <h4>문의 내용</h4>
                  <textarea name="content" value={data.content} onChange={changeHandler} placeholder="문의 내용을 입력해주세요."></textarea>
                </li>
              </ul>
              <div className="btns">
                <button type="button" className="basic_btn" onClick={popupClose}>취소하기</button>
                <button className="basic_btn black">등록하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
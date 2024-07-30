
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser } from './../../util/localStorage';
import { useNavigate } from 'react-router-dom';
import LoginError from '../../components/LoginError';

// svg
import {ReactComponent as IconClose} from "../../svg/icon-close-x.svg";
import {ReactComponent as IconNoData} from "../../svg/icon-no-srch.svg";

// css
import "../../css/board/personalReview.css"

export default function PersonalReview() {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [target, setTarget] = useState();
  const [list, setList] = useState([]);
  const initData = {
    orderId : 0,
    star : 5,
    title : "",
    content : "",
  }
  const [formData, setFormData] = useState(initData);
  const userId = getUser() ? getUser().user_id : "";
  const data = {
    userId,
  }

  useEffect(()=>{
    const url = "//localhost:8080/board/myReview"

    axios.post(url, data)
      .then(result => setList(result.data))
  },[update])

  const popupOpen = (id) => {
    document.querySelector(".popup_wrap").classList.add("on");
    document.querySelector("body").classList.add("popup");
    setFormData(prev => ({...prev, orderId : id}))
    setTarget(list.filter(v => v.orderId == id)[0])
  }

  const linkHandler = (id) => {
    navigate("/board/review/" + id);
  }

  return userId ? (
    <div className='board_page board_review personalReview'>
      <div className="sub_visual">
        <h2 className="heading">나의 수강후기</h2>
      </div>
      <div className="narrow_page">
        <div className="min_inner">
          <div className="board_utils">
            <p className="board_count">전체 <b>{list.length}</b>개</p>
          </div>
          {
            list.length > 0 ?
            <div className="review_list">
              <ul>
              {
                list.map(v => (
                  <li key={v.orderId} className='item' onClick={v.isReviewed ? () => linkHandler(v.rid) : ()=>popupOpen(v.orderId)}>
                    <div className="img_box">
                      <img src={"//localhost:8080/" + v.course_img} alt="" />
                    </div>
                    <div className="txt_box">
                      <span className='tag'>{v.name}</span>
                      <h3>{v.course_name}</h3>
                    </div>
                    <div className="etc_box">
                      {
                        v.isReviewed ?
                        <div className="star">
                          {
                            Array.from(new Array(v.star), (_,i) => i).map(v => (
                              <span key={v}></span>
                            ))
                          }
                        </div> :
                        <button type="button" className='write_btn' onClick={()=>popupOpen(v.orderId)}>후기작성</button>
                      }
                    </div>
                  </li>
                ))
              }
              </ul>
            </div> :
            <NoData />
          }
        </div>
      </div>
      <PopupWrite initData={initData} data={formData} setUpdate={setUpdate} setData={setFormData} target={target}/>
    </div>
  ) : (
    <LoginError />
  );
}

function PopupWrite ({initData, data, setUpdate, setData, target}) {

  let errorMsg = "";

  const dataTitle = {
    title : "제목",
    content : "후기",
  }

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

  const starHandler = (e) => {
    const point = e.target.dataset.idx;
    setData(prev => ({...prev, star : point}))
  }

  const popupClose = () => {
    document.querySelector(".popup_wrap").classList.remove("on");
    document.querySelector("body").classList.remove("popup");
    setData(initData)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const url = "//localhost:8080/board/review/add"

    if(validation()){
      axios.post(url, data)
        .then(result => {
          if(result.data){
            alert("정상적으로 등록되었습니다.");
            setData(initData);
            setUpdate(prev => !prev);
            popupClose();
          }
        })
    } else {
      alert(errorMsg)
    }

  }

  return (
    <form className="popup_wrap" onSubmit={submitHandler}>
      <div className="bg"></div>
      <div className="popup">
        <div className="popup_top">
          <h3>나의 수강후기 등록</h3>
          <button type="button" onClick={popupClose}><IconClose /></button>
        </div>
        <div className="popup_content_wrap">
          <div className="scroll_wrap">
            <div className="popup_content">
              {
                target && 
                <div className="review_list">
                  <div className="item">
                    <div className="img_box">
                      <img src={"//localhost:8080/" + target.course_img} alt="" />
                    </div>
                    <div className="txt_box">
                      <div className="tag">
                        <span>{target.name}</span>
                      </div>
                      <h3>{target.course_name}</h3>
                      <p>
                        <span>{target.name}</span>
                        <span>{target.teacher_name}</span>
                        <span>{target.course_date}</span>
                      </p>
                    </div>
                  </div>
                </div>
              }
              <ul className="data_section">
                <li>
                  <h4>별점</h4>
                  <div className="start_box">
                    {
                      Array.from(new Array(5), (_,i) => i+1).map(v => (
                        <span key={v} data-idx={v} className={v <= data.star ? "star" : "star blank"} onClick={starHandler}></span>
                      ))
                    }
                  </div>
                </li>
                <li>
                  <h4>제목</h4>
                  <input type="text" name="title" value={data.title} placeholder="제목을 입력해 주세요." onChange={changeHandler}/>
                </li>
                <li>
                  <h4>후기</h4>
                  <textarea 
                    name="content" 
                    value={data.content} 
                    onChange={changeHandler} 
                    placeholder={`· 광고, 욕설, 악의적 비방, 허위사실 기재 등의 내용 등록 시 관리자에 의해 삭제 될 수 있습니다.\n· 이모지는 수강후기 등록시 자동으로 삭제되어 저장됩니다.\n· 작성하신 수강후기는 1년간 보관 됩니다.\n· 고객님의 소중한 개인정보 보호를 위하여 별도 연락처 등의 기재를 삼가해주시기 바랍니다.\n· 수강후기를 작성하시면 L.POINT 50P 적립해드립니다. (사진 첨부 시 150P 적립)`}
                  >
                  </textarea>
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

function NoData() {
  return (
    <div className="board_nodata">
      <IconNoData />
      <h3>수강 후기가 없습니다.</h3>
    </div>
  );
}
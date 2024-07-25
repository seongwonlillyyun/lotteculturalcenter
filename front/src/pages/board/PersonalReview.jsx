
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser } from './../../util/localStorage';

// svg
import {ReactComponent as IconClose} from "../../svg/icon-close-x.svg";

import "../../css/board/personalReview.css"

export default function PersonalReview() {
  const [target, setTarget] = useState();
  const [list, setList] = useState([]);
  const initData = {
    orderId : 0,
    star : 5,
    title : "",
    content : "",
  }
  const [formData, setFormData] = useState(initData);
  const userId = getUser() ? getUser().user_id : "test_soo";
  const data = {
    userId,
  }

  useEffect(()=>{
    const url = "//localhost:8080/board/myReview"

    axios.post(url, data)
      .then(result => setList(result.data))
  },[])

  const popupOpen = (id) => {
    document.querySelector(".popup_wrap").classList.add("on");
    document.querySelector("body").classList.add("popup");
    setFormData(prev => ({...prev, orderId : id}))
  }

  return (
    <div className='board_page personalReview'>
      <div className="sub_visual">
        <h2 className="heading">나의 수강후기</h2>
      </div>
      <div className="narrow_page">
        <div className="min_inner">
          {
            list.map(v => (
              <div className="box">
                {v.orderId}
                {v.course_name}
                {
                  Boolean(v.isReviewed)
                  ? <button type="button">리뷰읽기</button>
                  : <button type="button" onClick={()=>popupOpen(v.orderId)}>리뷰쓰기</button>
                }
              </div>
            ))
          }
        </div>
      </div>
      <PopupWrite initData={initData} data={formData} setData={setFormData}/>
    </div>
  );
}

function PopupWrite ({initData, data, setData}) {

  const changeHandler = (e) => {
    const {name, value} = e.target;
    setData(prev => ({...prev, [name] : value}));
  }

  const popupClose = () => {
    document.querySelector(".popup_wrap").classList.remove("on");
    document.querySelector("body").classList.remove("popup");
    setData(initData)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const url = "//localhost:8080/board/review/add"
    axios.post(url, data)
      .then(result => {
        if(result.data){
          alert("정상적으로 등록되었습니다.");
          setData(initData);
          popupClose();
        }
      })
  }

  return (
    <form className="popup_wrap" onSubmit={submitHandler}>
      <div className="bg"></div>
      <div className="popup">
        <div className="popup_top">
          <h3>수강 후기 등록</h3>
          <button type="button" onClick={popupClose}><IconClose /></button>
        </div>
        <div className="popup_content_wrap">
          <div className="scroll_wrap">
            <div className="popup_content">
              <ul className="data_section">
                <li>
                  <h4>제목</h4>
                  <input type="text" name="title" value={data.title} placeholder="제목을 입력해 주세요." onChange={changeHandler}/>
                </li>
                <li>
                  <h4>별점</h4>
                  <select name="star" value={data.star} onChange={changeHandler}>
                    <option value="1">★☆☆☆☆</option>
                    <option value="2">★★☆☆☆</option>
                    <option value="3">★★★☆☆</option>
                    <option value="4">★★★★☆</option>
                    <option value="5">★★★★★</option>
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
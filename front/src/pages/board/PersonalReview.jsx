
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser } from './../../util/localStorage';

// svg
import {ReactComponent as IconClose} from "../../svg/icon-close-x.svg";

export default function PersonalReview() {
  const [target, setTarget] = useState();
  const [list, setList] = useState([]);
  const userId = getUser() ? getUser().userId : "test_soo";
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
    setTarget(id)
  }

  return (
    <div className='personalReview'>
      <div className="sub_visual">
        <h2 className="heading">나의 수강후기</h2>
      </div>
      <div className="narrow_page">
        <div className="min_inner">
          {
            list.map(v => (
              <div className="box">
                {v.order_no}
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
      <PopupWrite orderId={target}/>
    </div>
  );
}

function PopupWrite ({orderId}) {
  const initData = {
    orderId,
    title : "",
    content : "",
  }
  console.log(initData);
  const [data, setData] = useState(initData);

  const changeHandler = (e) => {
    const [name, value] = e.target;
    setData(prev => ({...prev, [name] : value}))
  }

  const popupClose = () => {
    document.querySelector(".popup_wrap").classList.remove("on");
    document.querySelector("body").classList.remove("popup");
    setData(initData)
  }

  const submitHandler = (e) => {
    e.preventDefault();
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
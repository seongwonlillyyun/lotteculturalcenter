import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper/modules"
import axios from 'axios';

import 'swiper/css';
import "../css/main.css";

export default function Main() {
  return (
    <div className="main_page narrow_page">
      <MainVisual />
      <Recommend />
      <Category />
      <NewCourse />
      <NotiEvent />
    </div>
  );
}

function MainVisual() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(()=>{
    const url = "//localhost:8080/main/slide"

    axios.get(url)
      .then(result => setList(result.data));
  },[])

  const clickHandler = (id) => {
    navigate(`/board/notievent/${id}`)
  }

  return (
    <div className="main_visual">
      <div className="full_inner">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{delay : 5000}}
          loop={true}
          speed={2000}
        >
          {
            list.map(v => (
              <SwiperSlide onClick={() => clickHandler(v.bid)}>
                <img className="bg" src={`//localhost:8080/${v.img_path}`} alt="" />
                <div className="txt_box">
                  <h2>{v.title}</h2>
                  {
                    v.summary && 
                    <p>
                      {v.summary}
                    </p>
                  }
                  <p>[자세히보기]</p>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}

function Recommend() {
  return(
    <div className="main_recommend">
      <div className="inner">
        <div className="main_title">
          <b>추천강좌</b>
          <h3>
            엄선된 강좌를 <br />
            소개합니다
          </h3>
        </div>
      </div>
    </div>
  );
}

function Category() {
  return (
    <div className="main_category_wrap">
      <div className="main_title">
        <div className="inner">
          <b>강좌 카테고리</b>
          <h3>
            일상을 빛낼 취향을 <br />
            발견하세요!
          </h3>
        </div>
      </div>
      <div className="main_category">
        <div className="custom_inner">
          <div className="select_category">
            <div className="select_box">
              <img src="" alt="" />
              <select name="">
                <option value="">test</option>
              </select>
            </div>
          </div>
          <ul className="course_list">
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function NewCourse() {
  return (
    <div className="new_course">
      <div className="inner">
        <div className="main_title">
          <b>신규강좌</b>
          <h3>
            새롭게 개설된 강좌를 <br />
            지금 확인해보세요
          </h3>
        </div>
      </div>
    </div>
  );
}

function NotiEvent() {
  return(
    <div className="main_notiEvent">
      <div className="inner">
        <Link className="notice_btn" to="/board/notievent">롯데문화센터의 다양한 소식을 확인해보세요!</Link>
      </div>
    </div>
  );
}
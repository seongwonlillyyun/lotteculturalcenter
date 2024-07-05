import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import axios from 'axios';
import KakaoMap from './../components/KakaoMap';

// css
import 'swiper/css';
import "../css/location.css";
import "../css/board/boardCommon.css";

// svg
import {ReactComponent as IconAddr} from "../svg/icon-address.svg";
import {ReactComponent as IconPhone} from "../svg/icon-phone-number.svg";

export default function Location() {
  const initMapData = {
    level : 7
  }
  const [activeType, setActiveType] = useState("서울점");
  const [activeLoc, setActiveLoc] = useState();
  const [data, setData] = useState([]);
  const [mapData, setMapData] = useState(initMapData);
  const [location, setLocation] = useState();
  const [slides, setSlides] = useState([]);
  

  useEffect(()=>{
    const url = "//localhost:8080/location";
    const data = {type : activeType}
    axios({method : "post", url, data})
      .then(result => {
        setData(result.data);
        setMapData(prev => ({
          ...prev, 
          list : result.data, 
          center : {lat : result.data[0].c_lat, lng : result.data[0].c_lng}
        }))
      });
  },[activeType])

  useEffect(()=>{
    setLocation(data.filter(v => v.loc_id === activeLoc)[0]);
    const url = `//localhost:8080/location/${activeLoc}`
    axios({method : "get", url})
      .then(result => setSlides(result.data))
  }, [activeLoc])

  return (
    <div className='location'>
      <div className="sub_visual">
        <h2 className="heading">지점안내</h2>
      </div>
      <div className="content">
        <div className="min_inner narrow_page">
          <TabBtns 
            data={data} 
            setMapData={setMapData} 
            activeType={activeType} 
            setActiveType={setActiveType}
            activeLoc={activeLoc}
            setActiveLoc={setActiveLoc}
          />
          <KakaoMap mapData={mapData} setActiveLoc={setActiveLoc}/>
          {
            location &&
            <>
              <ul className='location_info'>
                <li>
                  <i><IconAddr /></i>
                  <p>{location.addr}<br/>{location.addr_detail}</p>
                </li>
                <li>
                  <i><IconPhone /></i>
                  <p>{location.tel}</p>
                </li>
              </ul>
              <div className="location_photo">
                <h3>{location.name} 둘러보기</h3>
                <div className="swiper-container">
                  <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    autoplay={{delay : 5000}}
                    loop={true}
                    speed={1000}
                    navigation={{
                      nextEl : ".swiper-button-next",
                      prevEl : ".swiper-button-prev"
                    }}
                    pagination={{
                      type : "custom",
                      renderCustom : (swiper, curr, total) => {
                        console.log(curr, total);
                        return "<b>"+curr+"</b>" + " / " + total;
                      }
                    }}
                  >
                    {
                      slides.map((path, i) => (
                        <SwiperSlide key={i}>
                          <img src={`//localhost:8080/${path.img_path}`} alt="" />
                        </SwiperSlide>
                      ))
                    }
                  </Swiper>
                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
}

function TabBtns({data, setMapData, activeType, setActiveType, activeLoc, setActiveLoc}) {
  const typeHandler = (e) => {
    const type = e.target.textContent;
    const level = e.target.dataset.level;
    setActiveType(type);
    setActiveLoc();
    setMapData({
      level,
      list : data,
      center : {lat : data[0].c_lat, lng : data[0].c_lng}
    })
  }

  const locHandler= (loc_id) => {
    const changeList = data.filter(v => v.loc_id === loc_id);
    setActiveLoc(loc_id)
    setMapData({
      level : 3,
      list : data.filter(v => v.loc_id === loc_id),
      center : {lat : changeList[0].lat, lng : changeList[0].lng}
    })
  }

  return (
    <div className="board_tab_wrap type1">
      <div className="tap_main_btns">
        <button 
          className={activeType === "서울점" ? "btn on" : "btn"} 
          type="button" 
          onClick={typeHandler}
          data-level={7}
        >서울점</button>
        <button 
          className={activeType === "수도권점" ? "btn on" : "btn"} 
          type="button" 
          onClick={typeHandler}
          data-level={10}
        >수도권점</button>
        <button 
          className={activeType === "지방점" ? "btn on" : "btn"} 
          type="button" 
          onClick={typeHandler}
          data-level={11}
        >지방점</button>
      </div>
      {
        data &&
        <div className='tab_sub_btns'>
          {
            data.map((v,i) => (
              <button type="button" 
                className={activeLoc === v.loc_id ? "btn on" : "btn"} 
                key={i} 
                onClick={()=>{locHandler(v.loc_id)}}
              >{v.name}</button>
            ))
          }
        </div>
      }
    </div>
  );
}
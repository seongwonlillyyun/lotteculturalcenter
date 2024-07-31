import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faX,
  faRotateRight,
  faClock,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

export function DropDown({ className }) {
  return (
    <ul className={className}>
      <li className="dropdown_list_st st_seoul">
        <p>성인강좌</p>
      </li>
      <li>
        <Link to="/topic/1">공예</Link>
      </li>
      <li>
        <Link to="/topic/5">노래</Link>
      </li>
      <li>
        <Link to="/topic/9">드로잉</Link>
      </li>
      <li>
        <Link to="/topic/13">쿠킹</Link>
      </li>
    </ul>
  );
}

export function DropDownSort({ click, sortStd }) {
  const changeStd = (e, sort) => {
    click(e, sort);
  };
  return (
    <ul className="sortdropdown_content">
      <li>
        <p
          onClick={() => changeStd("강의시작일순", 8)}
          style={{
            color: sortStd === "강의시작일순" ? "#000" : "rgba(0, 0, 0, .6)",
          }}
        >
          강의시작일순
        </p>
      </li>
      <li>
        <p
          onClick={() => changeStd("낮은가격순", 9)}
          style={{
            color: sortStd === "낮은가격순" ? "#000" : "rgba(0, 0, 0, .6)",
          }}
        >
          낮은가격순
        </p>
      </li>
      <li>
        <p
          style={{
            color: sortStd === "높은가격순" ? "#000" : "rgba(0, 0, 0, .6)",
          }}
          onClick={() => changeStd("높은가격순", 10)}
        >
          높은가격순
        </p>
      </li>
    </ul>
  );
}

export function ModalPage({ openModal, closeModal, click, searchstd, search }) {
  const [info, setInfo] = useState({
    day: [1, 2, 3, 4, 5, 6, 7],
    time: "",
    center: []
  });
  const [isActive, setIsActive] = useState({
    day: false,
    time: false,
    center: false,
  });
  const [selected, setSelected] = useState({ day: "", time: "", center: [] });
  const [searchText, setSearchText] = useState("");
  const [addCenter, setAddCenter] = useState("");
  const [centerList, setCenterList] = useState([])

  const center = [
    {
      sort: "서울점",
      list: [
        { name: "잠실점", id: 1 },
        { name: "본점", id: 2 },
        { name: "강남점", id: 3 },
        { name: "건대스타시티점", id: 4 },
      ],
    },
    {
      sort: "수도권점",
      list: [
        { name: "인천점", id: 5 },
        { name: "동탄점", id: 6 },
        { name: "구리점", id: 7 },
        { name: "분당점", id: 8 },
      ],
    },
    {
      sort: "지방점",
      list: [
        { name: "부산본점", id: 9 },
        { name: "광복점", id: 10 },
        { name: "광주점", id: 11 },
        { name: "대구점", id: 12 },
      ],
    },
  ];

  const handleActive = (txt, e) => {
    const { name, value } = e.target;
    if (selected.day === "" || selected.time === "") {
      setIsActive({ ...isActive, [name]: true });
      if (name === "day") {
        setInfo({ ...info, center:[1,2,3,4,5,6,7,8,9,10,11,12],  day: [...value] });
        setSelected({ ...selected, [name]: txt });
      } else if (name === "time") {
        setInfo({ ...info, center:[1,2,3,4,5,6,7,8,9,10,11,12], time: value });
        setSelected({ ...selected, [name]: txt });
      } else if (name === "center") {
        if (info.center.length !== 0 && info.center.includes(value)) {
          let result = info.center.filter((item) => item !== value);
          setInfo({ ...info, center: result });
          let centertxt = selected.center.filter((item) => item !== txt);
          setSelected({ ...selected, center: centertxt });
        } else {
          setInfo({ ...info, [name]: [...info.center, value] });
          setSelected({ ...selected, [name]: [...selected.center, txt] });
        }
      }
    } else if (selected.day !== "" || selected.time !== "") {
      if (info.center.length !== 0 && info.center.includes(value)) {
        let result = info.center.filter((item) => item !== value);
        setInfo({ ...info, center: result });
        let centertxt = selected.center.filter((item) => item !== txt);
        setSelected({ ...selected, center: centertxt });
      } else {
        setIsActive({ ...isActive, [name]: false });
        setSelected({ ...selected, [name]: "" });
        setInfo({ ...info, [name]: "" });
      }
    }
  };

  const handleDetail = () => {
    click(info, selected, searchText);
    closeModal();
  };
  const handleReset = () => {
    setInfo({ day: "", time: "", center: [] });
    setIsActive({ day: false, time: false, center: false });
    setSelected({ day: "", time: "", center: [] });
    setSearchText("");
  };
  const writingText = (e) => {
    const { name, value } = e.target;
    setSearchText(value);
  };
  const handleSearch = () => {
    search(searchText);
    closeModal();
  };
  return (
    <div className="modal_out" onClick={closeModal}>
      <div className="modal_container" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={closeModal}>
          <FontAwesomeIcon icon={faX} />
        </button>
        <div className="modal_content_search">
          <p className="modal_search_title">상세검색</p>
          <div className="topic_search_div">
            <input
              type="text"
              name="searchtxt"
              onChange={writingText}
              value={searchText}
              placeholder="강좌명 or 강사명으로 검색"
              className="modal_search_text"
            />
            <button
              className="modal_searc_text_btn"
              type="button"
              onClick={handleSearch}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          <ul className="modal_search_std_topic modal_search_center">
            <li className="modal_search_std_title_topic">
              <p className="std_title">
                지점
              </p>
            </li>
            {center.map((items) => (
              <li className="test">
                <p>{items.sort}</p>
                <ul className="center_btn_list">
                  {items.list.map((item) => (
                    <li>
                      <button
                        name="center"
                        value={item.id}
                        className={
                          selected.center.includes(item.name) ||
                          searchstd.center.includes(item.name)
                            ? "center_btn_active"
                            : "center_btn"
                        }
                        onClick={(e) => {
                          setAddCenter(item.name);
                          handleActive(item.name, e);
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <ul className="modal_search_std_topic modal_search_day">
            <li className="modal_search_std_title_topic">
              <p className="std_title">요일</p>
            </li>
            <li>
              <button
                className={
                  (isActive && selected.day === "평일") ||
                  searchstd.day === "평일"
                    ? "modal_btn_active modal_day"
                    : "modal_btn modal_day"
                }
                type="button"
                name="day"
                value={[2, 3, 4, 5, 6]}
                onClick={(e) => handleActive("평일", e)}
              >
                평일
              </button>
              <button
                className={
                  (isActive && selected.day === "주말") ||
                  searchstd.day === "주말"
                    ? "modal_btn_active modal_day"
                    : "modal_btn modal_weekend"
                }
                type="button"
                name="day"
                value={[1, 7]}
                onClick={(e) => handleActive("주말", e)}
              >
                주말
              </button>
            </li>
          </ul>
          <ul className="modal_search_std_topic modal_search_time">
            <li className="modal_search_std_title_topic">
              <p className="std_title"> 시간</p>
            </li>
            <li>
              <button
                className={
                  (isActive && selected.time === "오전") ||
                  searchstd.time === "오전"
                    ? "modal_btn_active modal_before"
                    : "modal_btn modal_before"
                }
                type="button"
                name="time"
                value={"am"}
                onClick={(e) => handleActive("오전", e)}
              >
                오전
              </button>
              <button
                className={
                  (isActive && selected.time === "오후") ||
                  searchstd.time === "오후"
                    ? "modal_btn_active modal_after"
                    : "modal_btn modal_after"
                }
                type="button"
                name="time"
                value={"pm"}
                onClick={(e) => handleActive("오후", e)}
              >
                오후
              </button>
            </li>
          </ul>
          <div className="modal_btn_last_list">
            <button
              className="modal_btn_last modal_btn_reset"
              onClick={handleReset}
            >
              <FontAwesomeIcon icon={faRotateRight} />
              <span className="reset_title">초기화</span>
            </button>
            <button
              className="modal_btn_last modal_btn_result_topic"
              type="button"
              onClick={handleDetail}
            >
              강좌보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CourseItem({ item, handleAddCart }) {  
  return (
    <div className="topic_course_item">
    <Link to={`/course/${item.course_id}`}>
      <div className="topic_course_img_box">
        <img
          src={`//localhost:8080/${item.course_img}`}
          alt="course_img"
          className="topic_course_item_img"
        />
      </div>
      <div className="topic_course_item_status">
        <p className="topic_course_item_status_apply">{item.status}</p>
        <p className="topic_course_item_status_center">{item.name}</p>
      </div>
      <p className="topic_course_item_title">{item.course_name}</p>
      <p className="topic_course_item_teacher">{item.teacher_name}</p>
      <div className="topic_course_item_info">
        <FontAwesomeIcon icon={faClock} />
        <p>
          {item.course_week} {item.start_time}~{item.end_time}, 총{" "}
          {item.num_of_course}회
        </p>
      </div>
      </Link>
      <div className="topic_course_item_price">
        <p>{item.price}원</p>
        <button className="topic_course_item_cart" onClick={()=>handleAddCart(item.course_id)}>
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    </div>
  );
}

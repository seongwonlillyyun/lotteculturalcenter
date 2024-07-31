import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faX,
  faRotateRight,
  faClock,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function DropDown({className}) {
  return (
    <ul className={className}>
      <li className="dropdown_list_st st_seoul">
        <p>서울점</p>
      </li>
      <li>
        <Link to="/center/1">잠실점</Link>
      </li>
      <li>
        <Link to="/center/2">본점</Link>
      </li>
      <li>
        <Link to="/center/3">강남점</Link>
      </li>
      <li>
        <Link to="/center/4">건대스타시티점</Link>
      </li>
      <li className="dropdown_list_st">
        <p>수도권점</p>
      </li>
      <li>
        <Link to="/center/5">인천점</Link>
      </li>
      <li>
        <Link to="/center/6">동탄점</Link>
      </li>
      <li>
        <Link to="/center/7">구리점</Link>
      </li>
      <li>
        <Link to="/center/8">분당점</Link>
      </li>
      <li className="dropdown_list_st">
        <p>지방점</p>
      </li>
      <li>
        <Link to="/center/9">부산본점</Link>
      </li>
      <li>
        <Link to="/center/10">광복점</Link>
      </li>
      <li>
        <Link to="/center/11">광주점</Link>
      </li>
      <li>
        <Link to="/center/12">대구점</Link>
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

export function CategoryMiddleMenu({ item, cindex, index }) {
  return (
    <>
    <div className="middle_category_div">
      <img
        className={
          cindex == index ? "middle_category_img_active" : "middle_category_img"
        }
        src={item.img}
        alt="middle_sub_img"
      /> 
      <p
        className={
          cindex === index
            ? "middle_category_txt_active"
            : "middle_category_txt"
        }
      >
        {item.name}
      </p>
    </div>
      
    </>
  );
}

export function ModalPage({ openModal, closeModal, click, searchstd, search }) {
  const [info, setInfo] = useState({ day: [1,2,3,4,5,6,7], time: "" });
  const [selected, setSelected] = useState({ day: "", time: "" });
  const [searchText, setSearchText] = useState("");
  const [dayActive, setDayActive] = useState({weekday:false, weekend:false });
  const [timeActive, setTimeActive] = useState({am:false,pm:false})

  const handleActive = (txt, e) => {
    const { name, value } = e.target;
    if (selected.day === "" || selected.time === "") {
      setSelected({ ...selected, [name]: txt });
      if (name === "day") {
        setInfo({ ...info, [name]: [...value] });
      } else if (name === "time") {
        setInfo({ ...info, [name]: value });
      }
    } else if (selected.day !== "" || selected.time !== "") {
      if(selected.day === txt || selected.time === txt){
        setSelected({ ...selected, [name]: "" });
        setInfo({ ...info, [name]: "" });
      } else{
        setSelected({ ...selected, [name]: txt });
        setInfo({ ...info, [name]: value });
      }
    }
  };
  const handleDetail = () => {
    click(info, selected, searchText);
    closeModal();
  };
  const handleReset = () => {
    setInfo({ day: "", time: "" });
    setSelected({ day: "", time: "" });
    setSearchText('')
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
          <div className="center_div">
            <input
              type="text"
              name="searchtxt"
              onChange={writingText}
              value={searchText}
              placeholder="강좌명 or 강사명으로 검색"
              className="modal_search_text"
            />
            <button
              className="modal_searc_text_btn_center"
              type="button"
              onClick={handleSearch}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          <ul className="modal_search_std modal_search_day">
            <li className="modal_search_std_title">
              <p className="std_title">요일</p>
            </li>
            <li>
              <button
                className={
                  (/* isActive && */ selected.day === "평일") ||
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
                  (/* isActive && */ selected.day === "주말") ||
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
          <ul className="modal_search_std modal_search_time">
            <li className="modal_search_std_title">
              <p className="std_title"> 시간</p>
            </li>
            <li>
              <button
                className={
                  (/* isActive &&  */selected.time === "오전") ||
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
                  (/* isActive &&  */selected.time === "오후") ||
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
          <div className="center_modal_btn_last_list">
            <button
              className="modal_btn_last_center modal_btn_reset"
              onClick={handleReset}
            >
              <FontAwesomeIcon icon={faRotateRight} />
              <span className="reset_title">초기화</span>
            </button>
            <button
              className="modal_btn_last_center modal_btn_result"
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
    <div className="center_course_item">
      <Link to={`/course/${item.course_id}`}>
      <div className="center_course_img_box">
        <img
          src={`//localhost:8080/${item.course_img}`}
          alt="center_course_img"
          className="center_course_item_img"
        />
      </div>
      <div className="center_course_item_status">
        <p className="center_course_item_status_apply">{item.status}</p>
        <p className="center_course_item_status_center">{item.name}</p>
      </div>
      <p className="center_course_item_title">{item.course_name}</p>
      <p className="center_course_item_teacher">{item.teacher_name}</p>
      <div className="center_course_item_info">
        <FontAwesomeIcon icon={faClock} />
        <p>
          {item.course_week} {item.start_time}~{item.end_time}, 총{" "}
          {item.num_of_course}회
        </p>
      </div>
      </Link>
      <div className="center_course_item_price">
        <p>{item.price}원</p>
        <button className="center_course_item_cart" onClick={()=>handleAddCart(item.course_id)}>
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    </div>
  );
}

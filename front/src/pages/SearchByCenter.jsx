import { useEffect, useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import "../css/bycenter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faFilter,
  faArrowRotateRight,
  faXmark,
  faAngleUp,
  faAngleDown,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
  DropDown,
  DropDownSort,
  CategoryMiddleMenu,
  ModalPage,
  CourseItem,
} from "../components/SearchByCenterComponents";
import { getUser } from '../util/localStorage.js'
import { useDispatch, useSelector } from 'react-redux';
import { cartItemAdd } from '../modules/reduxCartAxios.js';

export default function SearchByCenter() {
  const { id } = useParams();
  const [showCourse, setShowCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [detail, setDetail] = useState({
    day: [1, 2, 3, 4, 5, 6, 7],
    time: "",
  });
  const [sort, setSort] = useState(8);
  const [center, setCenter] = useState({});
  const [cindex, setCindex] = useState(0);
  const [view, setView] = useState(false);
  const [smallCategory, setSmallCategory] = useState(0);
  const [selected, setSelected] = useState({ day: "", time: "" });
  const [test, setTest] = useState("");
  const [searchText, setSearchText] = useState("%%");
  const [courseCount, setCourseCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const cartList = useSelector(state => state.cart.list);
  const userId = getUser() ? getUser().user_id : "";

//장바구니 추가
//   const handleAddCart = (id) => {
//     const userInfo = getUser();
    
//     if(userInfo !== null){
//     const userId = userInfo.user_id;
//     // const userId = getUser() ? getUser().user_id : "test";
//     dispatch(cartItemAdd(id, userId));
//     navigate('/cart');
//     }else {
//     alert('로그인이 필요한 기능입니다.');
//     }
// }
   //장바구니 추가
   const handleAddCart = (id) => {
    
    if(userId !== null){
      const isCart = cartList.filter(v => v.course_id === id);
      if(isCart.length === 0){
        dispatch(cartItemAdd(id, userId));
        window.confirm('장바구니에 추가되었습니다.') && navigate('/cart');
      } else {
        alert('동일한 상품이 장바구니에 있습니다.')
      }
    }else {
      alert('로그인이 필요한 기능입니다.');
    }
  }



  const searchDetail = (value, selected) => {
    setDetail(value);
    setSelected(selected);
  };
  useEffect(() => {
    setCindex(0);
    setSmallCategory(0);
    setDetail({ day: [1, 2, 3, 4, 5, 6, 7], time: "" });
    setCurrentPage(1);
    setSearchText("%%");
    axios({
      method: "get",
      url: `http://127.0.0.1:8080/center/${id}`,
      data: id,
    })
      .then((response) => setCenter(...response.data))
      .catch((error) => console.log(error));
  }, [id]);
  let endIndex = 0;
  endIndex = currentPage * pageSize;
  useEffect(() => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8080/center/${id}/course`,
      data: {
        id: id,
        cid: cindex,
        csid: smallCategory,
        day: detail.day,
        time: detail.time,
        text: searchText,
        end: endIndex,
        sort: sort,
      },
    })
      .then((response) => {
        setShowCourse([response.data.courses]);
        setCourseCount({ ...response.data.count }[0].count);
      })
      .catch((error) => console.log(error));
  }, [cindex, smallCategory, detail, searchText, endIndex, sort]);

  const category = [
    {
      name: "전체",
      img: "/img/category_img_all.jpg",
      list: [{ id: 0 }],
    },
    {
      name: "공예",
      img: "/img/category_img_crafts.jpg",
      list: [
        { name: "전체", id: 0 },
        { name: "플라워", id: 1 },
        { name: "도예", id: 2 },
        { name: "가죽", id: 3 },
        { name: "캔들/비누", id: 4 },
      ],
    },
    {
      name: "노래",
      img: "/img/category_img_sing.jpg",
      list: [
        { name: "전체", id: 0 },
        { name: "노래교실", id: 5 },
        { name: "보컬트레이닝", id: 6 },
        { name: "성악", id: 7 },
        { name: "기타", id: 8 },
      ],
    },
    {
      name: "드로잉",
      img: "/img/category_img_drawing.jpg",
      list: [
        { name: "전체", id: 0 },
        { name: "유화", id: 9 },
        { name: "마카", id: 10 },
        { name: "색연필", id: 11 },
        { name: "수채화", id: 12 },
      ],
    },
    {
      name: "쿠킹",
      img: "/img/category_img_cooking.jpg",
      list: [
        { name: "전체", id: 0 },
        { name: "한식", id: 13 },
        { name: "일식/중식", id: 14 },
        { name: "양식", id: 15 },
        { name: "다이어트", id: 16 },
      ],
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const [sortview, setSortView] = useState(false);
  const [sortStd, setSortStd] = useState("강의시작일순");
  const handleSort = (value, sort) => {
    setSortView(false);
    setSortStd(value);
    setSort(sort);
  };
  const handledetailReset = () => {
    setSelected({ day: "", time: "" });
    setTest("");
    setDetail({ day: [1, 2, 3, 4, 5, 6, 7], time: "" });
  };

  const handleDetailDelete = (value) => {
    if (value === "day") {
      setSelected({ ...selected, day: "" });
      setDetail({ ...detail, day: [1, 2, 3, 4, 5, 6, 7] });
    } else if (value === "time") {
      setSelected({ ...selected, time: "" });
      setDetail({ ...detail, time: "" });
    } else if (value === "text") {
      setTest("");
      setSearchText("%%");
    }
  };

  const handleSearchText = (value) => {
    setSearchText(`%${value}%`);
    setTest(value);
  };
  let cntarr = showCourse[0];
  return (
    <>
      <div className="bycenter_title_part">
        <p
          className="bycenter_title"
          onClick={() => {
            setView(!view);
          }}
        >
          <span>{center.center_name}</span>
          {""}
          {view ? (
            <FontAwesomeIcon className="center_arrow" icon={faAngleUp}/>
          ) : (
            <FontAwesomeIcon className="center_arrow" icon={faAngleDown} />
          )}
          {view === true ? (
            <DropDown className="dropdown_list_center" />
          ) : (
            <DropDown className="dropdown_list_unactive_center" />
          )}
        </p>
      </div>
      <div className="bycenter_list min_inner narrow_page">
        <ul className="middle_category_list">
          {category.map((item, i) => (
            <li
              value={i}
              key={i}
              onClick={() => {
                setCindex(i);
                setSmallCategory(0);
                setSortStd("강의시작일순");
              }}
              className="middle_category_item"
            >
              <CategoryMiddleMenu item={item} cindex={cindex} index={i} />
            </li>
          ))}
        </ul>

        <ul
          className="small_category_items"
          style={{
            "border-bottom": cindex === 0 ? "none" : "1px solid #E3E1DE",
          }}
        >
          {category[cindex].list.map((item, i) => (
            <li className="small_category_item">
              <p
                onClick={() => setSmallCategory(item.id)}
                value={item}
                className={
                  smallCategory === item.id
                    ? "small_category_name_active"
                    : "small_category_name"
                }
              >
                {item.name}
              </p>
            </li>
          ))}
        </ul>
        <div className="center_search_part">
          <p className="center_coursecount">
            <span className="countnumber">{courseCount}개</span>의 강좌
          </p>
          <div className="center_search_part_btns">
            <button className="search_part_detail" onClick={openModal}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <span style={{ marginLeft: ".4rem" }}>상세검색</span>
            </button>
            {showModal === true ? (
              <ModalPage
                openModal={openModal}
                closeModal={closeModal}
                click={searchDetail}
                searchstd={selected}
                search={handleSearchText}
              />
            ) : null}
            <button
              className="search_part_sort"
              onClick={() => {
                setSortView(!sortview);
              }}
            >
              <FontAwesomeIcon icon={faFilter} />
              <span style={{ marginLeft: ".4rem" }}>{sortStd}</span>
            </button>
            <div style={{ position: "relative" }}>
              {sortview && (
                <DropDownSort click={handleSort} sortStd={sortStd} />
              )}
            </div>
          </div>
        </div>
        {selected.day !== "" || selected.time !== "" || test !== "" ? (
          <ul className="handle_search_standard">
            <li className="handle_search_li_ct">
              <button
                className="handle_search_reset_ct"
                onClick={handledetailReset}
              >
                <FontAwesomeIcon icon={faArrowRotateRight} />
              </button>
            </li>
            {selected.day !== "" ? (
              <li>
                <p className="handle_search_day_ct">
                  {selected.day}
                  <button
                    className="search_reset_btn_ct"
                    type="button"
                    onClick={() => handleDetailDelete("day")}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </p>
              </li>
            ) : null}
            {selected.time !== "" ? (
              <li>
                <p className="handle_search_time_ct">
                  {selected.time}
                  <button
                    className="search_reset_btn_ct"
                    onClick={() => handleDetailDelete("time")}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </p>
              </li>
            ) : null}
            {test !== "" ? (
              <li>
                <p className="handle_search_text_ct">
                  {test}
                  <button
                    className="search_reset_btn_ct"
                    onClick={() => handleDetailDelete("text")}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </p>
              </li>
            ) : null}
          </ul>
        ) : null}

        <div className="course_list_content">
          {cntarr && cntarr.length !== 0 ? (
            <>
              {showCourse.map((items, index) => (
                <ul className="center_course_list">
                  {items.map((item, index) => (
                    <li key={index}>
                      <CourseItem item={item} handleAddCart={handleAddCart} />
                    </li>
                  ))}
                </ul>
              ))}
              {courseCount > endIndex && (
                <div className="nomorecourse_div">
                  <button
                    className="morebtn"
                    type="button"
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                    }}
                  >
                    강좌더보기+
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="nomorecourse_div">
              <FontAwesomeIcon className="nocourse_icon" icon={faExclamation} />
              <p className="nocourse_text">진행중인 강좌가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser } from './../util/localStorage';
import axios from "axios"
import { cartItemAdd, cartListAxios} from '../modules/reduxCartAxios.js';
import { useSelector, useDispatch} from 'react-redux';

// svg
import {ReactComponent as IconCart } from "../svg/icon-cart.svg";

// css
import "../css/courseDetail.css";

export default function CourseDetail() {
  const dispatch = useDispatch();
  const cartList = useSelector(state => state.cart.list); // db리스트
  // userID
  const user_id = getUser() ? getUser().user_id : "";
  const {id} = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    const url = `//localhost:8080/course/${id}`;

    axios({method : "get", url})
      .then(result => {
        setData(result.data)
      })
    dispatch(cartListAxios(user_id))
  },[id,user_id])

  const cartAddHandler = () => {
    if(user_id){
      const isCart = cartList.filter(v => v.course_id == id);
console.log('ddd',cartList);

      if(isCart.length === 0){
        dispatch(cartItemAdd(id, user_id));
        window.confirm('장바구니에 추가되었습니다.') && navigate('/cart');
      } else {
        alert('동일한 상품이 장바구니에 있습니다.')
      }
    } else {
      window.confirm("로그인이 필요한 서비스 입니다.") &&
      navigate("/login");
    }
  }

  const orderHandler = () => {
    if(user_id){
      navigate("/order", {state : {cartItemList : [{id : parseInt(id)}]}})
    } else {
      window.confirm("로그인이 필요한 서비스 입니다.") &&
      navigate("/login");
    }
  }

  return data && (
    <div className="course_detail basic_page">
      <div className="min_inner flex_wrap">
        <div className="left">
          {
            data.course_content &&
            <div className="course_content" dangerouslySetInnerHTML={{__html:data.course_content}}></div>
          }
          {
            data.course_schedule &&
            <div className="course_schedule">
              <div className="content_title">강의일정</div>
              <ul>
                {
                  data.course_schedule.split("\n").map((txt, i) => (
                    <li key={i}>
                      <h4>{txt.split(":")[0]}</h4>
                      <p>{txt.split(":")[1]}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
          }
          {
            data.course_note &&
            <div className="course_note">
              <div className="content_title">준비물/특이사항</div>
              <ul className="course_list">
                {
                  data.course_note.split("\n").map((txt, i)=>(
                    <li key={i}>{txt}</li>
                  ))
                }
              </ul>
            </div>
          }
          <div className="course_notification">
            <h3 className="content_title">유의사항</h3>
            <ul className="course_list">
              <li>강좌 취소 및 환불은 수업 참여여부와 상관없이 [평생교육법 시행령]에 의거해 처리됩니다.</li>
              <li>일반 강좌는 개강 1일 전까지 취소 및 환불 가능하며, 당일 취소는 적용되지 않습니다.</li>
              <li>재료 준비가 필요한 일부 강좌는 강좌 시작일의 3일 전까지만 전액 취소가 가능합니다.</li>
              <li>수강신청 인원이 미달될 경우 강좌가 폐강될 수 있으며, 수강료는 전액 환불됩니다.</li>
              <li>회원정보에서 실제수강자명과 핸드폰 번호를 반드시 확인해주세요.</li>
              <li>영유아 강좌는 아이와 보호자 1인만 참여 가능합니다.</li>
              <li>강의 당일 무료주차를 위하여 개강 전일까지 회원정보수정 메뉴를 통해 차량번호 등록 바랍니다. (일부 점포 제외)</li>
              <li>문의 : 해당 점 데스크 (운영시간 점별 상이)</li>
            </ul>
          </div>
        </div>
        <div className="right sticky">
          <div className="course_utils sticky_child">
            <div className="course_info_wrap">
              <div className="course_info">
                <div className="course_state">
                  <span className="point">{data.status}</span>
                  <span>{data.loc_name}</span>
                </div>
                <div className="course_name">
                  <div className="img_box">
                    <img src={`//localhost:8080/${data.course_img}`} alt="" />
                  </div>
                  <div className="txt_box">
                    <h3>{data.course_name}</h3>
                    <p>{data.course_summary}</p>
                  </div>
                </div>
                <table className="course_table">
                  <tbody>
                    <tr>
                      <th>지점</th>
                      <td>{data.loc_name}</td>
                    </tr>
                    <tr>
                      <th>강사명</th>
                      <td>{data.teacher_name}</td>
                    </tr>
                    <tr>
                      <th>강의기간</th>
                      <td>{data.course_start} ~ {data.course_end}</td>
                    </tr>
                    <tr>
                      <th>강의시간</th>
                      <td>({data.course_week}) {data.start_time} ~ {data.end_time}</td>
                    </tr>
                    <tr>
                      <th>강의횟수/정원</th>
                      <td>{data.num_of_course}회/{data.num_of_people}명</td>
                    </tr>
                    <tr>
                      <th>수강료</th>
                      <td>{data.price}원</td>
                    </tr>
                    <tr>
                      <th>접수기간</th>
                      <td>{data.apply_start} ~ {data.apply_end}</td>
                    </tr>
                    <tr>
                      <th>문의처</th>
                      <td>{data.tel}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="course_btns">
              <button type="button" className="cart_btn" onClick={cartAddHandler}><IconCart /></button>
              <button type="button" className="purchase_btn" onClick={orderHandler}>수강신청</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
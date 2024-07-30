import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import "../../css/board/boardCommon.css"
import "../../css/board/boardDetailCommon.css";
import "../../css/board/reviewDetail.css";

// svg
import {ReactComponent as IconStar} from "../../svg/icon-star.svg";

export default function ReviewDetail() {
  const {id} = useParams();
  const [data, setData] = useState();

  useEffect(()=>{
    axios.get("//localhost:8080/board/review/"+id)
      .then(result => setData(result.data))
  },[])

  return data && (
    <div className="board_page board_detail review_detail basic_page">
      <div className="min_inner">
        <div className="detail_top">
          <p className="label">
            <span>{data.user_name}</span>
            <span>{data.date}</span>
          </p>
          <h3 className="title">{data.title}</h3>
          <div className="stars">
            {
              Array.from(Array(data.star), (_, i)=> i).map(v => (
                <IconStar key={v} />
              ))
            }
          </div>
        </div>
        <div className="detail_content">
          <div className="txt">
            {
              data.content
            }
          </div>
          <div className="detail_course">
            <h3>수강정보</h3>
            <div className="course">
              <div className="img_box">
                <img src={"//localhost:8080/" + data.course_img} alt="" />
              </div>
              <div className="txt_box">
                <h4>{data.course_name}</h4>
                <div className="tags">
                  <span>{data.name}</span>
                  <span>{data.teacher_name}</span>
                  <span>{data.course_start} ~ {data.course_end}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="detail_bot">
          <Link className="basic_btn" to={-1}>목록으로</Link>
        </div>
      </div>
    </div>
  );
}
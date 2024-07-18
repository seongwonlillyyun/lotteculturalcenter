import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import "../../css/board/boardCommon.css"
import "../../css/board/boardDetailCommon.css";

export default function PersonalDetail() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const {id} = useParams();

  useEffect(()=>{
    const url = `//localhost:8080/board/personal/${id}`
    axios.get(url)
      .then(result => setData(result.data))
  },[])

  const deleteHandler = (id) => {
    const url = `//localhost:8080/board/personal/delete/${id}`
    axios.get(url)
      .then(result => {
        if(result.data === 1){
          alert("정상적으로 삭제되었습니다.")
          navigate("/board/personal");
        }
      })
  }

  return data && (
    <div className="board_page board_detail basic_page">
      <div className="min_inner">
        <div className="detail_top">
          <p className="label">
            <span>{data.name}</span>
            <span>{data.type}</span>
            <span>{data.date}</span>
          </p>
          <h3 className="title">{data.title}</h3>
        </div>
        <div className="detail_content" dangerouslySetInnerHTML={{__html : data.content.replaceAll("\n", "<br/>")}}></div>
        {
          data.answer &&
          <div className="detail_answer">
            <span className="tag">답변</span>
            <p className="answer" dangerouslySetInnerHTML={{__html : data.answer.replaceAll("\n", "<br/>")}}></p>
          </div>
        }
        <div className="detail_bot">
          <button type="button" className="delete_btn" onClick={()=> deleteHandler(data.bid)}>나의 문의 삭제하기</button>
          <Link className="basic_btn" to="/board/personal">목록으로</Link>
        </div>
      </div>
    </div>
  );
}
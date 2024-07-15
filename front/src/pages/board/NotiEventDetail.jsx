import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import "../../css/board/boardCommon.css"
import "../../css/board/boardDetailCommon.css";

export default function NotiEventDetail() {
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(()=>{
    const url = `//localhost:8080/board/notievt/${id}`
    axios.get(url)
      .then(result => setData(result.data))
  },[])

  return data && (
    <div className="board_page board_detail basic_page">
      <div className="min_inner">
        <div className="detail_top">
          <p className="label">
            <span>{data.type}</span>
            <span>{data.name}</span>
            <span>{data.date}</span>
          </p>
          <h3 className="title">[{data.name}] {data.title}</h3>
        </div>
        <div className="detail_content" dangerouslySetInnerHTML={{__html : data.content}}></div>
        <div className="detail_bot">
          <Link className="basic_btn" to="/board/notievent">목록으로</Link>
        </div>
      </div>
    </div>
  );
}
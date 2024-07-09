import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function NotiEventDetail() {
  const { id } = useParams();

  useEffect(()=>{
    const url = `//localhost:8080/board/notievt/${id}`
    axios.get(url)
      .then(result => console.log(result.data))
  },[])

  return (
    <div className="board_detail">
      {id}
    </div>
  );
}
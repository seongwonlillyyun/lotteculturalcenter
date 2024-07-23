
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser } from './../../util/localStorage';

export default function PersonalReview() {
  const [list, setList] = useState([]);
  const userId = getUser() ? getUser().userId : "test_soo";
  const data = {
    userId,
  }

  useEffect(()=>{
    const url = "//localhost:8080/board/myReview"

    axios.post(url, data)
      .then(result => setList(result.data))
  },[])

  return (
    <div className='personalReview'>
      <div className="sub_visual">
        <h2 className="heading">나의 수강후기</h2>
      </div>
      <div className="narrow_page">
        <div className="min_inner">
          {
            list.map(v => (
              <div className="box">
                {v.order_no}
                {v.course_name}
                {
                  Boolean(v.isReviewed)
                  ? <button type="button">리뷰읽기</button>
                  : <button type="button">리뷰쓰기</button>
                }
              </div>
            ))
          }
        </div>
      </div>
      <popupWrite />
    </div>
  );
}

function popupWrite () {
  return (
    <div className="popup_wrap">
      <div className="bg"></div>
      <div className="popup"></div>
    </div>
  );
}
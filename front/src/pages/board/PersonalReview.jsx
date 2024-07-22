
import { useEffect } from 'react';
import axios from 'axios';
import { getUser } from './../../util/localStorage';

export default function PersonalReview() {
  const userId = getUser() ? getUser().userId : "test_soo";
  const data = {
    userId,
  }

  useEffect(()=>{
    const url = "//localhost:8080/board/myReview"

    axios.post(url, data)
      .then(result => console.log(result.data))
  },[])

  return (
    <div className='personalReview'>
      <div className="sub_visual">
        <h2 className="heading">나의 수강후기</h2>
      </div>
      <div className="narrow_page">
        <div className="min_inner">
          ...
        </div>
      </div>
    </div>
  );
}
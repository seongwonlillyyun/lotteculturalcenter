import { useState, useEffect } from 'react';
import axios from 'axios';
import KakaoMap from './../components/KakaoMap';

// css
import "../css/location.css"

export default function Location() {
  const [data, setData] = useState([]);
  const [kakaoData, setKakaoData] = useState([]);

  useEffect(()=>{
    const url = "//localhost:8080/location"
    axios({method : "get", url})
      .then(result => {
        setData(result.data)
        setKakaoData(result.data.map(v => (
          {loc_id : v.loc_id, lat : v.lat, lng : v.lng, c_lat : v.c_lat, c_lng : v.c_lng }
        )))
      });
  },[])

  return (
    <div className='location'>
      <KakaoMap data={kakaoData}/>
    </div>
  );
}
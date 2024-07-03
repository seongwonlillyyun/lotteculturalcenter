import { useEffect } from "react";
import { useScript } from "../hooks/useScript";

export default function KakaoMap() {
  const kakaoMap = useScript("https://dapi.kakao.com/v2/maps/sdk.js?appkey=ff9b5a4c6e2acd459216a3578f74e604&autoload=false&libraries=services");

  useEffect(()=>{
    if(kakaoMap){
      const { kakao } = window;

      kakao.maps.load(()=>{
        const container = document.querySelector(".kakao_map");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), 
          level: 3
        }
        const map = new kakao.maps.Map(container, options);
      })
    }
  },[kakaoMap])

  return (
    <div className="kakao_map">
    </div>
  );
}
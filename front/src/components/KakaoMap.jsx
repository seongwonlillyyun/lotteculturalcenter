import { useEffect } from "react";
import { useScript } from "../hooks/useScript";

export default function KakaoMap({data}) {
  const kakaoMap = useScript("https://dapi.kakao.com/v2/maps/sdk.js?appkey=ff9b5a4c6e2acd459216a3578f74e604&autoload=false&libraries=services");

  useEffect(()=>{
    if(kakaoMap && data.length > 0){
      const { kakao } = window;
      const center = {lat : data[0].c_lat, lng : data[0].c_lng}

      kakao.maps.load(()=>{
        const container = document.querySelector(".kakao_map");
        const options = {
          center: new kakao.maps.LatLng(center.lat, center.lng), 
          level: 11
        }

        const map = new kakao.maps.Map(container, options);

        const position = data.map(v => ({
          latlng : new kakao.maps.LatLng(v.lat, v.lng)
        }));
        
        for(let i = 0; i < position.length; i++){
          const marker = new kakao.maps.Marker({
            map : map,
            position : position[i].latlng,
          })

          marker.loc_id = data[i].loc_id;

          kakao.maps.event.addListener(marker, 'click', function(){
            const {Ma, La} = marker.getPosition();
            const moveLatLng = new kakao.maps.LatLng(Ma, La);
            map.setLevel(3, {
              anchor: moveLatLng,
              animate: true
            });
          });
        }
      })
    }
  },[kakaoMap])

  return (
    <div className="kakao_map">
    </div>
  );
}
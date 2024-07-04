import { useEffect } from "react";
import { useScript } from "../hooks/useScript";

export default function KakaoMap({mapData, setActiveLoc}) {
  const kakaoMap = useScript("https://dapi.kakao.com/v2/maps/sdk.js?appkey=ff9b5a4c6e2acd459216a3578f74e604&autoload=false&libraries=services");

  useEffect(()=>{
    const container = document.createElement("div")
    container.className = "kakao_map"
    document.querySelector('.kakao_map_wrap').append(container);

    if(kakaoMap && mapData.list){
      const { kakao } = window;
      const center = {lat : mapData.center.lat, lng : mapData.center.lng}

      kakao.maps.load(()=>{
        const options = {
          center: new kakao.maps.LatLng(center.lat, center.lng), 
          level: mapData.level
        }

        const map = new kakao.maps.Map(container, options);

        const position = mapData.list.map(v => ({
          latlng : new kakao.maps.LatLng(v.lat, v.lng)
        }));
        
        for(let i = 0; i < position.length; i++){
          const marker = new kakao.maps.Marker({
            map : map,
            position : position[i].latlng,
          })

          marker.loc_id = mapData.list[i].loc_id;

          kakao.maps.event.addListener(marker, 'click', function(){
            setActiveLoc(marker.loc_id);
            const {Ma, La} = marker.getPosition();
            const moveLatLng = new kakao.maps.LatLng(Ma, La);
            map.setLevel(3, {
              anchor: moveLatLng,
              animate: true
            });
            map.panTo(moveLatLng);
          });
        }
      })
    }

    return () => {
      container.remove();
    }
  },[kakaoMap, mapData])

  return (
    <div className="kakao_map_wrap">
    </div>
  );
}
import { useScript } from './../hooks/useScript';
import KakaoMap from './../components/KakaoMap';

// css
import "../css/location.css"

export default function Location() {

  return (
    <div className='location'>
      <KakaoMap />
    </div>
  );
}
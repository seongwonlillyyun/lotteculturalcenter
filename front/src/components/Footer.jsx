import { Link } from 'react-router-dom';

// css
import "../css/footer.css";

export default function Footer() {
  return (
    <div className="footer_wrap">
      <div id="footer">
        <div className="full_inner">
          <div className="footer_top">
            <div className="help">
              <h3>무엇을 도와드릴까요?</h3>
              <ul>
                <li><Link to="/board/qna">자주하는 문의</Link></li>
                <li><Link to="/board/notievent">공지사항/이벤트</Link></li>
                <li><Link to="/location">지점안내</Link></li>
              </ul>
            </div>
            <ul className="customer">
              <li>
                <h4>1577.0001</h4>
                <p>백화점 대표전화<br/>(평일 09~18시. 토/일요일 및 공휴일 휴무)</p>
              </li>
              <li>
                <h4>1899.8900</h4>
                <p>L.POINT 콜센터<br/>(평일 09~18시. 토/일요일 및 공휴일 휴무)</p>
              </li>
            </ul>
          </div>
          <div className="footer_bot">
            <div className="txt_box">
              <ul className='company_info'>
                <li>롯데쇼핑(주) 주소 : 서울특별시 중구 소공동 1번지 (서울시 중구 남대문로 81)</li>
                <li>대표이사 : 정준호</li>
              </ul>
              <span>COPYRIGHT © LOTTESHOPPING.CO.,LTD. ALL RIGHTS RESERVED</span>
            </div>
            <h2 className="logo">
              <Link to="/"><img src="/img/logo-lotte.png" alt="" /></Link>
            </h2>
          </div>
        </div>
      </div>
      <TopButton />
    </div>
  );
}

function TopButton (){

  const clickHandler = () => {
    window.scrollTo({top: 0, left : 0, behavior : 'smooth'});
  }

  return (
    <button type="button" className='top_btn' onClick={clickHandler}>
      <img src="/img/icon-top-arrow.svg" alt="" />
    </button>
  )
}
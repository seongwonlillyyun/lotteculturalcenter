import { useNavigate, Link } from "react-router-dom";
import "../css/loginError.css"

export default function LoginError() {
  const navigate = useNavigate();

  return (
    <div className="login_error" style={{"--bg" : `url("/img/bg-loginError.jpg")`}}>
      <div className="min_inner">
        <div className="center">
          <h2>비정상적인 접근입니다.</h2>
          <p>
            현재 페이지는 회원만 이용할 수 있습니다. <br />
            로그인 후 이용해 주시기 바랍니다.
          </p>
          <div className="btns">
            <Link to="/" className="white">메인으로</Link>
            <Link to="/login">로그인</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
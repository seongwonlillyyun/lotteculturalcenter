import '../css/changememberinfo.css'

export default function ChangeMemberInfo(){
    
//todo 버튼 클릭시 회원정보 변경되는 이벤트 만들기

    return (
        <div className=''>
        <div className="sub_visual">
            <h2 className="heading">회원정보변경</h2>
            </div>

<div className="section basic_page min_inner">
    <p className='member_info_title'>회원정보</p>
    <div className='member_info'>
    <div className='member_info_left'>
        <ul>
        <li><span className='member_info_subject'>이름</span>
        <span className='member_info_value'>테스트씨</span></li>
        <li><p className='member_info_subject'>생년월일</p>
        <span className='member_info_value'>2000.01.01</span></li>
        <li><p className='member_info_subject'>휴대전화</p>
        <span className='member_info_value'>010-1234-5678</span></li>
        </ul>
    </div>
    <div className='member_info_right'>
        <ul>
        <li><p className='member_info_subject'>아이디</p>
        <span className='member_info_value'>test1</span></li>
        <li><p className='member_info_subject'>이메일</p>
        <span className='member_info_value'>abc@naver.com</span></li>
        <li><p className='member_info_subject'>주소</p>
        <span className='member_info_value'>
            서울시 강남구 역삼동 xx빌딩 A동 1507호</span></li>
    </ul>
</div>
        </div>
        <div className='change_member_btn_div'>
            <button type='button' className='change_memeber_btn'>회원정보 변경</button>
        </div>

                </div>

        </div>
    )
}
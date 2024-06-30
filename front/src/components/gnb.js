export const gnb = {
  applicate : {
    name : "수강신청",
    children : [
      {name : "지점으로 찾기"},
      {name : "강좌로 찾기"}
    ],
    imgPath : "/img/img-gnb-application-class-01.jpg"
  },
  information : {
    path : "/",
    name : "이용안내",
    children : [
      {path : "/", name : "지점안내"},
      {path : "/", name : "자주하는 문의"}
    ],
    imgPath : "/img/img-gnb-use-information-01.jpg"
  },
  community : {
    path : "/notice",
    name : "커뮤니티",
    children : [
      {path : "/notice", name : "공지사항/이벤트"},
      {path : "/", name : "수강후기"}
    ],
    imgPath : "/img/img-gnb-community-01.jpg"
  }
}
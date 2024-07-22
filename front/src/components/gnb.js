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
    path : "/location",
    name : "이용안내",
    children : [
      {path : "/location", name : "지점안내"},
      {path : "/board/qna", name : "자주하는 문의"}
    ],
    imgPath : "/img/img-gnb-use-information-01.jpg"
  },
  community : {
    path : "/board/notievent",
    name : "커뮤니티",
    children : [
      {path : "/board/notievent", name : "공지사항/이벤트"},
      {path : "/board/review", name : "수강후기"}
    ],
    imgPath : "/img/img-gnb-community-01.jpg"
  }
}
import { useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getQnAList } from '../../modules/reduxBoardAxios';

// css
import "../../css/board/boardCommon.css";

// svg 
import { ReactComponent as IconSearch } from "../../svg/icon-search.svg";

export default function QnA() {
  const dispatch = useDispatch();
  const qnaList = useSelector(state => state.board.qnaList);

  console.log(qnaList);

  useEffect(()=>{
    dispatch(getQnAList())
  },[])

  return (
    <div className="board_page">
      <div className="sub_visual">
        <h2 className="heading">자주하는 문의</h2>
        <div className="form_search">
          <input type="text" placeholder="검색어를 입력하세요"/>
          <button className="search_btn"><IconSearch /></button>
        </div>
      </div>
      <div className="board-qna">
        <div className="min_inner"></div>
      </div>
    </div>
  );
}
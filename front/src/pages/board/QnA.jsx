import { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getQnAList, getQnaTabs, updateQnaFilter } from '../../modules/reduxBoardAxios';

// component;
import { SearchVisual } from './../../components/BoardCommon';

// svg
import {ReactComponent as IconNoSearch} from "../../svg/icon-no-srch.svg";

// css
import "../../css/board/boardCommon.css";
import "../../css/board/qna.css";

export default function QnA() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.board.qnaFilter)
  const [activIdx, setActiveIdx] = useState();

  useEffect(()=>{
    dispatch(getQnAList(filter))
    dispatch(getQnaTabs())
    setActiveIdx();
  },[filter])

  const searchHandler = (keyword) => {
    dispatch(updateQnaFilter({type: "", keyword, count : 10}))
  }

  return (
    <div className="board_page">
      <SearchVisual title="자주하는 문의" handler={searchHandler}/>
      <div className="board-qna">
        <div className="min_inner narrow_page">
          <QnATabs/>
          <QnAList activIdx={activIdx} setActiveIdx={setActiveIdx}/>
        </div>
      </div>
    </div>
  );
}

function QnATabs() {
  const dispatch = useDispatch();
  const qnaTabs = useSelector(state => state.board.qnaTabs);
  const filter = useSelector(state => state.board.qnaFilter);

  const clickHandler = (e) => {
    const type = e.target.dataset.type;
    if(type){
      dispatch(updateQnaFilter({type, count : 10}))
    } else {
      if(filter.keyword){
        dispatch(updateQnaFilter({type : "", keyword : "", count : 10}))
      } else {
        dispatch(updateQnaFilter({type : "", count : 10}))
      }
    }
  }

  return (
    <div className="board_tab_wrap type1">
      <div className="tap_main_btns">
        <button className={filter.type === "" ? "btn on" : "btn"} type="button" onClick={clickHandler}>전체</button>
        {
          qnaTabs.map((tab, i) => (
            <button
              data-type={tab.type}
              className={filter.type === tab.type ? "btn on" : "btn"} 
              type="button" 
              key={i}
              onClick={clickHandler}
            >{tab.type}</button>
          ))
        }
      </div>
    </div>
  )
}

function QnAList({activIdx, setActiveIdx}){
  const dispatch = useDispatch();
  const qnaList = useSelector(state => state.board.qnaList);
  const qnaCount = useSelector(state => state.board.qnaCount);
  const filter = useSelector(state => state.board.qnaFilter);

  const clickHandler = (i) => {
    setActiveIdx(i)
  }
  
  const moreHandler = () => {
    dispatch(updateQnaFilter({count : filter.count + 10}))
  }

  return qnaList.length > 0 ? (
    <>
      <ul className='qna_list'>
        {
          qnaList.map((qna, i) => (
            <li key={i} className={activIdx === i ? "on" : ""} onClick={()=>clickHandler(i)}>
              <div className="title">{qna.title}</div>
              <div className="content">{qna.content}</div>
            </li>
          ))
        }
      </ul>
      {
        qnaCount > qnaList.length &&
        <div className="btns">
          <button className='more_btn' onClick={moreHandler}>더보기</button>
        </div>
      }
    </>
  ) : <NoData />; 
}

function NoData() {
  const {keyword} = useSelector(state => state.board.qnaFilter);

  return(
    <div className="qna_no_data">
      <i><IconNoSearch /></i>
      <h3><b>"{keyword}"</b>에 대한<br/>검색결과가 없어요.</h3>
    </div>
  );
}
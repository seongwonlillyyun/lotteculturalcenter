import { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getQnAList, getQnaTabs } from '../../modules/reduxBoardAxios';

// component;
import { SearchVisual } from './../../components/BoardCommon';

// css
import "../../css/board/boardCommon.css";

export default function QnA() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({type : "", keyword : ""});

  useEffect(()=>{
    dispatch(getQnAList(filter))
    dispatch(getQnaTabs())
  },[filter])

  const searchHandler = (keyword) => {
    setFilter(prev => ({...prev, type : "", keyword}))
  }

  return (
    <div className="board_page">
      <SearchVisual title="자주하는 문의" handler={searchHandler}/>
      <div className="board-qna">
        <div className="min_inner narrow_page">
          <QnATabs filter={filter} setFilter={setFilter}/>
          <QnAList />
        </div>
      </div>
    </div>
  );
}

function QnATabs({filter, setFilter}) {
  const qnaTabs = useSelector(state => state.board.qnaTabs);

  const clickHandler = (e) => {
    const type = e.target.dataset.type;
    if(type){
      setFilter(prev => ({...prev, type}))
    } else {
      if(filter.keyword){
        setFilter(prev => ({...prev, type : "", keyword : ""}))
      } else {
        setFilter(prev => ({...prev, type : ""}))
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

function QnAList(){
  const qnaList = useSelector(state => state.board.qnaList);
  return (
    <ul>
      {
        qnaList.map((qna, i) => (
          <li key={i}>
            <div className="title">{qna.title}</div>
            <div className="content">{qna.content}</div>
          </li>
        ))
      }
    </ul>
  ); 
}
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getQnAList, getQnaTabs, updateQnaFilter, resetInitFilter } from '../../modules/reduxQnaAxios';

// component;
import { SearchVisual } from './../../components/BoardCommon';

// svg
import {ReactComponent as IconNoSearch} from "../../svg/icon-no-srch.svg";

// css
import "../../css/board/boardCommon.css";
import "../../css/board/qna.css";
import { getUser } from './../../util/localStorage';

export default function QnA() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.qna.qnaFilter)
  const [activIdx, setActiveIdx] = useState();

  useEffect(()=>{
    dispatch(getQnAList(filter))
    dispatch(getQnaTabs())
    setActiveIdx();
  },[filter])

  useEffect(()=>{
    return () => {
      dispatch(resetInitFilter());
    }
  },[])

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
          <PersonalQnA />
        </div>
      </div>
    </div>
  );
}

function QnATabs() {
  const dispatch = useDispatch();
  const qnaTabs = useSelector(state => state.qna.qnaTabs);
  const filter = useSelector(state => state.qna.qnaFilter);

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
  const qnaList = useSelector(state => state.qna.qnaList);
  const qnaCount = useSelector(state => state.qna.qnaCount);
  const filter = useSelector(state => state.qna.qnaFilter);

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
  const {keyword} = useSelector(state => state.qna.qnaFilter);

  return(
    <div className="board_nodata">
      <IconNoSearch />
      <h3><b>"{keyword}"</b>에 대한<br/>검색결과가 없어요.</h3>
    </div>
  );
}

function PersonalQnA() {
  const navigate = useNavigate();
  const userId = getUser() ? getUser().user_id : "";

  const linkHandler = () => {
    if(userId){
      navigate("/board/personal")
    } else {
      window.confirm("로그인 후 이용 가능합니다.") &&
      navigate("/login");
    }
  }

  return (
    <div className="link_personal_qna">
      <ul>
        <li>자주하는 문의에서 찾을 수 없는 답변은 <b>1:1 문의</b>를 통해 궁금한 점을 보내 주시기 바랍니다.</li>
        <li>답변 내용은 마이페이지의 <b>1:1 문의</b>에서 확인하실 수 있습니다.</li>
      </ul>
      <button type="button" className='personal_btn' onClick={linkHandler}>1:1문의</button>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchVisual } from '../../components/BoardCommon';
import { useNavigate } from 'react-router-dom';
import { updateFilter, getList, resetData } from '../../modules/reduxNotiEvt';

export default function NotiEvent() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.notievt.filter);

  useEffect(()=>{
    dispatch(getList(filter))
  },[filter])
  
  useEffect(()=> {
    return () => {
      dispatch(resetData());
    }
  },[])

  const searchHandler = (keyword) => {
    dispatch(updateFilter({keyword}))
  }

  return (
    <div className="board_page">
      <SearchVisual title="공지사항/이벤트" handler={searchHandler}/>
      <div className="board_notievent narrow_page">
        <div className="min_inner">
          <NotiEventTab />
          <BoardUtils />
          <BoardList />
        </div>
      </div>
    </div>
  );
}

function NotiEventTab() {
  const dispatch = useDispatch();
  const {type} = useSelector(state => state.notievt.filter);

  const clickHandler = (e) => {
    const name = e.target.textContent;
    dispatch(updateFilter({type : name, keyword : ""}));
  }

  return (
    <div className="board_tab_wrap type1">
      <div className="tap_main_btns">
        <button type="button" onClick={clickHandler} className={type === "공지사항" ? "btn on" : "btn"}>공지사항</button>
        <button type="button" onClick={clickHandler} className={type === "이벤트" ? "btn on" : "btn"}>이벤트</button>
      </div>
    </div>
  );
}

function BoardUtils() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const count = useSelector(state => state.notievt.count);
  const {location} = useSelector(state => state.notievt.filter);
  const locationList = useSelector(state => state.menu.locationList);

  const listHandler = (e) => {
    let name = e.target.textContent;
    dispatch(updateFilter({location : name}));
    setActive(false);
  }

  const activeHandler = () => {
    setActive(prev => !prev);
  }

  return (
    <div className="board_utils">
      <p className="board_count">전체 <b>{count}개</b></p>
      <div className={active ? "custom_select_wrap on" : "custom_select_wrap"}>
        <p onClick={activeHandler}><span>{location}</span></p>
        <div className="custom_select">
          <ul>
            <li className={location === "전체지점" ? "on" : ""} onClick={listHandler}>전체지점</li>
            {
              locationList.map(v => (
                <li className={location === v.name ? "on" : ""} key={v.loc_id} onClick={listHandler}>{v.name}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

function BoardList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = useSelector(state => state.notievt.list);
  const count = useSelector(state => state.notievt.count);
  const filter = useSelector(state => state.notievt.filter);

  const clickHandler = (bid) => {
    navigate(`/board/notievent/${bid}`);
  }

  const moreHandler = () => {
    dispatch(updateFilter({count : filter.count + 10}))
  }

  return(
    <>
      <div className="board_list">
        <ul>
          {
            list.map(v => (
              <li key={v.bid} onClick={()=>{clickHandler(v.bid)}}>
                {
                  v.isMust ? <span className='tag'>필독</span> : <></>
                }
                <p className='title'>[{v.name}] {v.title}</p>
                <p className='etc'>{v.reg_date}</p>
              </li>
            ))
          }
        </ul>
      </div>
      {
        count > list.length &&
        <div className="btns">
          <button type="button" className='more_btn' onClick={moreHandler}>더보기</button>
        </div>
      }
    </>
  );
}
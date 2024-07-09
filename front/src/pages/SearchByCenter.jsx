import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import '../css/yun.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faFilter, faX, faRotateRight, faClock, faCartShopping, faArrowRotateRight,faXmark} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function SearchByCenter(){
    const {id} = useParams();
    const [showCourse, setShowCourse] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const [detail,setDetail] = useState({day:[1,2,3,4,5,6,7],time:''});
    const [sort, setSort] = useState(8);
    const [center,setCenter] = useState({})
    const [cindex, setCindex] = useState(0)
    const [view, setView] = useState(false)
    const [smallCategory, setSmallCategory] = useState(0)
    const [selected, setSelected] = useState({day:'',time:''})

    const searchDetail = (value,selected)=>{
        alert(value)
        setDetail(value)
        setSelected(selected)
    }


    useEffect(()=>{
        let startIndex = 0;
        let endIndex = 0;
        startIndex = (currentPage-1) * pageSize + 1;
        endIndex = currentPage * pageSize;
            axios({
                method:'get',
                url:`http://127.0.0.1:8080/center/${id}`,
                data: id
            })
            .then(response=>setCenter(...response.data))
            .catch(error=>console.log(error))
            setCindex(0)
            setSmallCategory(0)
            setDetail({day:[1,2,3,4,5,6,7],time:''})
    },[id])

    useEffect(()=>{
        axios({
            method:'post',
            url:`http://127.0.0.1:8080/center/${id}/course`,
            data : {'id': id, 'mid_id':cindex, 'sub_id':smallCategory,
                    'day':detail.day, 'time':detail.time, 'sort':sort}})
        .then(response=>setShowCourse([response.data]))
        .catch(error=>console.log(error))
    },[cindex,smallCategory,detail,sort])


    
    const category = [
        {
            name:"전체",
            img:"/img/category_img_all.jpg",
            list:[{id:0}],
        },
        {
            name:"공예",
            img:"/img/category_img_crafts.jpg",
            list:[
                    {name:"전체", id:0}, {name:'플라워',id:1}, {name:'도예',id:2},{name:'가죽',id:3},
                    {name:'캔들/비누',id:4}],
        },
        {
            name:"노래",
            img:"/img/category_img_sing.jpg",
            list:[  {name:'전체',id:0},{name:'노래교실',id:5},{name:'보컬트레이닝',id:6},
                    {name:'성악',id:7},{name:'기타',id:8}],
        },
        {
            name:"드로잉",
            img:"/img/category_img_drawing.jpg",
            list:[  {name:'전체',id:0},{name:'유화',id:9},{name:'마카',id:10},{name:'색연필',id:11},
                    {name:'수채화',id:12}],
        },
        {
            name:"쿠킹",
            img:"/img/category_img_cooking.jpg",
            list:[{name:'전체', id:0},{name:'한식',id:13},{name:'일식/중식',id:14},{name:'양식',id:15},{name:'다이어트',id:16}],
        },
    ]
    const [showModal, setShowModal] = useState(false)
    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () =>{
        setShowModal(false)
    }
    const [sortview, setSortView] = useState(false);
    const [sortStd, setSortStd] = useState('강의시작일순')
    const handleSort = (value,sort)=>{
        setSortView(false)
        setSortStd(value)
        setSort(sort)
    }
    const handledetailReset = ()=>{
        setSelected({day:'',time:''})
        setDetail({day:[1,2,3,4,5,6,7],time:''})
    }

    const handleDetailDelete = (value) =>{
        if(value === 'day'){
            setSelected({...selected, day:''})
            setDetail({...detail, day:[1,2,3,4,5,6,7]})
        } else if(value === 'time') {
            setSelected({...selected, time:''})
            setDetail({...detail, time:''})
        }
    }
    console.log(selected)
    return(
        <>
            <div className="bycenter_title_part">
                <p className="bycenter_title" onClick={()=>{setView(!view)}}>{center.center_name}{""}
                    {view ? '^' : '⌄'}
                    {view && <DropDown/>}
                </p>
            </div>
            <div className="bycenter_list min_inner">
                <ul className="middle_category_list">
                    {category.map((item,i)=>(
                        <li value={i} key={i}
                            onClick={()=>{setCindex(i) ; setSmallCategory(0); setSortStd('강의시작일순');}}
                            className="middle_category_item">
                            <CategoryMiddleMenu item={item}
                                            cindex={cindex}
                                            index={i}/>
                        </li>
                    ))}
                </ul>

                <ul className="small_category_items" 
                style={{'border-bottom': cindex === 0 ? 
                            "none":'1px solid #E3E1DE'}}>
                    {category[cindex].list.map((item,i)=>(
                            <li className="small_category_item">
                                <p onClick={()=>setSmallCategory(item.id)}
                                    value={item}
                                    className={smallCategory === item.id?"small_category_name_active":"small_category_name"}
                                    >{item.name}</p>
                            </li>
                    ))}
                </ul>
                <div className="search_part">
                    <p><span>{center.count}개</span>의 강좌</p>
                    <div className="search_part_btns">
                        <button className="search_part_detail"
                            onClick={openModal}
                        ><FontAwesomeIcon icon={faMagnifyingGlass} /><span
                        style={{marginLeft:'.4rem'}}>상세검색</span></button>
                            {showModal === true ?<ModalPage
                                            openModal={openModal}
                                            closeModal={closeModal}
                                            click={searchDetail}
                                            searchstd={selected}/>:null}
                        <button className="search_part_sort"
                            onClick={()=>{setSortView(!sortview)}}
                        ><FontAwesomeIcon icon={faFilter}/><span
                        style={{marginLeft:'.4rem'}}>{sortStd}</span>
                        </button>
                        <div style={{"position":"relative"}}>
                            {sortview&&<DropDownSort click={handleSort} sortStd={sortStd}/>}
                        </div>
                    </div>
                </div>
                {selected.day !== '' || selected.time !== '' ? 
                <ul className="handle_search_standard">
                    <li><button className="handle_search_reset" onClick={handledetailReset}><FontAwesomeIcon icon={faArrowRotateRight} /></button></li>
                    {selected.day!=='' ? <li><p className="handle_search_day">{selected.day}<button className="search_reset_btn" type="button" onClick={()=>handleDetailDelete('day')}><FontAwesomeIcon icon={faXmark} /></button></p></li>:null}
                    {selected.time !== ''? <li><p className="handle_search_time">{selected.time}<button className="search_reset_btn"onClick={()=>handleDetailDelete('time')}><FontAwesomeIcon icon={faXmark} /></button></p></li> :null}
                </ul>:null}

                <div className="course_list_content">
                    {showCourse.map((items,index)=>(
                        <ul className="course_list">
                            {items.map((item, index)=>(
                                <li key={index}>
                                    <CourseItem item={item}/>
                                </li>
                            ))}
                        </ul>
                    ))}
                    <button className="morebtn" type="button" onClick={()=>{setCurrentPage(currentPage+1)}}>강좌더보기+</button>
                </div>
            </div>
        </>
    )
};

function DropDown(){
    return(
        <ul className="dropdown_list">
            <li className="dropdown_list_st st_seoul"><p>서울점</p></li>
            <li><Link to ='/center/1' >잠실점</Link></li>
            <li><Link to ='/center/2'>본점</Link></li>
            <li><Link to ='/center/3'>강남점</Link></li>
            <li><Link to ='/center/4'>건대스타시티점</Link></li>
            <li className="dropdown_list_st"><p>수도권점</p></li>
            <li><Link to ='/center/5'>인천점</Link></li>
            <li><Link to ='/center/6'>동탄점</Link></li>
            <li><Link to ='/center/7'>구리점</Link></li>
            <li><Link to ='/center/8'>분당점</Link></li>
            <li className="dropdown_list_st"><p>지방점</p></li>
            <li><Link to ='/center/9'>부산본점</Link></li>
            <li><Link to ='/center/10'>광복점</Link></li>
            <li><Link to ='/center/11'>광주점</Link></li>
            <li><Link to ='/center/12'>대구점</Link></li>
        </ul>
    )
};

function DropDownSort({click, sortStd}){
    const changeStd = (e,sort) =>{
        click(e,sort)
    }
    return(
        <ul className="sortdropdown_content">
            <li>
                <p className="sortdropdown_text" 
                    onClick={()=>changeStd("마감임박순",11)}
                    style={{'color':sortStd === "마감임박순"?"#000":"rgba(0, 0, 0, .6)"}}
                    >마감임박순</p>
            </li>
            <li><p onClick={()=>changeStd("접수인원순")}
                    style={{'color':sortStd === "접수인원순"?"#000":"rgba(0, 0, 0, .6)"}}>접수인원순</p></li>
            <li><p onClick={()=>changeStd("강의시작일순",8)} 
                    style={{'color':sortStd === "강의시작일순"?"#000":"rgba(0, 0, 0, .6)"}}>강의시작일순</p></li>
            <li><p onClick={()=>changeStd("낮은가격순",9)}  
                    style={{'color':sortStd === "낮은가격순"?"#000":"rgba(0, 0, 0, .6)"}}>낮은가격순</p></li>
            <li><p
                style={{'color':sortStd === "높은가격순"?"#000":"rgba(0, 0, 0, .6)"}}
                onClick={()=>changeStd("높은가격순")}>높은가격순</p></li>
        </ul>
    )
};

function CategoryMiddleMenu({item, cindex, index}){
    return(
        <>
            <img className={cindex==index?"middle_category_img_active":"middle_category_img"} src={item.img} alt="middle_sub_img" />
            <p className={cindex === index?"middle_category_txt_active":"middle_category_txt"}>{item.name}</p>
        </>
    )
};

function ModalPage({openModal,closeModal, click, searchstd}){
    const [info, setInfo] = useState({day:'', time:""})
    const [isActive, setIsActive] = useState({day:false, time:false})
    const [selected, setSelected] = useState({day:'',time:''});


    const handleActive = (txt,e)=>{
        const {name,value} = e.target
        if(selected.day === '' || selected.time === ''){
            setIsActive({...isActive,[name]:true})
            setSelected({...selected,[name]:txt})
            if(name === 'day'){
                setInfo({...info, [name]:[...value]})
            } else if (name === 'time'){
                setInfo({...info, [name]:value})}
                
        } else if(selected.day !== '' || selected.time !==''){
            setIsActive({...isActive,[name]:false})
            setSelected({...selected,[name]:''})
            setInfo({...info,[name]:''})
        } 
    }
    console.log('active=>', isActive)
    const handleDetail = ()=>{
        click(info,selected)
        closeModal()
    }
    const handleReset = ()=>{
        setInfo({day:'', time:""})
        setIsActive({day:false, time:false})
        setSelected({day:'',time:""})
    }

    console.log('selected',selected, info)
    return(
        <div className='modal_out'onClick={closeModal}>
            <div className='modal_container' onClick={(e)=>e.stopPropagation()}>
                <button className="close" onClick={closeModal}><FontAwesomeIcon icon={faX}/></button>
                <div className='modal_content_search'>
                    <p className="modal_search_title">상세검색</p>
                    <input type="text"
                        placeholder="강좌명 or 강사명으로 검색"
                        className="modal_search_text"/>
                    <button className="modal_searc_text_btn">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <ul className="modal_search_std modal_search_day">
                        <li className="modal_search_std_title">
                            <p className="std_title">요일</p>
                        </li>
                        <li>
                            <button className={(isActive&&selected.day==='평일')||searchstd.day === '평일' ?"modal_btn_active modal_day":"modal_btn modal_day" }
                                type="button" name="day" value={[2,3,4,5,6]} onClick={(e)=>handleActive('평일',e)}>평일</button>
                            <button className={(isActive&&selected.day==='주말')||searchstd.day === '주말' ?"modal_btn_active modal_day":"modal_btn modal_weekend" } 
                                    type="button" name="day" value={[1,7]} onClick={(e)=>handleActive('주말',e)}>주말</button>
                        </li>
                    </ul>
                    <ul className="modal_search_std modal_search_time">
                        <li className="modal_search_std_title">
                            <p className="std_title"> 시간</p>
                        </li>
                        <li>
                            <button className={(isActive&&selected.time==='오전')||searchstd.time === '오전' ? "modal_btn_active modal_before":"modal_btn modal_before"} 
                                    type="button" name="time" value={'am'} onClick={(e)=>handleActive('오전',e)}>오전</button>
                            <button className={(isActive&&selected.time==='오후')|| searchstd.time ==='오후'?'modal_btn_active modal_after':"modal_btn modal_after"} 
                                    type="button" name="time" value={'pm'} onClick={(e)=>handleActive('오후',e)}>오후</button>
                        </li>
                    </ul>
                        <div className="modal_btn_last_list">
                            <button className="modal_btn_last modal_btn_reset" onClick={handleReset}>
                                <FontAwesomeIcon icon={faRotateRight} />
                                <span className="reset_title">초기화</span></button>
                            <button className="modal_btn_last modal_btn_result" type="button" onClick={handleDetail}>강좌보기</button>
                        </div>
                </div>
            </div>
        </div>
    )
};

function CourseItem({item}){
    return(
    <div className="course_item">
        <img  src="https://culture.lotteshopping.com/files/CUL_ONL/2024/6/202406140430462580.jpg" alt="course_img"
                            className="course_item_img"/>
        <div className="course_item_status">
            <p className="course_item_status_apply">{item.statues}</p>
            <p className="course_item_status_center">{item.name}</p>
        </div>
        <p className="course_item_title">{item.course_name}</p>
        <p className="course_item_teacher">{item.teacher_name}</p>
        <div className="course_item_info">
            <FontAwesomeIcon icon={faClock} />
            <p>{item.course_week} {item.start_time}~{item.end_time}, 총 {item.num_of_course}회</p>
        </div>
        <div className="course_item_price">
            <p>{item.price}원</p>
            <button className="course_item_cart">
                <FontAwesomeIcon icon={faCartShopping} />
            </button>
        </div>
    </div>
    )
}
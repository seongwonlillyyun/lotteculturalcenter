import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import '../css/yun.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faFilter, faX, faRotateRight, faClock, faCartShopping} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function SearchByCenter(){
    const [showCourse, setShowCourse] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const [center,setCenter] = useState({})
    const [id, setId] = useState({id: 1, cname : '잠실점'})
    const cid = id.id
    
    console.log('cid', cid)
    useEffect( ()=>{
        let startIndex = 0;
        let endIndex = 0;
        startIndex = (currentPage-1) * pageSize + 1;
        endIndex = currentPage * pageSize;
        const url = `http://127.0.0.1:8080/center/${cid}/course`
            axios({
                method:'post',
                url:url,
                data : {'id':cid, 'startIndex':startIndex, 'endIndex':endIndex}
            })
            .then(response=>setShowCourse([...showCourse, response.data]))
            .catch(error=>console.log(error))
    },[cid, currentPage])
    const handleCenter = (value)=>{
        setId(value)
        setCurrentPage(1)
    }
    console.log('currentPage =>' , currentPage)
/*     useEffect(()=>{
        let startIndex = 0;
        let endIndex = 0;
        startIndex = (currentPage-1) * pageSize + 1;
        endIndex = currentPage * pageSize;
        const url = `http://127.0.0.1:8080/center/${id}/course`
        axios({
            method:'post',
            url:url,
            data : {'id':id, 'startIndex':startIndex, 'endIndex':endIndex}
        })
        .then(response=>setShowCourse([...showCourse, response.data]))
        .catch(error=>console.log(error))
    },[id, currentPage]) */
    const [view, setView] = useState(false)
    const [middleCategory, setMiddleCategory] = useState("전체")
    const [smallCategory, setSmallCategory] = useState('전체')
    const [cindex, setCindex] = useState(0)
    const category = [
        {
            name:"전체",
            img:"/img/category_img_all.jpg",
            list:[]
        },
        {
            name:"공예",
            img:"/img/category_img_crafts.jpg",
            list:["전체", '플라워', '도예','가죽','캔들/비누']
        },
        {
            name:"노래",
            img:"/img/category_img_sing.jpg",
            list:['전체','노래교실','보컬트레이닝','성악','기타']
        },
        {
            name:"드로잉",
            img:"/img/category_img_drawing.jpg",
            list:['전체','유화','마카','색연필','수채화']
        },
        {
            name:"쿠킹",
            img:"/img/category_img_cooking.jpg",
            list:['전체','한식','일식/중식','양식','다이어트']
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
    const handleSort = (value)=>{
        setSortView(false)
        setSortStd(value)
    }
    const centerinfo = center[0]
    
    return(
        <>
            <div className="bycenter_title_part">
                <p className="bycenter_title" onClick={()=>{setView(!view)}}>{id.cname}{""}
                    {view ? '^' : '⌄'}
                    {view && <DropDown click={handleCenter}/>}
                </p>
            </div>
            <div className="bycenter_list min_inner">
                <ul className="middle_category_list">
                    {category.map((item,i)=>(
                        <li value={i} key={i}
                            onClick={()=>{setCindex(i) ; setSmallCategory('전체'); setSortStd('강의시작일순')}}
                            className="middle_category_item">
                            <CategoryMiddleMenu item={item}
                                            cindex={cindex}
                                            index={i}/>
                        </li>
                    ))}
                </ul>
                <ul className="small_category_items" 
                style={{'border-bottom': middleCategory === '전체' ? 
                            "none":'1px solid #E3E1DE'}}>
                    {category[cindex].list.map((item)=>(
                            <li className="small_category_item" >
                                <p onClick={()=>setSmallCategory(item)}
                                    value={item}
                                    className={smallCategory === item?"small_category_name_active":"small_category_name"}
                                    >{item}</p>
                            </li>
                    ))}
                </ul>
                <div className="search_part">
                    <p><span>개</span>의 강좌</p>
                    <div className="search_part_btns">
                        <button className="search_part_detail"
                            onClick={openModal}
                        ><FontAwesomeIcon icon={faMagnifyingGlass} /><span
                        style={{marginLeft:'.4rem'}}>상세검색</span></button>
                            {showModal === true ?<ModalPage
                                            openModal={openModal}
                                            closeModal={closeModal}/>:null}
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

function DropDown({click}){
    const handleCenter = (value)=>{
        click(value)
    }
    return(
        <ul className="dropdown_list">
            <li className="dropdown_list_st st_seoul"><p>서울점</p></li>
            <li onClick={()=>handleCenter({id:1, cname:'잠실점'})}>잠실점</li>
            <li onClick={()=>handleCenter({id:2, cname:'본점'})}>본점</li>
            <li onClick={()=>handleCenter({id:3, cname:'강남점'})}>강남점</li>
            <li onClick={()=>handleCenter({id:4, cname:'건대스타시티점'})}>건대스타시티점</li>
            <li className="dropdown_list_st"><p>수도권점</p></li>
            <li onClick={()=>handleCenter({id:5, cname:'인천점'})}>인천점</li>
            <li onClick={()=>handleCenter({id:6, cname:'동탄점'})}>동탄점</li>
            <li onClick={()=>handleCenter({id:7, cname:'구리점'})}>구리점</li>
            <li onClick={()=>handleCenter({id:8, cname:'분당점'})}>분당점</li>
            <li className="dropdown_list_st"><p>지방점</p></li>
            <li onClick={()=>handleCenter({id:9, cname:'부산점'})}>부산본점</li>
            <li onClick={()=>handleCenter({id:10, cname:'광복점'})}>광복점</li>
            <li onClick={()=>handleCenter({id:11, cname:'광주점'})}>광주점</li>
            <li onClick={()=>handleCenter({id:12, cname:'대구점'})}>대구점</li>
        </ul>
    )
};

function DropDownSort({click, sortStd}){
    const changeStd = (e) =>{
        click(e)
    }
    return(
        <ul className="sortdropdown_content">
            <li>
                <p className="sortdropdown_text" 
                    onClick={()=>changeStd("마감임박순")}
                    style={{'color':sortStd === "마감임박순"?"#000":"rgba(0, 0, 0, .6)"}}
                    >마감임박순</p>
            </li>
            <li><p onClick={()=>changeStd("접수인원순")}
                    style={{'color':sortStd === "접수인원순"?"#000":"rgba(0, 0, 0, .6)"}}>접수인원순</p></li>
            <li><p onClick={()=>changeStd("강의시작일순")} 
                    style={{'color':sortStd === "강의시작일순"?"#000":"rgba(0, 0, 0, .6)"}}>강의시작일순</p></li>
            <li><p onClick={()=>changeStd("가격낮은순")}  
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

function ModalPage({openModal,closeModal}){
    return(
        <div className='modal_out'onClick={closeModal}>
            <div className='modal_container' onClick={(e)=>e.stopPropagation()}>
                <button className="close" onClick={closeModal}><FontAwesomeIcon icon={faX} /></button>
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
                            <button className="modal_btn modal_day">평일</button>
                            <button className="modal_btn modal_weekend">주말</button>
                        </li>
                    </ul>
                    <ul className="modal_search_std modal_search_time">
                        <li className="modal_search_std_title">
                            <p className="std_title"> 시간</p>
                        </li>
                        <li>
                            <button className="modal_btn modal_before">오전</button>
                            <button className="modal_btn modal_after">오후</button>
                        </li>
                    </ul>
                        <div className="modal_btn_last_list">
                            <button className="modal_btn_last modal_btn_reset">
                                <FontAwesomeIcon icon={faRotateRight} />
                                <span className="reset_title">초기화</span></button>
                            <button className="modal_btn_last modal_btn_result">강좌보기</button>
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
import { useEffect, useState } from "react"
import {Link, useParams } from "react-router-dom"
import '../css/bytopic.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faFilter, faArrowRotateRight,faXmark,faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { DropDown, DropDownSort, ModalPage, CourseItem} from "../components/SearchByTopicComponents"

export default function SearchByTopic(){
    const {id} = useParams();
    const [showCourse, setShowCourse] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const [detail,setDetail] = useState({day:[1,2,3,4,5,6,7], time:'', center:[1,2,3,4,5,6,7,8,9,10,11,12]});
    const [sort, setSort] = useState(8);
    const [topic,setTopic] = useState({})
    const [cindex, setCindex] = useState('')
    const [view, setView] = useState(false)
    const [smallCategory, setSmallCategory] = useState(0)
    const [selected, setSelected] = useState({day:'',time:'', center:[]})
    const [test, setTest] = useState('')
    const [searchText, setSearchText] = useState('%%')

    const searchDetail = (value,selected)=>{    
        setDetail(value)
        setSelected(selected)
    }


    useEffect(()=>{
        setSmallCategory(0)
        setDetail({day:[1,2,3,4,5,6,7],time:'', center:[1,2,3,4,5,6,7,8,9,10,11,12]})
        setCurrentPage(1)
        setSearchText('%%')
            axios({
                method:'get',
                url:`http://127.0.0.1:8080/topic/${id}`,
                data: id
            })
            .then(response=>setTopic(...response.data))
            .catch(error=>console.log(error))
    },[id])
    let endIndex = 0;
    endIndex = currentPage * pageSize;
    
    useEffect(()=>{
        axios({
            method:'post',
            url:`http://127.0.0.1:8080/topic/${id}/course`,
            data : {'id': id, 'sub_id':smallCategory, 'loc_id':detail.center,
                    'day':detail.day, 'time':detail.time,'text':searchText,
                    'end':endIndex,'sort':sort}})
        .then(response=>setShowCourse([response.data]))
        .catch(error=>console.log(error))
    },[smallCategory,detail,searchText,endIndex,sort])

    console.log('text=>',test)

    const category = [
        {
            list:[
                    {name:"전체", id:0}, {name:'플라워',id:1}, {name:'도예',id:2},{name:'가죽',id:3},
                    {name:'캔들/비누',id:4}],
        },
        {
            list:[  {name:'전체',id:0},{name:'노래교실',id:5},{name:'보컬트레이닝',id:6},
                    {name:'성악',id:7},{name:'기타',id:8}],
        },
        {
            list:[  {name:'전체',id:0},{name:'유화',id:9},{name:'마카',id:10},{name:'색연필',id:11},
                    {name:'수채화',id:12}],
        },
        {
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
        setTest('')
        setDetail({day:[1,2,3,4,5,6,7],time:''})
    }

    const handleDetailDelete = (value) =>{
        if(value === 'day'){
            setSelected({...selected, day:''})
            setDetail({...detail, day:[1,2,3,4,5,6,7]})
        } else if(value === 'time') {
            setSelected({...selected, time:''})
            setDetail({...detail, time:''})
        } else if (value === 'text'){
            setTest('')
            setSearchText('%%')
        }
    }

    const handleSearchText = (value)=>{
        setSearchText(`%${value}%`)
        setTest(value)
    }

    return(
        <>
            <div className="bycenter_title_part">
                <p className="bycenter_title" onClick={()=>{setView(!view)}}>{topic.name}{""}
                    {view ? <FontAwesomeIcon icon={faAngleUp} className="title_arrow"/> : <FontAwesomeIcon icon={faAngleDown} className="title_arrow" />}
                    {view === true ? <DropDown className='dropdown_list' />:<DropDown className='dropdown_list_unactive'/>}
                </p>
            </div>
            <div className="bycenter_list min_inner">

                <ul className="small_category_items_topic" >
                    {category[(id-1)].list.map((item,i)=>(
                            <li className={smallCategory === item.id?"small_category_item_topic_active":"small_category_item_topic"}>
                                <p onClick={()=>setSmallCategory(item.id)}
                                    value={item}
                                    className={smallCategory === item.id?"small_category_name_active":"small_category_name"}
                                    >{item.name}</p>
                            </li>
                    ))}
                </ul>

                <div className="search_part">
                    <p><span>1개</span>의 강좌</p>
                    <div className="search_part_btns">
                        <button className="search_part_detail"
                            onClick={openModal}
                        ><FontAwesomeIcon icon={faMagnifyingGlass} /><span
                        style={{marginLeft:'.4rem'}}>상세검색</span></button>
                            {showModal === true ?<ModalPage
                                            openModal={openModal}
                                            closeModal={closeModal}
                                            click={searchDetail}
                                            searchstd={selected}
                                            search={handleSearchText}/>:null}
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
                {selected.day !== '' || selected.time !== '' || test !== "" || selected.center.length !== 0 ? 
                <ul className="handle_search_standard">
                    <li><button className="handle_search_reset" onClick={handledetailReset}><FontAwesomeIcon icon={faArrowRotateRight} /></button></li>
                    {selected.day!=='' ? <li><p className="handle_search_day">{selected.day}<button className="search_reset_btn" type="button" onClick={()=>handleDetailDelete('day')}><FontAwesomeIcon icon={faXmark} /></button></p></li>:null}
                    {selected.time !== ''? <li><p className="handle_search_time">{selected.time}<button className="search_reset_btn"onClick={()=>handleDetailDelete('time')}><FontAwesomeIcon icon={faXmark} /></button></p></li> :null}
                    {selected.center.map((item)=>(
                        <li><p className="handle_search_center">{item}</p><button className="search_reset_btn"onClick={()=>handleDetailDelete('time')}><FontAwesomeIcon icon={faXmark} /></button></li>
                    ))}
                    {test !== '' ? <li><p className="handle_search_text">{test}<button className="search_reset_btn" onClick={()=>handleDetailDelete('text')}><FontAwesomeIcon icon={faXmark} /></button></p></li> :null}
                    
                </ul>:null}

                <div className="course_list_content">
                    {showCourse.map((items,index)=>(
                        <ul className="course_list">
                            {items.map((item, index)=>(
                                <li key={index}>
                                    <Link to={`course/${item.course_id}`}>
                                        <CourseItem item={item}/>
                                    </Link>
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


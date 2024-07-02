import { useState } from "react"
import { Link } from "react-router-dom"
import '../css/yun.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faFilter} from '@fortawesome/free-solid-svg-icons'

export default function SearchByCenter(){
    const [view, setView] = useState(false)
    const [middleCategory, setMiddleCategory] = useState("0")
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
    return(
        <>
            <div className="bycenter_title_part">
                <p className="bycenter_title" onClick={()=>{setView(!view)}}>잠실점{""}
                    {view ? '^' : '⌄'}
                    {view && <DropDown/>}
                </p>
            </div>
            <div className="bycenter_list min_inner">
                <ul className="middle_category_list">
                    {category.map((item,i)=>(
                        <li value={i}
                            onClick={()=>setMiddleCategory(i)}
                            className="middle_category_item">
                            <CategoryMiddleMenu item={item}
                                            middleCategory={middleCategory}
                                            index={i}/>
                        </li>
                    ))}
                </ul>
                <ul className="small_category_items" 
                style={{'border-bottom': middleCategory === 0 ? 
                            null:'1px solid #E3E1DE'}}>
                    {category[middleCategory].list.map((list)=>(
                        <li className="small_category_item" >
                            <p>{list}</p>
                        </li>
                    ))}
                </ul>
                <div className="search_part">
                    <p><span>개</span>의 강좌</p>
                    <div className="search_part_btns">
                        <button className="search_part_detail"
                            onClick={openModal}
                        ><FontAwesomeIcon icon={faMagnifyingGlass} />상세검색</button>
                            {showModal === true ?<ModalPage
                                            openModal={openModal}
                                            closeModal={closeModal}/>:null}
                        <button className="search_part_sort"><FontAwesomeIcon icon={faFilter} />강의시작일순</button>
                    </div>
                </div>
            </div>
        </>
    )
};

function DropDown(){
    return(
        <ul className="dropdown_list">
            <li className="dropdown_list_st st_seoul"><p>서울점</p></li>
            <li><Link to="/center/1">잠실점</Link></li>
            <li><Link to="/center/2">본점</Link></li>
            <li><Link to="/center/3">강남점</Link></li>
            <li><Link to="/center/4">건대스타시티점</Link></li>
            <li className="dropdown_list_st"><p>수도권점</p></li>
            <li><Link to="/center/5">인천점</Link></li>
            <li><Link to="/center/6">동탄점</Link></li>
            <li><Link to="/center/7">구리점</Link></li>
            <li><Link to="/center/8">분당점</Link></li>
            <li className="dropdown_list_st"><p>지방점</p></li>
            <li><Link to="/center/9">부산본점</Link></li>
            <li><Link to="/center/10">광복점</Link></li>
            <li><Link to="/center/11">광주점</Link></li>
            <li><Link to="/center/12">대구점</Link></li>
        </ul>
    )
};

function CategoryMiddleMenu({item, middleCategory, index}){
    console.log(middleCategory)
    return(
        <>
            <img className={middleCategory===index?"middle_category_img_active":"middle_category_img"} src={item.img} alt="middle_sub_img" />
            <p className={middleCategory === index?"middle_category_txt_active":"middle_category_txt"}>{item.name}</p>
        </>
    )
};

function ModalPage({openModal,closeModal}){
    return(
        <div className='modal_out'onClick={closeModal}>
            <div className='modal_container' onClick={(e)=>e.stopPropagation()}>
                <button className="close" onClick={closeModal}>닫기</button>
                <div className='modal_content'>
                    <p>상세검색</p>
                    <input type="text"
                        placeholder="강좌명 or 강사명으로 검색"/>
                </div>
            </div>
        </div>
    )
};
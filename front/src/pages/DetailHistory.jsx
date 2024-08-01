import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/detailhistory.css'
import { DetailHistoryItem } from '../components/DetailHistoryItem.jsx';
import { CancelModal } from '../components/CancelModal.jsx';


//! 전체페이지에서 내역보기 눌렀을때 나오는 상세페이지

export default function DetailHistory(){
    const [update, setUpdate] = useState(false)
    const [courseInfo, setCourseInfo] = useState({})
    const {orderId} = useParams() // 주문번호! 
    // console.log('detail->useParams(orderId)->', orderId);
    
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8080/history/${orderId}`)
        .then(result=> setCourseInfo(result.data))
    },[orderId, update])


    // console.log('detailHistory->', courseInfo);

    //todo. 이전버튼 눌렀을때
    const navigate = useNavigate();
    const handleClick = () => {
        // navigate('/courseHistory')
        window.history.back() // 취소내역으로는 안가는거 같은데..?
    }

    //todo. 모달 오픈 
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = ()=> {
        setModalOpen(true)
        document.body.style.overflow = 'hidden'
    }
    const closeModal = () =>{
        setModalOpen(false)
        document.body.style.overflow ='unset'
    }


//! Cancel Modal 이벤트 부모가 받기 
const [selectValue, setSelectValue]= useState('')

const handleChange = (e) => {
    setSelectValue(e.target.value)
    // console.log(e.target.value);
}

// console.log('detailpage:',courseInfo);

    return(
<div>
    <div className="sub_visual"><h2 className="heading">수강내역조회</h2></div>
        <div className='section narrow_page min_inner'>
        <div className=''>
        <p className='detailhistory_subtitle'>주문정보</p>
        <table border='1' className='detailHistory_table'>
            <tr className='detailhistory_table_row'>
            <th className='detailhistory_table_1c'> 주문번호</th>
            <td className='detailhistory_table_2c'>{orderId}</td>
            </tr>
            <tr className='detailhistory_table_row'>
            <th className='detailhistory_table_1c'>결제일</th>
            <td className='detailhistory_table_2c'>{courseInfo.order_date}</td>
            </tr>
            </table>
        </div>
<div className='detailhistory_item_total'>
    <div className='detailhistory_item_titles'>
        <span className='detailhistory_subtitle'>수강내역</span>

{courseInfo.status === '결제완료'
?(  <button type='button' className='detailhistory_cancel_btn'
    onClick={openModal}> 취소</button>)
:null
}
      

{modalOpen ==true &&(
    <CancelModal closeModal={closeModal} 
                handleChange={handleChange} selectValue={selectValue}
                orderId={orderId} setUpdate={setUpdate} />)}
</div>
    </div>

<DetailHistoryItem courseInfo={courseInfo}/>

<div className='detailhistory_pre_btn_div full_inner'>
<button className='detailhistory_pre_btn' type='button'
            onClick={handleClick}>이전</button>

</div>
        </div>
        </div>
    )
}
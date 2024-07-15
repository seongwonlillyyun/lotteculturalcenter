import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/detailhistory.css'
import { DetailHistoryItem } from '../components/DetailHistoryItem.jsx';
import { CancelModal } from '../components/CancelModal.jsx';
// import { CancelModalStep1, CancelModalStep2, CancelModalStep3 } from '../components/CancelModal.jsx';


//! 전체페이지에서 내역보기 눌렀을때 나오는 상세페이지
// 여기서 결제 취소 가능 
export default function DetailHistory(){

    // //todo. 버튼 클릭시 체크박스 체크 
    // const [isChecked, setIsChecked] = useState(false)
    // const handleCheck= ()=>{
    //     setIsChecked(!isChecked)
    // }

    //todo. 이전버튼 눌렀을때
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/courseHistory')
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
    // //todo. 모달 페이지 앞뒤로 
    // const [step, setStep] = useState(1)
    // const nextStep = () => {setStep(step+1)}
    // const preStep = () => {setStep(step-1)}

//! Cancel Modal 이벤트 부모가 받기 
const [selectValue, setSelectValue]= useState('')
const handleChange = (e) => {
    setSelectValue(e.target.value)
    console.log(e.target.value);
}

    // 주문아이디? 확인하기
const {orderId} = useParams();

// db 연동 

    return(
        <div>
        <div className="sub_visual"><h2 className="heading">수강내역조회</h2></div>
        <div className='section narrow_page full_inner'>
        <div className=''>
        <p className='detailhistory_subtitle'>주문정보</p>
        <table border='1' className='detailHistory_table'>
            <tr className='detailhistory_table_row'>
            <th className='detailhistory_table_1c'>주문번호</th>
            <td className='detailhistory_table_2c'>주문번호 test</td>
            </tr>
            <tr className='detailhistory_table_row'>
            <th className='detailhistory_table_1c'>결제일</th>
            <td className='detailhistory_table_2c'>2024.06.20.15:30 (test)</td>
            </tr>
            </table>
        </div>
<div className='detailhistory_item_total'>
    <div className='detailhistory_item_titles'>
        <span className='detailhistory_subtitle'>수강내역</span>
            <button type='button' className='detailhistory_cancel_btn'
                    onClick={openModal}>
                취소</button>

{modalOpen ==true &&(
    <CancelModal closeModal={closeModal} 
                handleChange={handleChange} selectValue={selectValue}/>
)}
</div>
{/* 
    { modalOpen ===true && step === 1
    ?<CancelModalStep1 closeModal={closeModal} next={nextStep}/>
    :null} */}

    {/* { modalOpen ===true && step === 2
    ?<CancelModalStep2 handleChange={handleChange} 
        closeModal={closeModal} next={nextStep} pre={preStep}/>
    :null}

    { modalOpen ===true && step === 3
    ?<CancelModalStep3 selectValue={selectValue}
        closeModal={closeModal} pre={preStep}/>
    :null} */}

    </div>
    <DetailHistoryItem />
<div className='detailhistory_pre_btn_div full_inner'>
<button className='detailhistory_pre_btn' type='button' 
            onClick={handleClick}>이전</button>

</div>

        </div>

        </div>


    )
}
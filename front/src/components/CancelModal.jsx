import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/cancelmodal.css'


export function CancelModal({closeModal, handleChange, selectValue}){
    
    const navigate = useNavigate()
    const handleSubmit = () => {
        alert('선택하신 강좌의 결제가 취소되었습니다.')
        navigate('/courseHistory',{state:  {"title": "취소내역 조회",
                                                 "value" : "cancel"}})
    }

    return(
        <div className='cancel_modal_out'>

<div className='cancel_modal'>
    <div className='cancel_modal_top'>
        <div className='cancel_modal_head'>
        <h3>결제취소</h3> 
        <span className="cancel_modal_close_btn" 
            onClick={closeModal}>×</span>
        </div>
        <div className='cancel_modal_top_info'>
        <p>환불 규정에 따라 환불처리 됩니다.</p>
        <p>취소하시겠습니까?</p>
            </div>
        </div>

<div className='cancel_modal_middle'>
    <div className='cancel_modal_info'>
        <p className='cancel_modal_info_subject'>1개월 이내 강좌</p>
        <ul>
        <li>· 수강처리 1/3경과 전 환불 시 수강료 2/3환급</li>
        <li>· 수강처리 1/2경과 전 환불 시 수강료 1/2환급</li>
        <li>· 수강처리 1/2경과 후 수강료 미환급</li>
        </ul>
    </div>
    <div className='cancel_modal_info'>
        <p className='cancel_modal_info_subject'>1개월 초과 강좌</p>
        <ul>
        <li>· 1개월 이내 강좌 기준 + 잔여월 수강료 전액 환급</li>
        </ul>
    </div>
    <div className='cancel_modal_info'>
        <p className='cancel_modal_info_subject'>결제 취소(환불)에 대한 사유를 선택해 주세요.</p>

            <select value={selectValue} onChange={handleChange} className='cancel_modal_select'>
                <option value="" disable hidden>선택</option>
                <option value="고객변심">고객변심</option>
                <option value="컴플레인">컴플레인</option>
                <option value="이사">이사</option>
                <option value="강사불만">강사불만</option>
                <option value="강좌불만">강좌불만</option>
                <option value="폐강">폐강</option>
                <option value="기타">기타</option>
            </select>
    </div>

</div>
       
  
    <div className='cancel_modal_bottom'>
    <p className='cancel_modal_bottom_info'>선택하신 강좌의 온라인 결제를 취소하시겠습니까?</p>
    <button type='button' className='cancel_modal_btn modal_btn_no'
            onClick={closeModal}>
        아니오</button>
    <button type='button' className='cancel_modal_btn modal_btn_yes'
            onClick={handleSubmit}>
        예</button>
    </div>
</div>
</div>
    )
}

// export function CancelModalStep2({next,pre, closeModal, handleChange, selectValue}){
 
//     return(
// <div className='cancel_modal'>
//     <div className='cancel_modal_top'>
//         <div className='cancel_modal_head'>
//         <h3>결제취소</h3> 
//         <span className="cancel_modal_close_btn" onClick={closeModal}>×</span>
//         </div>
//         </div>

//     <div className='cancel_modal_middle'>
//         <div className='cancel_modal_info'>
//         <p className='cancel_modal_info_subject'>결제 취소(환불)에 대한 사유를 선택해 주세요.</p>

//             <select value={selectValue} onChange={handleChange} className='cancel_modal_select'>
//                 <option value="" disable hidden>선택</option>
//                 <option value="고객변심">고객변심</option>
//                 <option value="컴플레인">컴플레인</option>
//                 <option value="이사">이사</option>
//                 <option value="강사불만">강사불만</option>
//                 <option value="강좌불만">강좌불만</option>
//                 <option value="폐강">폐강</option>
//                 <option value="기타">기타</option>
//             </select>
//     </div>
// </div>
       

//     <div className='cancel_modal_bottom'>
//     <p className='cancel_modal_bottom_info'>선택하신 강좌의 온라인 결제를 취소하시겠습니까?</p>
//     <button type='button' className='cancel_modal_btn modal_btn_no'
//             onClick={pre}>
//         아니오</button>
//     <button type='button' className='cancel_modal_btn modal_btn_yes'
//             onClick={next}>
//         예</button>
//     </div>
// </div>
//     )
// }

// export function CancelModalStep3({pre, closeModal, selectValue}){

//     const navigate = useNavigate()
//     const handleSubmit = () => {
//         alert('선택하신 강좌의 결제를 취소하시겠습니까?')
//         navigate('/courseHistory')
//     }
//     return(
// <div className='cancel_modal'>
//     <div className='cancel_modal_top'>
//         <div className='cancel_modal_head'>
//         <h3>결제취소</h3> 
//         <span className="cancel_modal_close_btn" onClick={closeModal}>×</span>
//         </div>
//         </div>

// <div className='cancel_modal_middle'>
//     <div className='cancel_modal_info'>
//         <p className='cancel_modal_info_subject'>1개월 이내 강좌</p>
//         <ul>
//         <li>· 수강처리 1/3경과 전 환불 시 수강료 2/3환급</li>
//         <li>· 수강처리 1/2경과 전 환불 시 수강료 1/2환급</li>
//         <li>· 수강처리 1/2경과 후 수강료 미환급</li>
//         </ul>
//     </div>
//     <div className='cancel_modal_info'>
//         <p className='cancel_modal_info_subject'>1개월 초과 강좌</p>
//         <ul>
//         <li>· 1개월 이내 강좌 기준 + 잔여월 수강료 전액 환급</li>
//         </ul>
//     </div>
//     <div className='cancel_modal_info'>
//         <p className='cancel_modal_info_subject'>결제 취소(환불)에 대한 사유를 선택해 주세요.</p>
//         <p>사유: {selectValue}</p>
//     </div>
// </div>
       
  
//     <div className='cancel_modal_bottom'>
//     <p className='cancel_modal_bottom_info'>선택하신 강좌의 온라인 결제를 취소하시겠습니까?</p>
//     <button type='button' className='cancel_modal_btn modal_btn_no'
//             onClick={pre}>
//         아니오</button>
//     <button type='button' className='cancel_modal_btn modal_btn_yes'
//             onClick={handleSubmit}>
//         예</button>
//     </div>
// </div>
//     )
// }
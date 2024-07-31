import React, {useState} from "react";
import { validateCheckStep1 } from "../apis/validate.js";
import {Term1, Term2, Term3} from "../components/JoinStep1Terms.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons/faFaceSmile";
import { faFaceLaughWink } from "@fortawesome/free-solid-svg-icons/faFaceLaughWink";

import '../css/join.css'

export default function JoinStep1({next,formData,handleCheck}){

const [isOpen, setIsOpen] = useState(false);

const handleToggle = (type) => {
    setToggleType(type)
    setIsOpen(!isOpen)
    // console.log('type->',type);
    }

const [toggleType, setToggleType] = useState('')


    //! 체크박스 체크하면 outline 삭제 
    const handleFocus =(type) => {
        if(type==='membership'){document.getElementById('membership').style.outline='none'            
        }else if(type==='personal'){document.getElementById('personal').style.outline='none'    
        }else if(type==='all'){
            document.getElementById('membership').style.outline='none'  
            document.getElementById('personal').style.outline='none'       
        }
    } 

    return(
    <div className="join_step1">
        <div className="join_step1_top">
            <div className="join_titles">
        <img src="/img/join/step1.png" alt="join_img" className="join_img"/>
        <p className="join_step_title">약관동의</p>
        </div>
        
        <p className="join_step_desc">필수 약관에 동의해주세요
        <FontAwesomeIcon icon={faFaceSmile} />
        <FontAwesomeIcon icon={faFaceLaughWink} className="join_icon"/>
        </p>
        <p className="join_step_text">선택약관에 동의하지 않으셔도 회원가입이 가능합니다</p>
        </div>
        <div className="join_step1_form">
        <div className="join_step1_item">
            <input type="checkbox" 
                onChange={(e)=>handleCheck('all', e.target.checked)} 
                onFocus={()=>handleFocus('all')} /> 
                <p className="join_step1_text step1_all">전체 동의</p></div>

        <div className="join_step1_item">
            <input type="checkbox" name="membership" id="membership" 
                    checked={formData.membership}
                    onChange={()=>handleCheck('membership')} 
                    onFocus={()=>handleFocus('membership')} />
           <p className="join_step1_text"><span className="join_point">[필수]</span>  회원이용약관</p> 
           <button className="step1_desc_btn" type='button' onClick={()=>handleToggle('membership')}>자세히</button>
        </div>
        {isOpen ===true && toggleType ==='membership'
        ?  <div className="join_step1_term">
                 <Term1/>
             </div>
        : null
            }
        
        <div className="join_step1_item">
        <input type="checkbox" name="personal" id="personal" checked={formData.personal}
                    onChange={()=>handleCheck('personal')} onFocus={()=>handleFocus('personal')} />
           <p className="join_step1_text"><span className="join_point">[필수]</span>  개인정보 필수항목에 대한 수집 및 이용동의</p> 
           <button className="step1_desc_btn" type='button' onClick={()=>handleToggle('personal')}>자세히</button>
        </div>
        {isOpen === true && toggleType ==='personal'
            ? <div className="join_step1_term">
            <Term2 /></div>
            : null 
            }
        <div className="join_step1_item">
        <input type="checkbox" checked={formData.optional}  onChange={()=>handleCheck('optional')}/>
        <p className="join_step1_text"><span>[선택]</span> 개인정보 선택항목에 대한 수집 및 이용동의</p> 
           <button className="step1_desc_btn" type='button' onClick={()=>handleToggle('optional')}>자세히</button>
        </div>
        {isOpen === true && toggleType ==='optional'
            ? <div className="join_step1_term">
            <Term3 /></div>
            : null 
        }
                </div>
                <div className="join_btns">
                    <button type="button" className="join_pre_btn">취소</button>
                    <button type='button' className="join_next_btn"
                            onClick={()=>validateCheckStep1(next, formData)}>
                        다음단계</button>
                </div>

        </div>
    )

}
import React from "react";
import { validateCheckStep1 } from "../apis/validate.js";

export default function JoinStep1({next,formData,handleCheck}){

    // const handleClick =() => setShowToggle()

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
        <div>
            <div>
            <p>STEP1 약관동의</p>
            <p>필수 약관에 동의해주세요</p>
            <p>선택약관에 동의하지 않으셔도 회원가입이 가능합니다</p>
            </div>

            <br/>
            <div className="join_step1_form">
                <p>약관</p>
            <input type="checkbox" onChange={(e)=>handleCheck('all', e.target.checked)} 
                    onFocus={()=>handleFocus('all')} /> 전체 동의
            <div>
                <input type="checkbox" name="membership" id="membership" checked={formData.membership}
                        onChange={()=>handleCheck('membership')} onFocus={()=>handleFocus('membership')} />
               <p><span className="join_point">[필수]</span> 회원이용약관</p> 
               <button className="step1_desc_btn" type='button' >자세히</button>
            </div>
            <div>
            <input type="checkbox" name="personal" id="personal" checked={formData.personal}
                        onChange={()=>handleCheck('personal')} onFocus={()=>handleFocus('personal')} />
               <p><span className="join_point">[필수]</span>personal</p> 
               <button className="step1_desc_btn" type='button'>자세히</button>
            </div>
            <div>
            <input type="checkbox" checked={formData.optional}/>
               <p><span className="join_point">[선택]</span>test</p> 
               <button className="step1_desc_btn" type='button'>자세히</button>
            </div>
            <div>
                <button type="button" className="join_step1_pre_btn">취소</button>
                <button type='button' className="join_step1_next_btn"
                        onClick={()=>validateCheckStep1(next, formData)}>
                    다음단계</button>
            </div>
     
            </div>
        </div>
    )

}
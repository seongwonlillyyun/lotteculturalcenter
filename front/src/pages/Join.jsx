import React, {useState, useRef} from 'react'
import JoinStep1 from '../components/JoinStep1.jsx'
import JoinStep2 from '../components/JoinStep2.jsx'
import '../css/join.css'


export default function Join(){
    const [step, setStep] = useState(1)
    const [formData, setFormData] =useState({
        membership: false, personal : false, optional: false, 
        user_name : '', user_id : '' , user_pw : '', user_repw: '', emailId : '' , emailDomain : '', 
        phoneNo1 : '010', phoneNo2 : '', phoneNo3: '',  birth: '', zipcode : '' , address : '' , detailAddress : '' 
        ,name: ''}
    )

    //! step1에서 체크박스 이벤트 발생하면 부모에서 처리 
    const handleCheck = (type, isChecked) => {
        if(type==='all'){
            setFormData({...formData, membership : isChecked, personal : isChecked, optional : isChecked}) 
        }else{
            setFormData({...formData, [type]:!formData[type]})
        }
    }

    const nextStep =() => {setStep(step+1)}
    const preStep = () => {setStep(step-1)}
    console.log(formData);

    //! step2 용
    const handleChange =(e) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name]:value})
    }    

    const handleAddress =(e) =>{
        setFormData({...formData, zipcode : e.zipcode, address:e.address})
    }



    return (
        <div>
            <div className='sub_visual'>
            <h2 className="heading">회원가입</h2>
            </div>
            {/* <p className='join_title'>회원가입</p> */}

            <div className='section narrow_page min_inner'>


            {step===1 && (
                <JoinStep1 next={nextStep} formData= {formData} handleCheck={handleCheck} />
            )}
            {step===2 && (
                <JoinStep2 pre={preStep} formData={formData} handleChange={handleChange}
                 handleAddress={handleAddress}/>
            )}
        </div>
        </div>
    )
}
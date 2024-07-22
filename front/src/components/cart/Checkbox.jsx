import React,{useState} from 'react';



export default function Checkbox({title, id, name, value, checkItemHandler}) {
  const [checked, setChecked] = useState(false); //체크여부 판단

  // onChange 함수 - 체크박스 값 받아오기
  const handleCheck = ({target}) => {
    setChecked(!checked);
    checkItemHandler(target.value, target.checked);
  }

  return(
    <div class="form_checkbox">
      <input type="checkbox"
             id={id}
             name={name}
             value={value}
             onChange={(e)=>{handleCheck(e)}}/>
      
      <label htmlFor={id}>{title}</label>
    </div>
  );
}
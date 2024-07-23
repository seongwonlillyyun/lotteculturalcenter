import React from 'react';



export default function CartCheckbox({title, id, name, value}) {
  
  // const handleChange = (id) => {
  //   alert(id)
  //   if(id === 'all'){
  //     handleAllCheck(true)
  //   }
  //   // console.log('e->',e.target);
  //   // handleCheck(id, e.target.checked)
  //   // handleAllCheck(e.target.checked)
  //   // checkedHandle(e.target.checked)
  // }

  return(
    <div class="form_checkbox">
      <input type="checkbox"
             id={id}
             name={name}
             value={value}
            //  onChange={()=>handleChange(id)}
      />
      
      <label htmlFor={id}>{title}</label>
    </div>
  );
}
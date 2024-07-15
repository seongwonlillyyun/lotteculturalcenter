import React, { useState } from 'react';
import '../css/bytopic.css'
export default function Test() {
  const [test, setTest] = useState([])
  const [testarr, setTestarr] = useState({day:'',btn:[]})

  const btn = [
    {id:1, name :'가'},
    {id:2, name :'나'},
    {id:3, name :'다'},
    {id:4, name :'라'},
    {id:5, name :'마'},
  ]
/*   const handleTest = (e) =>{
    const{name,value} = e.target
    console.log('value=>', value)
    if(testarr.btn.length !== 0 && testarr.btn.includes(value)){
      let result = testarr.btn.filter(item=>item !== value)
        setTestarr({...testarr, btn:[result]})
    } else(
      setTestarr({...testarr, btn:[...testarr.btn, value]})
    )
  } */
  const handleTest = (e) =>{
    const{name,value} = e.target
    console.log('value=>', value)
    if(testarr.btn.length !== 0 && testarr.btn.includes(value)){
      let result = testarr.btn.filter(item=>item !== value)
        setTestarr({...testarr, btn:result})
    } else(
      setTestarr({...testarr, btn:[...testarr.btn, value]})
    )
  }

  console.log('result=>',testarr)
  return (
  <div>
    <ul>
      {btn.map((item)=>(
        <li>
          <button value={item.id} className='center_btn' name='center'
                  onClick={(e)=>handleTest(e)}>{item.name}</button>
        </li>
      ))}
    </ul>
  </div>
);
}
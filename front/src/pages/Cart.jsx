import React, {useState, useEffect } from 'react';
import PayBottom from '../components/cart/PayBottom';
import { useNavigate, Link } from 'react-router-dom';
import { getUser } from '../util/localStorage.js';
import { useSelector, useDispatch} from 'react-redux';
import { cartListAxios } from '../modules/reduxCartAxios';


export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = getUser().userId;

  const cartList = useSelector(state => state.cart.list); // db리스트
  const [checkedItems, setCheckedItems] = useState(new Array(cartList.length).fill(false) ); // 개별체크
  const [checkPrice, setCheckPrice] = useState(0) // 결제가격
  const [checkNum, setCheckNum] = useState(0) // 결제갯수
  const [isAllChecked, setIsAllChecked] = useState(!checkedItems.every((item)=> item)); // 전체체크
  const [deleteList, setDeleteList] =useState([]) // 체크삭제



  
  const handleMore = () => {
    navigate('/'); //상품상세로 이동
  }

  // 전체 체크박스  
  const handleAllCheck = () => {
    setCheckedItems(new Array(cartList.length).fill(!isAllChecked))
    setIsAllChecked(!isAllChecked)
    
    let totalPrice = 0;
    if(!isAllChecked) cartList.map((cart)=> totalPrice += cart.price)
    
      totalPrice = totalPrice.toLocaleString('ko-KR');
      setCheckPrice(totalPrice);
  }

  // 개별 체크박스
  const handleCheck = (id, index, checked) => {
    alert('checked->'+id+index+checked)

    // checkec가 true일때 추가
    // 있는지 없는지 id 체크
    // map으로 돌려서 딜리트 기존 id 값이 체크한 아이디 값이 같지 않을때 추가.

    const deleteId = {id: id}
    setDeleteList([...deleteList, deleteId])




    // if(deleteList.length === 0){
    //   setDeleteList(deleteList[0] = id)
    // }else{
    //   setDeleteList([...deleteList, id])
    // }
 

    // let newDeleteList = [...deleteList, id]
    // deleteList = newDeleteList;
    // deleteList.splice(index, 1, id)
    console.log('deleteList2->', deleteList);


    setCheckedItems((preCheckedItems)=>{
      const updateCheckedItems = [...preCheckedItems]
      updateCheckedItems[index] = !updateCheckedItems[index];
      
      let totalPrice = 0;
      let numPlus = index + 1
      let numMinus = numPlus - 1
      updateCheckedItems.forEach((checked, idx) => {
        if(checked){
          totalPrice += cartList[idx].price
          setCheckNum(numPlus)
        }else{
          setCheckNum(numMinus)
        }
      });
      totalPrice = totalPrice.toLocaleString('ko-KR');
      setCheckPrice(totalPrice);


      return updateCheckedItems;
    })
    
  }
        console.log('deleteList->', deleteList.length);


  const handleDelete = () => {

    alert('111')
  }

  

  useEffect(()=>{
    dispatch(cartListAxios({userId}))
  },[userId])



  return(

      <div className='cart type'>
        <div className="sub_visual">
          <h2 className="heading">장바구니</h2>
          <p className='heading_sub'>장바구니에 담긴 강좌는 최대 30일까지 보관 됩니다.</p>
        </div>

        <div className='min_inner'>
          <div className='cart_num'><span>목록</span><span className='num'>{cartList.length}개</span></div>
          <div className="utils_box">
          <div className="form_checkbox">
  
              <input type='checkbox' 
                     id='all'
                     name='all'
                     value='all' 
                     checked={isAllChecked}
                     onChange={handleAllCheck} 
              />
              <label htmlFor='all' >전체선택</label>
            
            </div>
            <button type='button' className="delete_btn" onClick={handleDelete}><span>선택삭제</span></button>
          </div>

    {/* 장바구니 리스트 시작 */}
        {
        cartList.length === 0 ? (
          <div className='cart_bin'>
            <span className='icon'></span>
            <h3>장바구니가 비었습니다.</h3>
          </div>
         ): (
        cartList && cartList.map((item, index) => (
          <div className='cart_list' key={item.course_id}>
          <ul className='cart_list_box'>
            <li className=''>
            <div className="form_checkbox">
                <input type='checkbox' id={`${item.course_id}`} 
                          name={`list${index}`}
                          value={`${index}`}
                          onChange={(e)=>handleCheck(item.course_id, index, e.target.checked)}
                          checked={checkedItems[index]}               
                />  
                <label htmlFor={`${item.course_id}`}></label>   
                </div>
            </li>
            <li className='title'>
              <span className='deco'>{item.status}</span>
              <span className='deco loc'>{item.loc}</span>
              <Link to={'/'}>
                <h2>{item.course_name}</h2>
              </Link>
            </li>
            <li className='info'>
              <dl>
                <dt>강사명</dt>
                <dd>{item.teacher_name}</dd>
              </dl>  
              <dl> 
                <dt>강좌정보</dt>
                <dd>{item.course_start} ~ {item.course_end} <span>({item.course_week})</span> {item.start_time} ~ {item.end_time} / <span>{item.num_of_course}</span>회</dd>
              </dl>
              <dl>  
                <dt>강좌료</dt>
                <dd>{item.price}</dd>
              </dl>
              <dl className='total'>  
                <dt>총금액</dt>
                <dd><span className='price'>{item.price}</span>원</dd>
              </dl>
            </li>
          </ul>
           
        </div>
        
        ))
      )
    }
    {/* 장바구니 리스트 끝 */}


          <div className="remove_btn">
            <button type='button'>장바구니 비우기</button>
          </div>
          <div className='text_box'>
            <h3>알려드립니다!</h3>
            <ul className='text_box_list'>
              <li>수강자가 본인이 아니거나 가족 수강자일 경우, 결제 페이지에서 수강자 변경 및 추가하실 수 있습니다.</li>
              <li>강좌 개강 후 ‘현장 상담’을 통해 수강등록 상담을 받으실 수 있습니다.</li>
              <li>신청하신 강좌는 최소 정원에 미달되거나 사정에 의해 폐강 될 수 있으니 양해 바랍니다.</li>
            </ul>
          </div>
          <div className='basic_btn'>
            <button type='button' className='btn btn_border medium' onClick={handleMore}>강좌 더보기</button>  
          </div>
          
        </div>    

        {/* 하단고정 */}
        <PayBottom cname={'cart'} cartList={cartList} checkPrice={checkPrice} checkNum={checkNum} />
        
      </div>

    
  );
}
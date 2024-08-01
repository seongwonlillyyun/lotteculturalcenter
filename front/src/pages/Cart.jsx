import React, {useState, useEffect } from 'react';
import PayBottom from '../components/cart/PayBottom';
import { useNavigate, Link } from 'react-router-dom';
import { getUser } from '../util/localStorage.js';
import { useSelector, useDispatch} from 'react-redux';
import { cartListAxios, cartCheckRemoveAxios, cartCheckAllRemoveAxios } from '../modules/reduxCartAxios';
import axios from 'axios';
import LoginError from '../components/LoginError'



export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = getUser();
  const userId = userInfo && userInfo.user_id;


  const cartList = useSelector(state => state.cart.list); // db리스트
  const count = useSelector(state => state.cart.count);
  const [checkPrice, setCheckPrice] = useState(0) // 결제가격
  const [checkNum, setCheckNum] = useState(0) // 결제갯수
  const [checkedItems, setCheckedItems] = useState([]); // 개별체크
  const [isAllChecked, setIsAllChecked] = useState(false); // 전체체크
  const [cartItemList, setCartItemList] = useState([]) // 체크여부 id


  
  useEffect(()=>{
    // 장바구니 비었을때 
    if(count === 0) {
      setCheckNum(0)
      setCheckPrice(0)
    }
    
    dispatch(cartListAxios(userId))
  },[count])

  useEffect(()=>{
    setCheckedItems(Array.from(new Array(cartList.length), ()=>isAllChecked))
  },[cartList])


  const handleMore = () => {
    navigate('/'); //상품상세로 이동
  }

  // 전체 체크박스  
  const handleAllCheck = () => {
    setCheckedItems(new Array(cartList.length).fill(!isAllChecked))
    setIsAllChecked(!isAllChecked)
    
    // 총가격
    let totalPrice = 0;
    if(!isAllChecked) cartList.map((cart)=> totalPrice += cart.price)
  
    totalPrice = totalPrice.toLocaleString('ko-KR');
    setCheckPrice(totalPrice);

    // 총갯수
    if(!isAllChecked) setCheckNum(cartList.length)
      else setCheckNum(0)

    // 전체삭제
    if(!isAllChecked) {
      let cartId = cartList.map(item=> item.course_id) 
      let cartIdObj = cartId.map(id=> ({id})) 
      setCartItemList(cartIdObj)
    }else{
      setCartItemList([])
    }

  }

  // 개별 체크박스
  const handleCheck = (id, index, checked) => {
    setCheckedItems((preCheckedItems)=>{
      const updateCheckedItems = [...preCheckedItems]
      updateCheckedItems[index] = !updateCheckedItems[index];
      
      // 총가격
      let totalPrice = 0;
      updateCheckedItems.forEach((checked, idx) => {
        if(checked) totalPrice += cartList[idx].price}
      );

      totalPrice = totalPrice.toLocaleString('ko-KR');
      setCheckPrice(totalPrice);

      // 총갯수 - 카트리스트 아이디값이 체크한 아이디값과 같으면 1씩 증가 / 1씩 감소  
      const numId = {id: id}
      const numFilter = cartList.filter(item => item.course_id !== numId.id); // 아이디값 체크
      if(checked && numFilter){
        setCheckNum(checkNum+1)
      }else{
        setCheckNum(checkNum-1)
      }

      return updateCheckedItems;
    })

    // 체크아이템 선택
    const cartItemId = {id:id}
    if(checked){
      setCartItemList([...cartItemList, cartItemId])
    }else{
      let idCheckFilter = cartItemList.filter(item => item.id !== id)
      setCartItemList(idCheckFilter)
    }

 }

  // 선택삭제
  const handleDelete = () => {
    alert('정말 삭제하시겠습니까?')


    dispatch(cartCheckRemoveAxios(cartItemList))
    // console.log('remove result->', result);
    // //서버전송
    // const url = 'http://127.0.0.1:8080/cart/remove'    
    // axios({
    //   method: 'post',
    //   url : url,
    //   data: {cartItemList: cartItemList}
    // })
    // .then(dispatch(cartListAxios(cartItemList)))
    // .catch(error=> console.log(error))

  }

  // 장바구니 비우기
  const handleAllDelete = () => {   
   dispatch(cartCheckAllRemoveAxios(userId))
  }


  return(
    <>
      {
        userInfo === null ? (
          <LoginError/>
        ) : (
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
            <button type='button'
                    className="delete_btn" 
                    onClick={handleDelete}>
                    <span>선택삭제</span>
            </button>
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
              <Link to={`/course/${item.course_id}`}>
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
                <dd>{item.allprice}</dd>
              </dl>
              <dl className='total'>  
                <dt>총금액</dt>
                <dd><span className='price'>{item.allprice}</span>원</dd>
              </dl>
            </li>
          </ul>
           
        </div>
        
        ))
      )
    }
    {/* 장바구니 리스트 끝 */}


          <div className="remove_btn">
            <button type='button' onClick={handleAllDelete}>장바구니 비우기</button>
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
            <Link to={'/'}>
              <button type='button' className='btn btn_border medium' onClick={handleMore}>홈으로</button>  
            </Link>
          </div>
          
        </div>    

        {/* 하단고정 */}
        <PayBottom cname={'cart'} checkPrice={checkPrice} checkNum={checkNum} cartItemList={cartItemList} cartList={cartList} />
        
      </div>

        ) 
      }
      
      </>
  );
}
import React, {useState, useEffect } from 'react';
import PayBottom from './PayBottom';
import Tab from './Tab';
import { useNavigate, Link } from 'react-router-dom';
import { getUser, removeUser } from '../../util/localStorage.js';
import { useSelector, useDispatch} from 'react-redux';
import { cartListAxios, cartUsePoint } from '../../modules/reduxCartAxios';
import axios from 'axios';
import LoginError from '../../components/LoginError'


export default function OrderStep1({next, stepOrder, courseList, cartItemList, setFinalData}) {
  const userInfo = getUser();
  const userId = userInfo && userInfo.user_id;
  const cartList = useSelector(state => state.cart.list); // db리스트
  const count = useSelector(state => state.cart.count);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [point, setPoint] = useState({}); // db 포인트 불러오기 {point : 0}
  const [inputPoint, setInputPoint] = useState(0) // 입력한 포인트
  const [isChecked, setIsChecked] = useState(false) // 체크박스 동의

  
  let orderItemList = [];
  let orderPrice = courseList.reduce((acc, cur) => {
    acc += parseInt(cur.allprice.replace(",",""))
    return acc
  }, 0);

  useEffect(()=>{
    setFinalData(prev => ({...prev, orderPriceAll : orderPrice.toLocaleString()}))
  },[orderPrice])
            
  // if(cartItemList.length !== 0 ){
  //   cartItemList.map(item => {
  //     cartList.filter((cart)=>{ 
  //       if(cart.course_id === item.id ){
  //         orderItemList = [...orderItemList, cart]
  //         orderPrice += cart.price
  //       }
  //     })  
  //   })
    
  // }// end of if
  
  const orderPriceAll = orderPrice.toLocaleString();
  // 총 결제금액
  let orderPricePay = orderPrice - inputPoint;
  const orderPriceAllPay = orderPricePay.toLocaleString();

    
    useEffect(()=>{
      // 포인트 db데이터 받기
      const url = 'http://127.0.0.1:8080/order/pointget'    
      axios({
        method: 'post',
        url : url,
        data: {userId}
      })
      .then(res => {
        setPoint(res.data)
        }
      )
      .catch(error=> console.log(error))
    
    },[])

    // 포인트 입력
    const handlePoint = (e) => {
      setInputPoint(e.target.value)
    }

    // 포인트 사용
    const handleClick = async() => {
      const data = {
        userId : userId,
        point : inputPoint
      }
      
      const result = await cartUsePoint(data);

      result.cnt === 1 ? alert('사용한 포인트만큼 차감되었습니다.') : alert('실패')

    }

    // 체크박스 동의
    const handleChange = (checked) => {
      if(checked){
        setIsChecked(!isChecked)
      }
    }
   

    useEffect(()=>{
      dispatch(cartListAxios(userId))
    },[count])
  
  

  return(
    <>
      {
        userInfo === null ? (
          <LoginError/>
        ):(
        <div className='order type'>
          <div className="sub_visual">
            <h2 className="heading">수강결제</h2>
          </div>
          <div className='min_inner'>
            <Tab stepOrder={stepOrder} />  
            <h2 className='htitle'>수강자 정보</h2>
            
            {/* 리스트 시작 */}
            { courseList.map((item, index) => (
              <div className='cart_list' key={item.course_id}>
              <ul className='cart_list_box'>
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
            }
            {/* 리스트 끝 */}

            <div className='mid-line'></div>

            <h2 className='htitle'>할인혜택</h2>
            <div className='order_line'>
                <h3>L.POINT<span>보유 :<span className='num'>{point.point}</span>점 </span></h3>
                <label htmlFor='point'></label>
                <input type='number' id='point' name='point' placeholder='0점' onChange={handlePoint} />
                <button type='submit' className='submit_btn' onClick={handleClick} >사용</button>
                {/* <p>포인트 사용은 10점 단위로 사용 가능합니다.</p> */}
            </div>

            <h2 className='htitle'>총 결제금액</h2>
            <div className='order_line'>
              <ul className='all_pay'>
                <li>
                    <h4>강좌료 합계</h4>
                    <span><span className=''>{orderPriceAll}</span>원</span>
                    <p>* 재료비 또는 대여료 옵션 금액을 제외한 원 강좌료 금액이 표시 됩니다.</p>
                </li>
                <li className='cir'>
                  <span className='minus'></span>
                </li>
                <li>
                    <h4>할인금액 합계</h4>
                    <span className='red'>(-)<span className=''> {inputPoint}</span> 원</span>
                    <p>* 포인트 금액이 차감됩니다.</p>
                </li>
                <li className='cir'>
                  <span className='plus'></span>
                </li>
                <li>
                    <h4 className='bold'>총 결제금액</h4>
                    <span><span className='num'>{orderPriceAllPay}</span>원</span>
                </li>
              </ul>
            </div>
            
            <h2 className='htitle'>결제수단</h2>
            <div className='order_line'>
                <h3>신용카드</h3>
                <ul className='text_box_list'>
                  <li>바우처카드(롯데 아이행복카드, 국민 행복카드, BC 청년 디딤돌 카드, 디딤돌바우처카드 등)는 카드사 정책에 따라 다수강좌 묶음결제 시 추후 부분 취소가 불가합니다.</li>
                  <li>충전식카드(복지카드, 포인트카드, 기프트카드 등)로 결제 시 추후 카드의 유효기간이 만료된 후에는 환불 처리가 불가합니다.</li>
                </ul>
            </div>

            <div className='text_box'>
              <h3>유의사항 안내</h3>
              <ul className='text_box_list'>
                <li>재료비가 있는 강좌의 경우 최소 3일 이전까지만 전액 환불 가능합니다.</li>
                <li>강좌의 환불은 학기 개강일 이전 전액 환불 및 변경이 가능하며, 다음학기로 강좌 연기는 불가능합니다.</li>
                <li>또한 강좌 개시일 이후 본인 사유에 의한 환불의 경우 소비자 분쟁해결기준(공정거래위원회 고시 제 2008-3호)에 의거하여 환불해 드립니다.</li>
                <li>
                    1개월 이내 강좌
                  <ul className='text_box_lists'>
                    <li>수강시간 1/3 경과 전 환불 시 수강료 2/3 환급</li>
                    <li>수강시간 1/2 경과 전 환불 시 수강료 1/2 환급</li>
                    <li>수강시간 1/2 경과 후 수강료 미 환급</li>
                  </ul>
                </li>
                <li>
                    1개월 초과 강좌
                  <ul className='text_box_lists'>
                    <li>1개월 이내 강좌 기준 적용 + 잔여월 수강료 전액 환급</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className='order_line check'>
              <div className="form_checkbox">
                <input type='checkbox' 
                      id='orderCheck'
                      name='orderCheck'
                      value='orderCheck' 
                      onChange={(e)=>handleChange(e.target.value)}
                      checked={isChecked}
                />
                <label htmlFor='orderCheck'>주문내역 확인 동의</label>
              </div>
            </div>
          </div>
          {/* 하단고정 */}
          <PayBottom next={next} cname={'order'} stepOrder={stepOrder} isChecked={isChecked} 
            setIsChecked={setIsChecked} orderPriceAllPay={orderPriceAllPay} inputPoint={inputPoint}
            cartItemList={cartItemList} setFinalData={setFinalData}/>
        </div>
        )
      }
    </>
  );
}
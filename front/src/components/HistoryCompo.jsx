
import React, {useState, useEffect} from 'react'
import DetailHistory from '../pages/DetailHistory'

export function TopInfo(){

return(
    <>
    <ul className="topinfo_texts">
        <li>- 데스크에서 접수한 강좌의 경우 방문 시에만 취소 가능합니다. (결제한 카드 및 영수증 지참 필수)</li>
        <li>- 카드결제 취소 처리의 경우 환불 접수 후 실제 취소 승인은 카드사 사정에 따라 처리 기간이 상이할 수 있습니다.</li>
        <li>- 재료 준비가 필요한 일부 강좌(요리, 공예, 플라워 등)는 강좌 시작일의 3일 전까지 취소 가능합니다.</li>
        <li>- 강의시작일 이후 취소 시에는 환불규정에 의거하여 환불 차감액을 제외한 나머지 금액이 부분환불 됩니다.</li>
        <li>- 결제/취소관련 문의는 1:1문의 이용 또는 유선으로 가능합니다.</li>
    </ul>
</>
)
}

export function HistoryForm(){

const [itemList, setItemList] = useState([])
const [tab, setTab] = useState('수강내역 조회')
// const [tab, setTab] = useState({title : '수강내역 조회', value : 'register'})
const handleTabClick = (tab) => {
    setTab(tab)
    console.log('tab->', tab);
}

const typeList = [
            {"title": "수강내역 조회",
            "value" : "register"
            },
            {"title": "취소내역 조회",
            "value" : "cancel"}]

// console.log('typeList.value->', typeList.value);
// console.log('typeList.title->', typeList.title);

const rows = [] 
for(let i=0; i<itemList.length; i+=2){
    rows.push(itemList.slice(i,i+2))
}

    return(
        <>
        <nav className="history_btns">
{typeList.map(item=>(
<button className={typeList.value === item.value ?'history_btn_active' :'history_btn'}
        type='button' value={item.value} onClick={()=>handleTabClick(item.value)}>
            {item.title}</button>
))}

        </nav>
<div className="inner">
<input type="text" className="history_search" 
    placeholder="주문번호/강좌명으로 검색하세요"/>
    <div className="history_mid">
        <div>        
            <span>전체</span>
            <span>0</span>
            <span>개</span></div>
        <select className="history_yearfilter">
            <option value="all">전체연도</option>
            <option value="2024">2024년</option>
            <option value="2023">2023년</option>
            <option value="2022">2022년</option>
        </select>
</div>
    <div className="history_content">
        {tab === 'register' && <> 수강내역 content
            <HistoryItem tab={tab}/>
            <HistoryItem tab={tab}/>
            {/* <ul>
                {rows.map((items)=>(
                    <li>
                        {items.map((item)=>(
                   
                        ))}
                    </li>
                ))}
            </ul> */}
            </>}
        {tab === 'cancel' && <div> 취소내역 content
            <HistoryItem tab={tab}/>
            </div>}
    </div>
</div>
        </>
    )
}

export function HistoryItem({tab}){

    const handleDetail = (e) => {
    <DetailHistory/>
    console.log(e.target);
    }


    return(
        <>
        <div className="history_item">
            <div className="history_item_top">
                <div className="history_item_top_left">
                <ul>
                    <li>
                        <span>주문번호</span>
                        <span>test1 </span>
                        </li>
                    <li>
                        <span>결제일 </span>
                        <span>test2</span>
                        </li>
                </ul>
                </div>
                <button type="button" className="history_detail_btn"
                        onClick={(e)=>handleDetail(e)} >내역보기</button>
            </div>
            <div className="history_item_mid">
                <ul>
                    <li className="history_item_branch">중동점</li>
                    <li className="history_item_coursename">[7/13]윤주코치의 바른자세를 만드는 다리 찢기 스트레칭</li>
                    <li className="history_item_info">
                        <span>옥윤주</span> / 
                        <span>2024년 여름학기</span>
                        </li>
                    <li className="history_item_info">2024.07.13~2024.07.13(토) 18:00~19:00 / 1회</li>
                    <li className="history_item_info">
                        <span>강좌료 : </span>
                        <span>10,000원</span></li>
                </ul>
            </div>
            <div className="history_item_bottom">

{tab === 'register' && 
        <ul className="history_item_bottom_ul">
            <li className="history_item_bottom_name">김미성</li>
            <li className="history_item_bottom_state">
            <span>접수상태</span>
            <span>결제완료</span>
            </li>
            <li className="history_item_bottom_price">
            <span>주문금액</span>
            <span>10,000원</span>
            </li>
                            </ul>
            }

{tab === 'cancel' && 
                <ul className="history_item_bottom_ul">
        <li className="history_item_bottom_name">김미성</li>
        <li className="history_item_bottom_state">
        <span>접수상태</span>
        <span>취소완료</span>
        </li>
        <li className="history_item_bottom_price">
        <span>취소(환불)금액</span>
        <span>10,000원</span>
        </li>
                        </ul>
                    }
                




            </div>
        </div>
        
        </>
    )
}


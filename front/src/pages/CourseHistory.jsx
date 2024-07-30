import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { HistoryForm, TopInfo } from "../components/HistoryCompo.jsx";
import { getUser } from "../util/localStorage.js";
import '../css/coursehistory.css'
import '../css/style.css'

export default function CourseHistory(){

const location =useLocation();
    // console.log(location.state);
const tvalue =  location.state;

const userInfo = getUser();
// console.log('userInfo', userInfo.user_id);

const[courseInfo, setCourseInfo] =useState([])
useEffect(()=>{
    const url ='http://127.0.0.1:8080/history/list'
    axios({
        method : 'post',
        url : url,
        data : {user_id : userInfo.user_id }
    })
    .then(res =>setCourseInfo(res.data))
    .catch(error=>console.log(error))
},[])

const[cancelInfo, setCancelInfo]= useState([])
useEffect(()=>{
    const url ='http://127.0.0.1:8080/history/cancellist'
    axios({
        method : 'post',
        url : url, 
        data : {user_id : userInfo.user_id}
    })
    .then(res=>setCancelInfo(res.data))
    .catch(error=>console.log(error))
},[])

// console.log('courseHistory->', courseInfo);
// console.log('cancleList->', cancelInfo);


    return(
        <div>
        <div className="sub_visual">
            <h2 className="heading">수강내역조회</h2>
            </div>
            <div className="narrow_page min_inner">
            <div className="courserHistory_topinfo">
            <TopInfo/>
            </div>
             
            <HistoryForm courseInfo={courseInfo} setCourseInfo={setCourseInfo}
            cancelInfo={cancelInfo} setCancelInfo={setCancelInfo}/>

        </div>
    </div>
    ) 
}
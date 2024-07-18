import React from "react";
import { useLocation } from "react-router-dom";
import { HistoryForm, TopInfo } from "../components/HistoryCompo.jsx";
import '../css/coursehistory.css'
import '../css/style.css'

export default function CourseHistory(){
    const location =useLocation();
    // console.log(location.state);
const tvalue =  location.state;

    return(
        <div>
        <div className="sub_visual">
            <h2 className="heading">수강내역조회</h2>
            </div>
            <div className="narrow_page min_inner">
            <div className="courserHistory_topinfo">
            <TopInfo/>
            </div>
             
                    <HistoryForm tvalue={tvalue}/>

                </div>
        </div>
    ) 
}
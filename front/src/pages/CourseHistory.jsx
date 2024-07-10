import React from "react";
import { HistoryForm, TopInfo } from "../components/HistoryCompo.jsx";
import '../css/coursehistory.css'
import '../css/style.css'

export default function CourseHistory(){
    return(
        <div>
        <div className="sub_visual">
            <h2 className="heading">수강내역조회</h2>
            </div>
            <div className="courserHistory_topinfo">
            <TopInfo/>
            </div>
<div className="narrow_page inner">
    <HistoryForm />
</div>

        </div>
    ) 
}
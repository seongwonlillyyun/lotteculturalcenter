import { useState } from "react";

// svg 
import { ReactComponent as IconSearch } from "../svg/icon-search.svg";

export function SearchVisual({title, handler}) {
  const [keyword, setKeyWord] = useState("");
  
  const submitHandler = (e) => {
    e.preventDefault();
    handler(keyword);
    setKeyWord("");
  }

  const changeHandler = (e) => {
    const {value} = e.target;
    setKeyWord(value);
  }

  return(
    <form className="sub_visual" onSubmit={submitHandler}>
      <h2 className="heading">{title}</h2>
      <div className="form_search">
        <input type="text" value={keyword} onChange={changeHandler} placeholder="검색어를 입력하세요"/>
        <button className="search_btn"><IconSearch /></button>
      </div>
    </form>
  );
}
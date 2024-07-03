import { useEffect, useState } from "react";

export function useScript(src) {
  const [isLoad, setIsLoad] = useState(false);

  useEffect(()=>{
    let script = document.querySelector(`script[src="${src}"]`);

    if(!script){
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    }

    const loadHandler = () => setIsLoad(true);

    script.addEventListener("load", loadHandler);

    return () => {
      script.removeEventListener("load", loadHandler);
      script.remove();
    }

  },[])

  return isLoad;
}

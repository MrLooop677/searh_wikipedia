import React, { useEffect,useRef } from 'react';

const useCustomeHookes=(state)=>{
    const ref=useRef(state);
    useEffect(()=>{
        ref.current=state
    })
    return ref.current;
}
export default useCustomeHookes;
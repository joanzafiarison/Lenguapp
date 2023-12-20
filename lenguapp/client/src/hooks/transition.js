import React , { useState, useEffect } from "react";


const STATE = {
    ENTERING : 'entering',
    ENTERED : 'entered',
    EXITING : 'exiting',
    EXITED : 'exited'
}
//custom hook with useEffect/useState hook
function useTransitionState(duration = 1000){

    const [state, setState] = useState();

    useEffect(()=>{
        let timerId;
        
        if (state === STATE.ENTERING){
            console.log("switch to enter")
            timerId = setTimeout(()=>setState(STATE.ENTERED),duration);
        }
        else if (state === STATE.EXITING){
            console.log("switch to  end")
            timerId = setTimeout(()=>setState(STATE.EXITED),duration)
        }
        
        return () => {
            timerId && clearTimeout(timerId)
        }
        
    });
    return [state,setState]
}

// TODO : extract this hook STATE TOGGLER
export function useTransitionControl(duration){
    const [state,setState] = useTransitionState(duration);

    const enter = () => {
        if(state !== STATE.EXITING){
            setState(STATE.ENTERING);
        }
    };
    const exit =() => {
        if(state !== STATE.ENTERING){
            setState(STATE.EXITING)
        }
    };

    return [state,enter,exit];
}
import React, {useContext, createContext, useReducer } from 'react';

const FlowContext = createContext(null);
const FlowDispatchContext = createContext(null);


//TODO Make flow context for course
export function FlowContextProvider({children}) {
  const [flow , dispatch ] = useReducer(
    flowReducer,
    initialFlow
  )
  return (
    <FlowContext.Provider value={flow}>
      <FlowDispatchContext.Provider value={dispatch}>
        {children}
      </FlowDispatchContext.Provider>
    </FlowContext.Provider>
  )
}


export function useFlow(){
  return useContext(FlowContext);
}

export function useFlowDispatch(){
  return useContext(FlowDispatchContext);
}


function flowReducer (flow, action) {
  switch(action.type){
    case "UPDATE_FOCUS" :
      return {
        ...flow,
        focus : action.focus
      }
    case "NEXT_STEP" :
      return { 
        ...flow,
        cursor : action.cursor
      };
    case "UPDATE_SELECTION" :
        return { 
          ...flow,
          selected : action.selected
        };
    case "UPDATE_SOLUTION" :
      return { 
        ...flow,
        solution : action.solution
      };
      case "UPDATE_CONTENT" :
        return { 
          ...flow,
          content : action.content
        };
        case "UPDATE_SUCCESS" :
          return { 
            ...flow,
            success : action.success
          };
    default :
      throw Error("unknow action")
  }
}


const initialFlow = {
  cursor :0 ,
  focus : "",
  selected : {},
  solution : "",
  content : []
}


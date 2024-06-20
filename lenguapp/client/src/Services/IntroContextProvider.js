import React ,{useContext,useReducer,createContext} from "react";

const IntroContext = createContext(null);

const IntroDispatchContext = createContext(null);


export function IntroProvider({ children }) {

  const [intro, dispatch] = useReducer(
    introReducer,
    initialData
  );
  return (
    <IntroContext.Provider value={intro}>
      <IntroDispatchContext.Provider value={dispatch}>
        {children}
      </IntroDispatchContext.Provider>
    </IntroContext.Provider>
  );
}


export function useIntro() {
    return useContext(IntroContext);
  }
  
export function useIntroDispatch() {
    console.log("intro dispatch used")
    return useContext(IntroDispatchContext);
}


function introReducer(intro,action){
    console.log("in introReducer",action.type)
    switch(action.type){
        case 'updateMeta' : {
            console.log(action);
            console.log("cours",intro);
            return {
                ...intro,
                meta : {
                "lang" : action.options.lang,
                "rythmn" : action.options.rythmn,
                "streak" : action.options.streak,
              }
            };
        }
        case 'nextStep':{
            return {step : action.step} 
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


const initialData = {
    "step" :0,
    "meta":{},
  }
/*
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }*/
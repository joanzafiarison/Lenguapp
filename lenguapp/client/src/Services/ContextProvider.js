
import React, {useContext, createContext, useReducer } from 'react';

const AppContext = createContext(null);
const AppDispatchContext = createContext(null);

let init_context =  {
    user : {
        username :"bendoFlex",
        mail :"bendoMail.fr",
        user_id :"63dd7bae6dfe86b3e0186613",
        last_expiration_time : "051651561",
        token :"516516511fhlnk",
        authentificated : "true"
    },
    search :{
        lang_src : "french",
        lang_dest :"japanese",
        theme : "words",
        level :"beginner"
    }

}
//provider of global state
export default function ContextProvider({children}){
        const [authData, dispatch] = useReducer(
            authReducer,
            init_context
          );

    
        return (
            <AppContext.Provider value={authData}>
                <AppDispatchContext.Provider value={dispatch}>
                    {children}
                </AppDispatchContext.Provider>
            </AppContext.Provider>
        )

}

export function useAppData() {
    return useContext(AppContext);
  }
  
export function useAppDispatch() {
    console.log("course dispatch used")
    return useContext(AppDispatchContext);
}

function authReducer(initContext, action){
    switch(action.type) {
        case "USER" :
            return {
                ...initContext,
                user : action.user
            };
        case "SEARCH":
            return {
                ...initContext,
                search : action.search
            };
        default :
            return initContext;
    }
}
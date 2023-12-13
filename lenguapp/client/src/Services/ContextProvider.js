
import React, {useContext, createContext, useReducer } from 'react';

const AppContext = createContext(null);
const AppDispatchContext = createContext(null);

//Mail , lang , username should not appear
let init_context =  {
    user : {
        username :"",
        user_id :"",
        token :"",
        lang : "",
    },
    search :{
        lang :"malagasy",
        theme : "food",
        level :"beginner",
        type : "words"
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
    console.log("app dispatch used")
    return useContext(AppDispatchContext);
}

function authReducer(initContext, action){
    console.log(initContext)
    switch(action.type) {
        case "USER" :
            return {
                ...initContext,
                user : action.user
            };
        case "UPDATE_TOKEN" : {
            return {
                ...initContext,
                user : {
                    ...initContext.user,
                    token : action.token
                }
            }
        }
        case "SEARCH":
            return {
                ...initContext,
                search : action.search
            };
        default :
            return initContext;
    }
}
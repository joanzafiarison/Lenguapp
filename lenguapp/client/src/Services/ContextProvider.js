import React from 'react'
export const AppContext = React.createContext();
export const AppDispatchContext = React.createContext();

let user_test =  {
    username :"bendoFlex",
    mail :"bendoMail.fr",
    user_id :"63dd7bae6dfe86b3e0186613",
    last_expiration_time : "051651561",
    token :"516516511fhlnk",
    authentificated : "true"
}
//provider of global state
export default function ContextProvider({children}){
        const [authContext, setAuthContext] = React.useState(user_test);


    
        return (
            <AppContext.Provider value={[authContext, setAuthContext]}>
                {children}
            </AppContext.Provider>
        )

}
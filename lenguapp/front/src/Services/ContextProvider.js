import React from 'react'
export const AppContext = React.createContext()

//provider of global state
export default function ContextProvider(props){

        let user_test =  {
            username :"BendoFlex",
            mail :"bendoMail.fr",
            user_id :"615ebf483cf6924a6dfda98e",
            last_expiration_time : "051651561",
            token :"516516511fhlnk",
            authentificated : "true"
        }

    
        return (
            <AppContext.Provider value={user_test}>
            {props.children}
            </AppContext.Provider>
        )

}
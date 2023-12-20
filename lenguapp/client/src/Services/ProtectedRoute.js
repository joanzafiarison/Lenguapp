import {Redirect,Route} from "react-router-dom"
import {withContext} from "./ContextWrapper"

function ProtectedRoute (props) {
   // state is set to false 
   // TODO useEffect authentification and redirect to protected page
   // Make Api call for auth
    console.log("in protected route ",this.state)
      
      return (
        <Route 
          {...props} 
          render={props => (
            this.state.authenticated ?
              <Component {...props} /> :
              <Redirect to='/' />
          )} 
        />
      )
}


export default withContext(ProtectedRoute)
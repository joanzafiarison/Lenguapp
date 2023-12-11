import {Redirect,Route} from "react-router-dom"
import {withContext} from "./ContextWrapper"

function ProtectedRoute (props) {
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
import { ReactNode } from  "react";
import { Navigate } from "react-router-dom";


export default function ConditionalRoute({
    condition,
    redirectTo,
    children,
}: ConditionalRouteProps ) : JSX.Element {
    return condition ? <>{children}</> : <Navigate to={redirectTo} replace />
}

export type  ConditionalRouteProps = {
    /**
   * Route is created if its condition is true.
   * For example, `condition={isLoggedIn}` or `condition={isAdmin}`
   */
    condition : boolean,
    /* Page to redirect*/
    redirectTo : string,
    /*Component to display */
    children? : ReactNode
}
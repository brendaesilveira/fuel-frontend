import { useContext } from "react";
import {AuthContext} from "../context/auth.context"
import { Navigate } from "react-router-dom";


const IsSetupIncompleted = props => {
    const {user} = useContext(AuthContext)

    if (user && user.setupCompleted) {
         <Navigate to={'/home'} />
         return props.children
    } else {
        return <Navigate to={'/setup'} />
    }
}

export default IsSetupIncompleted
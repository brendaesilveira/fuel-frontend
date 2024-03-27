import { useContext } from "react";
import {AuthContext} from "../context/auth.context"
import { Navigate } from "react-router-dom";
import LoadingPage from '../components/Loading';

const IsAnon = props => {
    const {isLoggedIn, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <LoadingPage />
    }

    if (isLoggedIn) {
        return <Navigate to={'/home'} />
    } else {
        return props.children
    }
}

export default IsAnon
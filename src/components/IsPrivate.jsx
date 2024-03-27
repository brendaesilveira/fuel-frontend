import { useContext } from "react";
import {AuthContext} from "../context/auth.context"
import { Navigate } from "react-router-dom";
import LoadingPage from '../components/Loading';

const IsPrivate = props => {
    const {isLoggedIn, isLoading} = useContext(AuthContext)

    if (isLoading) {
        <LoadingPage />
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    } else {
        return props.children
    }
}

export default IsPrivate
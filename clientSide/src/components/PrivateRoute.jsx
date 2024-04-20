import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"


const PrivateRoute = () => {

    const { currentUser } = useSelector((state) => state.user)

    return (
        <>
            {console.log("privateroute checking", currentUser)}
            {
                currentUser ? <Outlet /> : <Navigate to='/sign-up' />
            }
        </>
    )
}

export default PrivateRoute

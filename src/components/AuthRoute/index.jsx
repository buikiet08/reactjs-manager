import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

export const AuthRoute = ({ redirect = '/' }) => {
    const { user } = useAuth()
    console.log(user)
    const { state } = useLocation()
    if (user && user?.admin !== 1) {
        return <Navigate to={state?.redirect || redirect} />
    } else if(user && user?.admin === 1) {
        return <Navigate to={'/admin'} />
    }


    return <Outlet />
}
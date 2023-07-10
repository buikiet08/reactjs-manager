import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import Sidebar from "../Sidebar"
import Header from "../Header"

export const PrivateRoute = ({ redirect = '/' }) => {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to={redirect} />
    } else if(user?.admin === 1) {
        return <Navigate to={'/admin'} />
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full flex-1">
                <Header />
                <div className="py-[20px] px-[12px]">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
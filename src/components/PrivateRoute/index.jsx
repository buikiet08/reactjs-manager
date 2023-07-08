import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import Sidebar from "../Sidebar"
import Header from "../Header"

export const PrivateRoute = ({ redirect = '/' }) => {
    const { user } = useAuth()

    if (!user) return <Navigate to={redirect} />

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full flex-1">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}
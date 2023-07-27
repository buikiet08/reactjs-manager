import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import Sidebar from "../Sidebar"
import Header from "../Header"
import { useEffect } from "react"
import { notification } from "antd"
import { getDeleteCheckins } from "@/utils/token"

export const PrivateRoute = ({ redirect = '/' }) => {
    const { user } = useAuth()
    
    if (!user) {
        return <Navigate to={redirect} />
    } else if(user?.admin === 1) {
        return <Navigate to={'/admin'} />
    }
    
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="w-full flex-1">
                <Header />
                <div className="py-[20px] px-[12px] flex-1 overflow-y-auto h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
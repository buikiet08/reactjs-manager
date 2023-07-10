import { AdminRoute } from "@/components/AdminRoute";
import { AuthRoute } from "@/components/AuthRoute";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PATH } from "@/config/path";
import HomeAdmin from "@/pages/Admin";
import PersonnelAdmin from "@/pages/Admin/personnelAdmin";
import Register from "@/pages/Admin/register";
import Info from "@/pages/info";
import Login from "@/pages/login";
import Personnel from "@/pages/personnel";
import Team from "@/pages/team";
import { lazy } from "react";

const Home = lazy(() => import("@/pages"))
const ChangePassword = lazy(() => import('@/pages/changePassword'))
const Page404 = lazy(() => import("@/pages/404"))
const MainLayout = lazy(() => import("@/layouts/MainLayout"))

export const routers = [
    {
        element: <MainLayout />,
        children: [
            {
                element: <PrivateRoute redirect={'/login'} />,
                children:[
                    {
                        element:  <Home />,
                        index:true
                    },
                    {
                        element: <Personnel />,
                        path:'/nhan-su'
                    },
                    {
                        element: <Team />,
                        path:'/bo-phan'
                    },
                    {
                        element:<Info />,
                        path:'/thong-tin-ca-nhan'
                    },
                    {
                        element:<ChangePassword />,
                        path:'/doi-mat-khau'
                    }
                ],
                path:'/'
            },
            {
                element: <AdminRoute redirect={'/login'} />,
                children: [
                    {
                        index:true,
                        element: <HomeAdmin />
                    },
                    {
                        path:PATH.admin.personnel,
                        element:<PersonnelAdmin />
                    },
                    {
                        path:PATH.admin.resgiterUser,
                        element:<Register />
                    }
                ],
                path:'/admin'
            },
            {
                element : <AuthRoute redirect={'/'} />,
                children: [
                    {
                        path:'/login',
                        element :<Login />
                    }
                ]
            },
            {
                path: '*',
                element: <Page404 />
            }
        ]
    }
]
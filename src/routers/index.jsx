import { AuthRoute } from "@/components/AuthRoute";
import { PrivateRoute } from "@/components/PrivateRoute";
import Info from "@/pages/info";
import Login from "@/pages/login";
import Personnel from "@/pages/personnel";
import Team from "@/pages/team";
import { lazy } from "react";

const Home = lazy(() => import("@/pages"))
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
                    }
                ],
                path:'/'
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
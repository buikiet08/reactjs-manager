import { PATH } from '@/config/path';
import { getUser } from '@/utils/token'
import { BarChartOutlined, BellOutlined, BookOutlined, DashboardOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const subnav = [
    { title: "Nhân sự" },
    { title: "Bộ phận" },

];
const subnavAdmin = [
    { title: "Nhân sự" },
    { title: "Bộ phận" },
    { title: "Thông báo" },
    { title: "Đăng ký thành viên" },
    { title: "Thống kê" }
]
const pathLink = [
    { path: '/nhan-su' },
    { path: '/bo-phan' }
];
const pathLinkAdmin = [
    { path: PATH.admin.personnel },
    { path: PATH.admin.tean },
    { path: PATH.admin.notification },
    { path: PATH.admin.resgiterUser },
    { path: PATH.admin.statistical }
];
const items = [
    UserOutlined,
    BookOutlined

].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: subnav.map((item, i) => {
            return (
                <Link key={i} to={pathLink[index].path} className="pl-0">
                    {String(i + 1) === key && item.title}
                </Link>
            );
        }),
    };
});

const itemsAdmin = [
    UserOutlined,
    BookOutlined,
    BellOutlined,
    UsergroupAddOutlined,
    BarChartOutlined
].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: subnavAdmin.map((item, i) => {
            return (
                <Link key={i} to={pathLinkAdmin[index].path} className="pl-0">
                    {String(i + 1) === key && item.title}
                </Link>
            );
        }),
    };
});

function Sidebar() {
    const location = useLocation()
    const user = getUser()
    const lastName = user?.fullname?.split(" ").slice(-1)[0];
    const [pathCurrent, setPathCurrent] = useState(null)
    useEffect(() => {
        pathLink.forEach((item, idx) => {
            if (item.path === location.pathname) {
                setPathCurrent(`sub${idx + 1}`);
            }
        })
    }, [location.pathname])
    return (
        <div className='w-[250px] bg-[#2a3042] h-screen overflow-hidden flex flex-col'>
            <div className='h-[70px] flex justify-center items-center'>
                <p className='text-xl font-semibold text-white'>Hi, {lastName}</p>
            </div>

            <div className='flex-1'>
                <div className='py-[20px] px-[26px] text-white'>
                    <Link to={user?.admin === 0 ? '/' : '/admin'} className='flex items-center font-bold leading-5'><DashboardOutlined className='text-lg mr-3' /> Dashboards</Link>
                </div>
                <Menu
                    mode='inline'
                    selectedKeys={[pathCurrent]}
                    defaultOpenKeys={["sub1"]}
                    style={{
                        height: "100%",
                        borderRight: 0,
                        background: "transparent",
                        color: " #fff",
                    }}
                    items={user?.admin === 0 ? items : itemsAdmin}
                />
            </div>
        </div>
    )
}

export default Sidebar
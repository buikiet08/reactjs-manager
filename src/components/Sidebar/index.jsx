import { getUser } from '@/utils/token'
import { BookOutlined, DashboardOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
const subnav = [
    { title: "Nhân sự" },
    { title: "Bộ phận" },

];
const pathLink = [
    { path: '/nhan-su' },
    { path: '/bo-phan' },

];
const items2 = [
    UserOutlined,
    BookOutlined,
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

function Sidebar() {
    const location = useLocation()
    const { fullname } = getUser()
    const lastName = fullname?.split(" ").slice(-1)[0];
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
                    <Link to={'/'} className='flex items-center font-bold leading-5'><DashboardOutlined className='text-lg mr-3' /> Dashboards</Link>
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
                    items={items2}
                />
            </div>
        </div>
    )
}

export default Sidebar
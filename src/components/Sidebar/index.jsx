import { PATH } from '@/config/path';
import { getUser } from '@/utils/token'
import { BarChartOutlined, BellOutlined, BookOutlined, CheckCircleOutlined, DashboardOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const subnav = [
    { title: "Nhân sự", path: '/nhan-su', icon: <UserOutlined /> },
    { title: "Bộ phận", path: '/bo-phan', icon: <BookOutlined /> },
    { title: "Chuyên cần", path: '/chuyen-can', icon: <CheckCircleOutlined /> }
];
const subnavAdmin = [
    { title: "Nhân sự", path: PATH.admin.personnel, icon: <UserOutlined /> },
    { title: "Bộ phận", path: PATH.admin.tean, icon: <BookOutlined /> },
    { title: "Thông báo", path: PATH.admin.notification, icon: <BellOutlined /> },
    { title: "Đăng ký thành viên", path: PATH.admin.resgiterUser, icon: <UsergroupAddOutlined /> },
    { title: "Thống kê", path: PATH.admin.statistical, icon: <BarChartOutlined /> }
]

function Sidebar() {
    const { pathname } = useLocation()
    const user = getUser()
    const lastName = user?.fullname?.split(" ").slice(-1)[0];
    return (
        <div className='w-[250px] bg-[#2a3042] h-screen overflow-hidden flex flex-col'>
            <div className='h-[70px] flex justify-center items-center'>
                <p className='text-xl font-semibold text-white'>Hi, {lastName}</p>
            </div>

            <div className='flex-1'>
                <div className='py-[20px] px-[26px] text-white'>
                    <Link to={user?.admin === 0 ? '/' : '/admin'} className='flex items-center font-bold leading-5'><DashboardOutlined className='text-lg mr-3' /> Dashboards</Link>
                </div>
                <div className='py-5 px-2 flex flex-col gap-2 justify-start items-start'>
                    {
                        (user?.admin === 0 ? subnav : subnavAdmin).map((i, index) => (
                            <Link
                                key={index}
                                to={i.path}
                                className={`text-white w-full flex items-center gap-3 px-[18px] py-2 rounded-md hover:bg-slate-600 ${pathname == i.path && 'bg-white hover:bg-white !text-gray-600'}`}
                            >{i.icon} {i.title}</Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar
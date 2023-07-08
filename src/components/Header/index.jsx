import { SearchOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import Field from '../Field'
import { Avatar, Button, Popover, Tooltip } from 'antd'
import { getUser } from '@/utils/token'
import { Link } from 'react-router-dom'

function Header() {
    const user = getUser()
    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    return (
        <div className='h-[70px] bg-white flex justify-between items-center px-[24px]'>
            {/* search */}
            <div className='bg-[#ced4da] rounded-[30px] py-1 px-4 flex items-center'>
                <SearchOutlined className='text-[#495057] mr-2 cursor-pointer text-lg' />
                <Field placeholder='Search...' />
            </div>
            <div className='flex items-center gap-2'>
                <Button type="primary" shape="round" size={'medium'} className='bg-[#1677ff]'>
                    Check in
                </Button>
                <Button type="primary" shape="round" size={'medium'} className='bg-[#1677ff]'>
                    Check out
                </Button>
                <div className='flex items-center ml-10'>
                    <div className='mr-3 flex justify-end flex-col items-end'>
                        <p>{user?.fullname}</p>
                        <p className='font-semibold text-xs text-[#1677ff]'>{user?.title_name}</p>
                    </div>
                    <Popover
                        content={<div className='flex flex-col'>
                            <Link to='/thong-tin-ca-nhan' className='py-[6px]'>Thông tin cá nhân</Link>
                            <Link className='py-[6px]'>Đổi mật khẩu</Link>
                            <Link className='py-[6px] text-red-600 hover:text-red-700'>Đăng xuất</Link>
                        </div>}
                        title=""
                        trigger="click"
                        open={open}
                        onOpenChange={handleOpenChange}
                    >
                        <Tooltip title={user?.title_level}>
                            <Avatar size={'large'} src={<img src={'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'} alt="avatar" />} />
                        </Tooltip>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default Header
import { Avatar } from 'antd'
import React from 'react'
import { Skeleton } from '../Skeleton'
import { UserOutlined } from '@ant-design/icons'
import { PATH } from '@/config/path'
import { Link, generatePath } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { urlFile } from '@/config/api'

export const PersonalCard = ({id,avatar, fullname, title_name,showCreatae}) => {
    const {user} = useAuth()
    let path
    if(user?.admin === 1) {
        path = generatePath(PATH.admin.personnelDetail, { id })
    } else {
        path = generatePath(PATH.detail, {id})
    }
    return (
        <div className='bg-white p-3 cursor-pointer flex justify-between items-center rounded-md gap-2 flex-1 w-full border border-solid border-gray-100'>
            <Link to={path}>
                <Avatar
                    size={{
                        md: 36,
                        lg: 36,
                        xl: 44,
                    }}
                    src={<img src={avatar ? urlFile(avatar) : 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'} alt="avatar" />}
                />
            </Link>
            <div className='flex flex-col justify-center items-start flex-1'>
                <Link to={path} className="font-bold text-sm">{fullname}</Link>
                <div className='flex justify-start items-center text-[#fa6342] text-sm'><UserOutlined className='mr-2 text-xs leading-[9px]' /> {title_name}</div>
            </div>
            {
                showCreatae &&
                <div>{create_date}</div>
            }
        </div>
    )
}

export const PersonalCardLoading = () => {
    return (
        <div className='bg-white p-3 flex justify-between items-center rounded-md gap-2 w-full flex-1 border border-solid border-gray-100'>
            <div>
                <Skeleton width={44} height={44} className='rounded-full' />
            </div>
            <div className='flex flex-col justify-center items-start flex-1'>
                <Skeleton width='70%' height={10} />
                <br />
                <Skeleton width='20%' height={10} />
            </div>
        </div>
    )
}

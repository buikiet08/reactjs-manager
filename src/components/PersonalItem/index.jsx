import { avatarDefault, urlFile } from '@/config/api'
import { PATH } from '@/config/path'
import { EyeOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Row, Tooltip } from 'antd'
import React from 'react'
import { Link, generatePath } from 'react-router-dom'

function PersonalItem({ id, index, avatar, fullname, title_name, title_level, phone, username, create_at, create_date, detail }) {
    const path = generatePath(PATH.admin.personnelDetail, { id })

    return (
        <Row className='py-3 bg-white'>
            <Col className='flex justify-center items-center' span={1}>{index}</Col>
            <Col className='text-start' span={5}>
                <Avatar
                    size={{
                        md: 36,
                        lg: 40,
                        xl: 44,
                    }}
                    className='mr-2'
                    src={<img src={avatar ? urlFile(avatar) : avatarDefault} alt="avatar" />}
                />
                {fullname}
            </Col>
            <Col className='flex justify-center items-center' span={3}>{title_name}</Col>
            {
                !detail &&
                <Col className='flex justify-center items-center' span={3}>{title_level}</Col>
            }
            <Col className='flex justify-center items-center' span={3}>{phone == "" ? 'Chưa cập nhật' : phone}</Col>
            <Col className='flex justify-center items-center' span={4}>{username}</Col>
            <Col className='flex justify-center items-center' span={3}>{create_at}</Col>
            <Col className='flex justify-center items-center' span={2}>{create_date}</Col>
            {
                detail &&
                <Col span={3} className='flex justify-center items-center gap-2'>
                    <Tooltip title='Chi tiết'><Link to={path}><EyeOutlined /></Link></Tooltip>
                </Col>
            }
        </Row>
    )
}

export default PersonalItem
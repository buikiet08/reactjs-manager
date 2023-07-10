import { Button, Col, Row } from 'antd'
import React from 'react'

function PersonalItem({index,fullname,title_name,phone,username,create_at, total_day, onOpendetail}) {
    return (
        <Row className='py-3 bg-white'>
            <Col className='text-center' span={2}>{index}</Col>
            <Col className='text-center' span={4}>{fullname}</Col>
            <Col className='text-center' span={2}>{title_name}</Col>
            <Col className='text-center' span={3}>{phone == ""? 'Chưa cập nhật': phone}</Col>
            <Col className='text-center' span={3}>{username}</Col>
            <Col className='text-center' span={3}>{create_at}</Col>
            <Col className='text-center' span={2}>{total_day}</Col>

            <Col span={5} className='flex justify-center items-center gap-2'>
                <Button onClick={onOpendetail} type='primary' shape="round" size={'medium'} className='bg-[#1677ff]'>Chi tiết</Button>
                {/* <Button type='primary' shape="round" size={'medium'} className='bg-[#f0c92cc6] !hover:bg-[#f0c92cc6]'>Nhắc nhở</Button>
                <Button type='primary' shape="round" size={'medium'} className='bg-[#8e8f90] !hover:bg-[#8e8f90]'>Khóa tài khoản</Button>
                <Button type='primary' shape="round" size={'medium'} className='bg-red-500 !hover:bg-red-500'>Xóa ài khoản</Button> */}
            </Col>
        </Row>
    )
}

export default PersonalItem
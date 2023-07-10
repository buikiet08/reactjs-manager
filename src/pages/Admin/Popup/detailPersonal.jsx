import { useQuery } from '@/hooks/useQuery'
import { personalService } from '@/services/personal'
import { AntDesignOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Modal, Row, Spin } from 'antd'
import React from 'react'

function DetailPersonal({onCancel, open, id}) {
    console.log(id)
    const { data: detailUser, loading: loadingDetaiUser } = useQuery({
        keepPrivousData: true,
        queryFn: ({ signal }) => personalService.getPersonal(id, signal),
        dependencyList: [id]
    })
    return (
        <Modal onCancel={onCancel} open={open} title='Chi tiết' footer={false}>
            <Spin spinning={open || loadingDetaiUser}>
                <Row>
                    <Col span={12}>
                        <Avatar
                            size={{
                                md: 40,
                                lg: 64,
                                xl: 80,
                                xxl: 100,
                            }}
                            icon={<AntDesignOutlined />}
                        />
                    </Col>
                    <Col span={12}>
                        <ul>
                            <li>Họ và tên: {detailUser?.data.fullname}</li>
                            <li>Email: {detailUser?.data.username}</li>
                            <li>Số điện thoại: {detailUser?.data.phone == '' ? 'Chưa cập nhật' : detailUser?.data.phone}</li>
                            <li>Bộ phận: {detailUser?.data.title_team}</li>
                            <li>Cấp bậc: {detailUser?.data.title_level}</li>
                            <li>Ngày vào làm: {detailUser?.data.create_at}</li>
                            <li>Thâm niên: 100</li>
                        </ul>
                    </Col>
                </Row>
            </Spin>
            <div>
                <Button type='primary' shape="round" size={'medium'} className='bg-[#f0c92cc6] !hover:bg-[#f0c92cc6]'>Nhắc nhở</Button>
                <Button type='primary' shape="round" size={'medium'} className='bg-[#8e8f90] !hover:bg-[#8e8f90]'>Khóa tài khoản</Button>
                <Button type='primary' shape="round" size={'medium'} className='bg-red-500 !hover:bg-red-500'>Xóa tài khoản</Button>
            </div>
        </Modal>
    )
}

export default DetailPersonal
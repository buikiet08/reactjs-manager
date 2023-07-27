import { useAsync } from '@/hooks/useAsync'
import { personalService } from '@/services/personal'
import { RiseOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Col, Row, Spin, Typography } from 'antd'
import React, { useEffect} from 'react'
import { useParams } from 'react-router-dom'
function InfoPersonal() {
    const { id } = useParams()
    const {data:dataInfo, loading,excute } = useAsync(() => personalService.getPersonal(parseInt(id)), [parseInt(id)])
    useEffect(() => {
        excute()
    }, [parseInt(id)])
    const data = dataInfo?.data
    const avatarDefault = 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'
    return (
        <main className="pb-[60px]">
            <Spin spinning={loading}>
                <Row>
                    <Col span={16} className=''>

                        <div className='bg-white rounded-xl p-3 shadow-sm flex gap-3' style={{ backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'right center', backgroundImage: 'url(http://skote.vuejs-light.themesbrand.com/img/img-1.5ae3905c.png' }}>
                            <Avatar
                                size={{
                                    md: 36,
                                    lg: 84,
                                    xl: 100,
                                }}
                                src={<img src={data?.avatar ? `http://localhost:3001/images/${data?.avatar}` : avatarDefault} alt="avatar" />}
                            />
                            <div className='flex flex-col justify-between'>
                                <div>
                                    <Typography.Title level={3} className='!mb-1'>{data?.fullname}</Typography.Title>
                                    <div className='flex items-center gap-4'>
                                        <Typography.Text className='flex justify-start items-center text-[#fa6342] font-bold'><UserOutlined className='mr-2' /> {data?.title_name}</Typography.Text>
                                        {data?.title_level && <Typography.Text className='flex justify-start items-center text-[#fa6342] font-bold'><RiseOutlined className='mr-2' /> {data?.title_level}</Typography.Text>}
                                    </div>
                                </div>
                                <ul className='flex justify-between items-center gap-6 flex-wrap mt-4'>
                                    <li>
                                        <b>Ngày vào làm</b>
                                        <p>{data?.create_at}</p>
                                    </li>
                                    <li>
                                        <b>Thâm niên</b>
                                        <p>{data?.create_date}</p>
                                    </li>
                                    <li>
                                        <b>Đăng nhập lần cuối</b>
                                        <p>{data?.update_at}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='flex justify-start items-start gap-3'>
                            <div className='bg-white rounded-xl p-3 shadow-sm min-h-[200px] mt-3 auth flex-1'>
                                <Typography.Title level={4} className='border-b border-b-gray-300'>Thông tin cá nhân</Typography.Title>
                                <div className="ct_login wrap !m-0 !p-0 !bg-white !max-w-full">
                                    <div className='mb-4 p-3 text-base min-h-[46px] border border-solid border-gray-200 rounded-lg flex justify-start items-start'>
                                        <label className='mr-2 font-medium whitespace-nowrap'>Họ Tên:</label>{data?.fullname}
                                    </div>
                                    <div className='mb-4 p-3 text-base min-h-[46px] border border-solid border-gray-200 rounded-lg flex justify-start items-start'>
                                        <label className='mr-2 font-medium'>Email:</label>{data?.username}
                                    </div>
                                    <div className='mb-4 p-3 text-base min-h-[46px] border border-solid border-gray-200 rounded-lg flex justify-start items-start'>
                                        <label className='mr-2 font-medium'>Ngày sinh:</label> {data?.date == 'Invalid date' ? <span className='text-gray-400'>Chưa cập nhật</span> : data?.date}
                                    </div>
                                    <div className='mb-4 p-3 text-base min-h-[46px] border border-solid border-gray-200 rounded-lg flex justify-start items-start'>
                                        <label className='mr-2 font-medium'>Số điện thoại:</label> {data?.phone ? data?.phone : <span className='text-gray-400'>Chưa cập nhật</span>}
                                    </div>
                                    <div className='mb-4 p-3 text-base min-h-[46px] border border-solid border-gray-200 rounded-lg flex justify-start items-start'>
                                        <label className='mr-2 font-medium whitespace-nowrap'>Địa chỉ:</label> {data?.address ? data?.address : <span className='text-gray-400'>Chưa cập nhật</span>}
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white rounded-xl p-3 shadow-sm  mt-3 auth flex-1'>
                                <Typography.Title level={4} className='border-b border-b-gray-300'>Thông tin khác</Typography.Title>
                                <div className="flex justify-center items-center h-full min-h-[290px]">
                                    không có thông tin
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={8} className='pl-3'>
                        <div className='bg-white rounded-xl p-3 shadow-sm flex-1'>
                            <Typography.Title level={4} className='border-b border-b-gray-300'>Sự kiện</Typography.Title>
                            <div className="flex justify-center items-center h-full min-h-[442px] ">
                                không có sự kiện
                            </div>
                        </div>
                    </Col>
                </Row>
            </Spin>
        </main >
    )
}

export default InfoPersonal
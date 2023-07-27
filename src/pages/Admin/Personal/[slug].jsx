import Button from '@/components/Button'
import { useAsync } from '@/hooks/useAsync'
import { personalService } from '@/services/personal'
import { AntDesignOutlined, RiseOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Col, DatePicker, Row, Spin, Typography } from 'antd'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function DetailPersonal() {
    const { id } = useParams()
    const [month, setMonth] = useState(null)
    const currentDateTime = moment().format('MM-YYYY')
    const { data: detailUser, loading: loadingInfo, excute: excuteInfo } = useAsync(() => personalService.getPersonal(parseInt(id)), [parseInt(id)])
    useEffect(() => {
        excuteInfo()
    }, [parseInt(id)])

    const { data, loading, excute } = useAsync(() => personalService.getCheckinPersonalByTime(id, month === null ? currentDateTime.split('-')[0] : month?.split('-')[1], month === null ? currentDateTime.split('-')[1] : month?.split('-')[0]),
        [month])
    useEffect(() => {
        excute()
    }, [month,parseInt(id)])
    const onChange = (date, dateString) => {
        setMonth(dateString)
    };
    return (
        <main className="pb-[60px]">
            <Spin spinning={loadingInfo}>
                <Row>
                    <Col span={8} className='flex flex-col gap-4'>
                        <div className='relative rounded-md bg-white shadow-sm overflow-hidden'>
                            <div style={{ height: 120, padding: 12, backgroundRepeat: 'no-repeat', backgroundSize: '100%', backgroundImage: 'url(https://img.freepik.com/free-photo/businessman-pointing-his-presentation-futuristic-digital-screen_53876-102617.jpg?w=2000)' }}>
                                <Typography.Title level={4} className='!mb-1'>{detailUser?.data.fullname}</Typography.Title>
                                <div className='flex items-center gap-4'>
                                    <Typography.Text className='flex justify-start items-center text-[#fa6342] font-bold'><UserOutlined className='mr-2' /> {detailUser?.data.title_name}</Typography.Text>
                                    <Typography.Text className='flex justify-start items-center text-[#fa6342] font-bold'><RiseOutlined className='mr-2' /> {detailUser?.data.title_level}</Typography.Text>
                                </div>

                            </div>
                            <div className='p-3 pt-[44px]'>
                                <ul className='flex justify-between items-center gap-2 flex-wrap'>
                                    <li>
                                        <b>Ngày vào làm</b>
                                        <p>{detailUser?.data?.create_at}</p>
                                    </li>
                                    <li>
                                        <b>Thâm niên</b>
                                        <p>{detailUser?.data?.create_date}</p>
                                    </li>
                                    <li>
                                        <b>Đăng nhập lần cuối</b>
                                        <p>{detailUser?.data?.update_at}</p>
                                    </li>
                                </ul>
                            </div>

                            <Avatar
                                size={{
                                    lg: 74,
                                    xl: 96,
                                }}
                                className='border-[4px] border-solid border-white shadow-sm absolute left-4 top-[64px]'
                                src={<img src={'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'} alt="avatar" />}
                            />
                        </div>
                        <div className='relative rounded-md bg-white shadow-sm overflow-hidden p-3'>
                            <Typography.Title level={4}>Thông tin cá nhân</Typography.Title>
                            <ul className='flex flex-col gap-1'>
                                <li className='flex items-center gap-4 py-2 border-b border-solid border-b-gray-100'>
                                    <label className='font-bold'>Họ Tên:</label>
                                    <span>{detailUser?.data.fullname}</span>
                                </li>
                                <li className='flex items-center gap-4 py-2 border-b border-solid border-b-gray-100'>
                                    <label className='font-bold'>Email:</label>
                                    <span>{detailUser?.data.username}</span>
                                </li>
                                <li className='flex items-center gap-4 py-2 border-b border-solid border-b-gray-100'>
                                    <label className='font-bold'>Số điện thoại:</label>
                                    <span>{detailUser?.data.phone == '' ? 'Chưa cập nhật' : detailUser?.data.phone}</span>
                                </li>
                                <li className='flex items-center gap-4 py-2 border-b border-solid border-b-gray-100'>
                                    <label className='font-bold'>Địa chỉ:</label>
                                    <span>{detailUser?.data?.address ? 'Chưa cập nhật' : detailUser?.data?.address}</span>
                                </li>
                            </ul>
                        </div>
                        <div className='relative rounded-md bg-white shadow-sm overflow-hidden p-3 min-h-[200px]'>
                            <Typography.Title level={4}>Thông tin khác</Typography.Title>
                        </div>
                    </Col>
                    <Col span={16} className='px-3'>
                        <div className='relative rounded-md bg-white shadow-sm overflow-hidden p-3 '>
                            <div className='flex justify-between items-center mb-4'>
                                <Typography.Title className='!mb-0' level={5}>Checkins của `{detailUser?.data.fullname}` trong tháng `{month ? moment(month, 'YYYY-MM').format('MM-YYYY') : currentDateTime}`</Typography.Title>
                                <DatePicker style={{ minWidth: 140, height: 30 }} className='pl-2' bordered={false} onChange={onChange} placeholder='Chọn tháng' picker="month" />

                            </div>
                            <Row className='py-3 bg-[#1677ff] w-full mb-2'>
                                <Col className='text-center font-bold text-white' span={12}>Ngày checkin <span className='bg-white rounded-full p-1 text-gray-500 text-xs'>{data?.data.length} ngày</span></Col>
                                <Col className='text-center font-bold text-white' span={6}>Thời gian checkin trễ</Col>
                                <Col className='text-center font-bold text-white' span={6}>Thời gian checkout sớm</Col>
                            </Row>
                            <Spin spinning={loading}>
                                <div className='min-h-[200px] max-h-[300px] overflow-y-auto'>
                                    {
                                        data?.data.length === 0 ? <div className='w-full h-full flex justify-center items-center min-h-[200px] text-gray-400'>`{detailUser?.data.fullname}` chưa checkin trong tháng này</div> :
                                            data?.data.map((i, index) => (
                                                <Row key={i.id} className='mb-3'>
                                                    <Col span={12} className='py-1 px-4 rounded-lg bg-slate-100 text-center font-bold'>{i.checkin_date == moment().format('DD-MM-YYYY') ? 'Hôm nay' : i.checkin_date}</Col>
                                                    <Col span={6} className='text-center'>{i.time_late.split(':')[0] != '00' && i.time_late.split(':')[0] + 'giờ'} {i.time_late.split(':')[1] + 'phút'}</Col>
                                                    {
                                                        i.time_out ?
                                                            <Col span={6} className='text-center'>{i.time_out.split(':')[0] != '00' && i.time_out.split(':')[0] + 'giờ'} {i.time_out.split(':')[1] + 'phút'}</Col> :
                                                            <Col span={6} className='text-center'>Chưa checkout</Col>
                                                    }
                                                </Row>
                                            ))
                                    }
                                </div>
                            </Spin>
                        </div>
                        <div className='flex justify-end items-center gap-4 mt-3'>
                            <Button className='p-2 !h-[36px]'>Nhắc nhỡ</Button>
                            <Button className='p-2 !h-[36px]'>Khóa tài khoản</Button>
                            <Button className='p-2 !h-[36px]'>Xóa tài khoản</Button>
                        </div>
                    </Col>
                </Row>
            </Spin>
        </main>
    )
}

export default DetailPersonal
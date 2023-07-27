import { useAuth } from '@/hooks/useAuth'
import { useDayInMonth } from '@/hooks/useDayInMonth'
import { useQuery } from '@/hooks/useQuery'
import { useUser } from '@/hooks/useUser'
import { userService } from '@/services/user'
import { Col, Row, Spin, Typography } from 'antd'
import React from 'react'

function Checkins() {
    const days = useDayInMonth()
    const { user: dataCheckin } = useUser()
    const { user } = useAuth()
    const { data, loading } = useQuery({
        keepPrivousData: true,
        queryFn: () => userService.getCheckinByMonth(user?.id),
        dependencyList: [dataCheckin]
    })
    const listDays = data?.data.map(i => i.checkin_date)
    const checkTimeCheckin = (item) => {
        const res = data?.data.filter(i => i.checkin_date == item && i?.checkin_time)[0]
        return res
    }
    const checkTimeCheckout = (item) => {
        const res = data?.data.filter(i => i.checkin_date == item && i?.checkout_time)[0]
        return res
    }
    return (
        <div className='flex flex-col gap-[1px] pb-[60px]'>
            <Typography.Title level={3} className='text-center'>Danh sách ngày trong tháng</Typography.Title>

            <Spin spinning={loading} >
                <div className='flex flex-col'>
                    <Row className='py-3 bg-[#1677ff] w-full'>
                        <Col className='text-center font-bold text-white flex justify-center items-center' span={12}>Thời gian làm việc trong ngày</Col>
                        <Col className='text-center font-bold text-white' span={12}>Đánh giá
                            <Row className='mt-1'>
                                <Col span={12}>Thời gian Checkin trễ</Col>
                                <Col span={12}>Thời gian Checkout sớm</Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='h-full max-h-[430px] overflow-y-auto flex-1 pb-4'>
                        <Col span={12} className='flex justify-center'>
                            <ul className='flex flex-col gap-[1px] pt-2 w-full'>
                                {
                                    days.map((item, index) => (
                                        <li key={index} className='flex items-center max-w-[500px] bg-white py-2 justify-center'>
                                            <p className={`relative py-1 px-4 rounded-lg bg-slate-300 mr-2 min-w-[182px] text-center 
                                        ${checkTimeCheckin(item)?.checkin_time && '!bg-green-500 text-white'}`}>
                                                {listDays?.includes(item) ?
                                                    checkTimeCheckin(item)?.checkin_time :
                                                    `${item} 08:00`
                                                }

                                            </p> -
                                            <p className={`relative py-1 px-4 rounded-lg bg-slate-300 ml-2 min-w-[182px] text-center 
                                        ${checkTimeCheckout(item)?.checkout_time && '!bg-green-500 text-white'}`}>
                                                {listDays?.includes(item) && checkTimeCheckout(item)?.checkout_time ?
                                                    checkTimeCheckout(item).checkout_time :
                                                    `${item} 17:00`
                                                }

                                            </p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Col>
                        <Col span={12} className='flex justify-center '>
                            <ul className='flex flex-col gap-[1px] pt-2 w-full'>
                                {
                                    days.map((item, index) => (
                                        <li key={index} className='flex items-center py-2 px-4 min-h-[45px] w-full bg-white'>
                                            <Row className='w-full'>
                                                <Col className='flex justify-center' span={12}>
                                                    {listDays?.includes(item) &&
                                                        checkTimeCheckin(item)?.time_late &&
                                                        <span className=' text-gray-700 mr-1'>
                                                            {checkTimeCheckin(item)?.time_late.split(':')[0] != '00' && checkTimeCheckin(item)?.time_late.split(':')[0] + ' giờ'} {checkTimeCheckin(item)?.time_late.split(':')[1]} phút
                                                        </span>
                                                    }
                                                </Col>
                                                <Col className='flex justify-center' span={12}>
                                                    {
                                                        listDays?.includes(item) &&
                                                        checkTimeCheckin(item)?.time_out &&
                                                        <span className=' text-gray-700'>
                                                            {checkTimeCheckin(item)?.time_out.split(':')[0] != '00' && checkTimeCheckin(item)?.time_out.split(':')[0] + ' giờ'} {checkTimeCheckin(item)?.time_out.split(':')[1]} phút
                                                        </span>

                                                    }
                                                </Col>
                                            </Row>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Col>
                    </Row>
                </div>
            </Spin>
        </div>
    )
}

export default Checkins
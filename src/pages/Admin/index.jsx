import { HddOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import React from 'react'
import Chart from 'react-apexcharts'
import { CartItem } from './styles'

function HomeAdmin() {
    const state = {
        options: {
            chart: {
                id: 'apexchart-example'
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        },
        series: [{
            name: 'series-1',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        }]
    }
    return (
        <div>
            <Typography.Title className='text-[#85849d]' level={3}>Dashboard</Typography.Title>
            <div className='flex justify-between items-center gap-5'>
                <CartItem className='flex-1'>
                    <Typography className='flex-1'>
                        <Typography.Title className='text-[#85849d]' level={5}>Nhân sự</Typography.Title>
                        <Typography.Text className='text-2xl font-bold'>100</Typography.Text>
                    </Typography>
                    <div className='w-[48px] h-[48px] bg-[#556ee6] flex justify-center items-center rounded-full'>
                        <UserOutlined className='text-white' />
                    </div>
                </CartItem>
                <CartItem className='flex-1'>
                    <Typography className='flex-1'>
                        <Typography.Title className='text-[#85849d] ' level={5}>Bộ phận</Typography.Title>
                        <Typography.Text className='text-2xl font-bold'>8</Typography.Text>
                    </Typography>
                    <div className='w-[48px] h-[48px] bg-[#556ee6] flex justify-center items-center rounded-full'>
                        <HddOutlined className='text-white' />
                    </div>
                </CartItem>
                <CartItem className='flex-1'>
                    <Typography className='flex-1'>
                        <Typography.Title className='text-[#85849d]' level={5}>Thành viên mới</Typography.Title>
                        <Typography.Text className='text-2xl font-bold'>2</Typography.Text>
                    </Typography>
                    <div className='w-[48px] h-[48px] bg-[#556ee6] flex justify-center items-center rounded-full'>
                        <UserAddOutlined className='text-white' />
                    </div>
                </CartItem>
            </div>
            <div className='mt-4 pb-[60px]'>
                <Chart options={state.options} series={state.series} type="bar" width={'100%'} height={520} />
            </div>
        </div>
    )
}

export default HomeAdmin
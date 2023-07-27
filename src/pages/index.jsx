import { useQuery } from "@/hooks/useQuery"
import { personalService } from "@/services/personal"
import { HddOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Col, Row, Spin, Typography, notification } from "antd"
import Chart from 'react-apexcharts'
import { CartItem } from "./Admin/styles"
import { reportService } from "@/services/report"
import { getDeleteCheckins } from "@/utils/token"
import { useEffect } from "react"
export const Home = () => {
  const { data, loading } = useQuery({
    queryFn: () => personalService.getPersonalNew(),
    keepPrivousData: true,
    dependencyList: []
  })
  const { data: dataReportTeams, loading: loadingReportTeams } = useQuery({
    queryFn: () => reportService.getReportTeams(),
    keepPrivousData: true,
    dependencyList: []
  })
  const { data: dataRangerCheckin, loading: loadingRangerCheckin } = useQuery({
    queryFn: () => reportService.rangerCheckins(),
    keepPrivousData: true,
    dependencyList: []
  })
  const checkin_days = dataRangerCheckin?.data?.map(i => i.checkin_count)
  const checkin_name = dataRangerCheckin?.data?.map(i => i.fullname)
  const state = {
    options: {
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: checkin_name
      }
    },
    series: [{
      name: 'Ngày làm trong tháng',
      data: checkin_days
    }]
  }
  // useEffect(() => {
  //     notification.open({
  //         message: 'Thông báo',
  //         description:getDeleteCheckins(),
  //         duration:0
  //     });
  // }, [getDeleteCheckins()])
  return (
    <Row className="pb-[60px]">
      <Col span={16} className="pr-4">
        <div className='flex justify-between items-center gap-5 mb-6'>
          {
            dataReportTeams?.data.map((i, index) => (
              <CartItem className='flex-1' key={index}>
                <Typography className='flex-1'>
                  <Typography.Title className='text-[#85849d]' level={5}>{i.title}</Typography.Title>
                  <Typography.Text className='text-2xl font-bold'>{i.count}</Typography.Text>
                </Typography>
                <div className='w-[48px] h-[48px] bg-[#556ee6] flex justify-center items-center rounded-full'>
                  {index === 0 && <UserOutlined className='text-white' />}
                  {index === 1 && <HddOutlined className='text-white' />}
                  {index === 2 && <UserAddOutlined className='text-white' />}
                </div>
              </CartItem>
            ))
          }
        </div>
        <Spin spinning={loadingRangerCheckin}>
          <Chart options={state.options} series={state.series} type="bar" width={'100%'} height={440} />
        </Spin>
      </Col>
      <Col span={8} className="flex flex-col gap-4">
        <div className="bg-white rounded-sm flex-1 flex flex-col">
          <div className="w-full p-2 border-b border-solid border-b-gray-200">
            <Typography.Title level={4} className="!mb-0 !tex-center">Thông báo</Typography.Title>
          </div>
          <div className="p-2 flex-1 flex justify-center items-center overflow-y-auto h-full max-h-[215px] text-gray-400">
            không có thông báo
          </div>
        </div>
        <div className="bg-white rounded-sm flex-1 h-full overflow-hidden">
          <div className="w-full p-2 border-b border-solid border-b-gray-200 flex flex-col">
            <Typography.Title level={4} className="!mb-0 !tex-center">Nhân sự mới</Typography.Title>
          </div>
          <div className="p-2 flex-1 overflow-y-auto h-full max-h-[215px] relative">
            {
              data?.data?.length === 0 && <div className="absolute top-[50%] left-1/2 translate-x-[-50%] text-gray-400">Danh sách trống</div>
            }
            <Spin spinning={loading}>
              {
                data?.data.map((i, index) => (
                  <div className='bg-white p-3 flex justify-between items-center rounded-md gap-2 mb-2 border border-solid border-gray-100' key={i.id}>
                    <div>
                      <Avatar
                        size={{
                          md: 36,
                          lg: 36,
                          xl: 44,
                        }}
                        src={<img src={'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'} alt="avatar" />}
                      />
                    </div>
                    <div className='flex flex-col justify-center items-start flex-1'>
                      <div className="font-bold text-sm">{i.fullname}</div>
                      <div className='flex justify-start items-center text-[#fa6342] text-sm'><UserOutlined className='mr-2 text-xs leading-[9px]' /> {i.title_name}</div>
                    </div>
                    <div>{i?.create_date}</div>
                  </div>
                ))
              }
            </Spin>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default Home
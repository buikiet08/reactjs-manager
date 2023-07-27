import Button from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { useQuery } from '@/hooks/useQuery'
import { personalService } from '@/services/personal'
import { Avatar, Typography } from 'antd'
import React from 'react'
const listCategory = ['Ban lãnh đạo', 'Nhân sự', 'BackEnd', 'FrontEnd', 'Devops', 'Tester', 'PA', 'QC']
function Team() {
  const { data, loading } = useQuery({
    keepPrivousData: true,
    queryFn: () => personalService.getListPersonalByTeam(),
    dependencyList: []
  })
  const checkUserTeam = (item) => {
    const res = data?.data.filter(i => i.id_team == item)[0]
    return res
  }
  return (
    <main className="homepage !pt-0" id="main">
      <div className="auth !max-w-full">
        <div className="wrap !max-w-full !bg-white !p-0">
          <div className='p-4 flex gap-4 flex-wrap'>
            {
              listCategory.map((i, index) => (
                <div key={index} className='p-4 border border-solid border-gray-200 rounded-xl flex items-start gap-2 min-w-[316px]'>
                  <Avatar
                    size={{
                      md: 40,
                      lg: 84,
                      xl: 130,
                      xxl: 180,
                    }}
                    src={<img src={'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'} alt="avatar" />}
                  />
                  <div className='flex-1'>
                    <Typography.Title level={3}>{i}</Typography.Title>
                    <p>{checkUserTeam(index + 1)?.user_count || 0} thành viên</p>
                    <Button className='p-1 !h-[36px]'>Xem chi tiết</Button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default Team
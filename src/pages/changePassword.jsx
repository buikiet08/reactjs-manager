import Button from '@/components/Button'
import Field from '@/components/Field'
import { useForm } from '@/hooks/useForm'
import { useQuery } from '@/hooks/useQuery'
import { userService } from '@/services/user'
import { handleError } from '@/utils/handleError'
import { getUser } from '@/utils/token'
import { confirm, minMax, regexp, required } from '@/utils/validate'
import { Col, Row, Typography, message } from 'antd'
import React from 'react'

function changePassword() {
  const user = getUser()
  const form = useForm({
    oldPassword: [required(), regexp('password'), minMax(6, 22, 'Mật khẩu tối thiểu 6 kí tự và tối đa 22 kí tự')],
    newPassword: [required(), regexp('password'), minMax(6, 22, 'Mật khẩu tối thiểu 6 kí tự và tối đa 22 kí tự')],
    confirmPassword: [required(), confirm('newPassword')],
  }, {
    dependencies: {
      newPassword: ['confirmPassword']
    }
  })
  const { confirmPassword, ...other } = form.values
  const { loading, refetch: registerService } = useQuery({
    enabled: false,
    queryFn: () => userService.changePassword(user?.id,{ ...other})
  })
  const onsubmit = async () => {
    try {
      if (form.validate()) {
        console.log(form.values)
        const res = await registerService()
        message.success(res.message)
        form.reset()
      }
    } catch (error) {
      console.log(error)
      handleError(error)
    }
  }
  return (
    <main className="homepage !pt-0 pb-[60px]" id="main">
      <div className="auth !max-w-full">
        <div className="wrap !max-w-full !bg-white !p-0">
          <Row justify='center' style={{ height: '100vh' }}>
            <Col span={24} className='py-[50px] px-[70px] lg:pr-[90px]'>
              <Typography className='mt-4 mb-8'>
                <Typography.Title className='flex items-center justify-start !font-extrabold' level={1}>Thay đổi mật khẩu</Typography.Title>
              </Typography>
              <Row>
                <Col span={12} className='mb-[20px] px-2'>
                  <Field label="Mật khẩu hiện tại" placeholder='Old Password' type='password' {...form.register('oldPassword')} />
                </Col>
                <Col span={12} className='mb-[20px] px-2'>
                  <Field label="Mật khẩu mới" placeholder='New Password' type='password' {...form.register('newPassword')} />
                </Col>
                <Col span={12} className='mb-[20px] px-2'>
                  <Field label="Nhập lại mật khẩu" placeholder='Confirm Password' type='password' {...form.register('confirmPassword')} />
                </Col>

                <Col span={24}>
                  <Button style={{ marginBottom: 20, width: '100%' }} disabled={loading} onClick={onsubmit}>Register</Button>
                </Col>
              </Row>

            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default changePassword
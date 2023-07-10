import Button from '@/components/Button'
import Field from '@/components/Field'
import { Select } from '@/components/Select'
import { useForm } from '@/hooks/useForm'
import { useQuery } from '@/hooks/useQuery'
import { userService } from '@/services/user'
import { handleError } from '@/utils/handleError'
import { confirm, minMax, regexp, required } from '@/utils/validate'
import { Col, Row, Typography, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const form = useForm({
        fullname: [required()],
        username: [required(), regexp('email')],
        password: [required(), regexp('password'), minMax(6,22,'Mật khẩu tối thiểu 6 kí tự và tối đa 22 kí tự')],
        confirmPassword: [required(), confirm('password')],
        id_team: [required()],
        id_level: [required()]
    }, {
        dependencies: {
            password: ['confirmPassword']
        }
    })
    const {confirmPassword,...other} = form.values
    const {loading,refetch: registerService} = useQuery({
        enabled:false,
        queryFn: () => userService.register({...other,id_team:Number(form.values.id_team),id_level:Number(form.values.id_level)})
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
                                <Typography.Title className='flex items-center justify-start !font-extrabold' level={1}>Đăng ký thành viên</Typography.Title>
                                <Typography.Text className='text-[#85849d] text-xl'>Enter the infomation you entered while</Typography.Text>
                            </Typography>

                            <Row>

                                <Col span={12} className='mb-[20px] px-2'>
                                    <Field label='Fullname' placeholder='Fullname' type='text' {...form.register('fullname')} />
                                </Col>
                                <Col span={12} className='mb-[20px] px-2'>
                                    <Field label='Email' placeholder='Email' type='text' {...form.register('username')} />
                                </Col>
                                <Col span={12} className='mb-[20px] px-2'>
                                    <Field label="Password" placeholder='Password' type='password' {...form.register('password')} />
                                </Col>
                                <Col span={12} className='mb-[20px] px-2'>
                                    <Field label="Confirm Password" placeholder='Confirm Password' type='password' {...form.register('confirmPassword')} />
                                </Col>
                                <Col span={12} className='mb-[20px] px-2'>
                                    <Field
                                        label='Bộ phận'
                                        {...form.register('id_team')}
                                        renderField={(props) => (
                                            <Select {...props} >
                                                <option selected value>Chọn bộ phận *</option>
                                                <option value='1'>Ban điều hành</option>
                                                <option value='2'>Nhân sự</option>
                                                <option value='3'>Back End</option>
                                                <option value='4'>Front End</option>
                                                <option value='5'>Devops</option>
                                                <option value='6'>Tester</option>
                                                <option value='7'>PA</option>
                                                <option value='8'>QC</option>
                                            </Select>
                                        )}
                                    />
                                </Col>
                                <Col span={12} className='mb-[20px] px-2'>
                                    <Field
                                        label='Cấp bậc'
                                        {...form.register('id_level')}
                                        renderField={(props) => (
                                            <Select {...props} >
                                                <option selected value>Chọn cấp bậc *</option>
                                                <option value='1'>Trưởng nhóm</option>
                                                <option value='2'>Nhân viên</option>
                                            </Select>
                                        )}
                                    />
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

export default Register
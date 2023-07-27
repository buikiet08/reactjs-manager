import Field from '@/components/Field'
import UploadFile from '@/components/UploadFile'
import { useAuth } from '@/hooks/useAuth'
import { useForm } from '@/hooks/useForm'
import { useQuery } from '@/hooks/useQuery'
import { fileService } from '@/services/file'
import { userService } from '@/services/user'
import { setUserAction } from '@/store/authReducer'
import { handleError } from '@/utils/handleError'
import { object } from '@/utils/object'
import { regexp, required } from '@/utils/validate'
import { CameraOutlined, EyeOutlined, LoadingOutlined, RiseOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, DatePicker, Row, Spin, Typography, message } from 'antd'
import moment from 'moment/moment'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
function Info() {
  const { user } = useAuth()
  const inputRef = useRef()
  const dispatch = useDispatch()
  const [file, setFile] = useState()
  const [selectedDate, setSelectedDate] = useState(!user?.date || user?.date == 'Invalid date' ? null : user?.date);
  const { loading, refetch: updateService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => userService.updateProfile(user.id, ...params)
  })
  // Hàm xử lý sự kiện khi người dùng chọn ngày
  const handleDateChange = (date, dataString) => {
    console.log(dataString)
    setSelectedDate(dataString)
  };
  // Lấy ngày hiện tại
  const currentDate = moment();
  // Hàm kiểm tra và disable những ngày lớn hơn ngày hiện tại
  const disabledDate = (current) => {
    return current && current > currentDate;
  };

  console.log(user)
  const form = useForm({
    fullname: [],
    username: [],
    phone: [required(), regexp('phone', 'Số điện thoại không đúng định dạng')],
    date: [required()],
    address: [required()],
  }, { initialValue: user })
  console.log(file,user, form.values)
  const onSubmit = async () => {
    const dateChange = moment(selectedDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
    const checkOldData = object.isEqual(user, { ...form.values, date: dateChange }, 'date', 'phone', 'address')
    try {
      if (checkOldData) {
        return message.warning('Vui lòng nhập thông tin để thay đổi')
      }
      if (form.validate()) {
        updateService({ ...form.values, date: dateChange })
          .then(res => {
            console.log('vào res', res.data)
            dispatch(setUserAction({ ...form.values, date: dateChange }))
            message.success('Cập nhật thông tin tài khoản thành công')
            // form.reset()
          }).catch(handleError)
      }
    } catch (error) {
      handleError(error)
    }
  }
  const onUploadAvatar = async () => {
    let avatar
    try {
      if (!file) {
        return message.warning('Vui lòng chọn ảnh để thay đổi')
      }
      if (file) {
        fileService.uploadFile(user?.id, file)
          .then(res => {
            if (res?.avatar) {
              avatar = res?.avatar
            }
            console.log(res)
            dispatch(setUserAction({ ...user, avatar: avatar }))
            message.success('Cập nhật avatar thành công')
          }).catch(handleError)
      }

    } catch (error) {
      handleError(error)
    }
  }
  const avatarDefault = 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'
  return (
    <main className="pb-[60px]">
      <Row >
        <Col span={16} className=''>
          <div className='bg-white rounded-xl p-3 shadow-sm flex gap-3' style={{ backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'right center', backgroundImage: 'url(http://skote.vuejs-light.themesbrand.com/img/img-1.5ae3905c.png' }}>
            <div className='flex flex-col'>
              <UploadFile onChange={(file) => setFile(inputRef.current = file)}>
                {(imagePreview, trigger) => (
                  <div className="w-[100px] h-[100px] rounded-full overflow-hidden cursor-pointer mb-2 relative group" onClick={trigger}>
                    {/* <span class="text">H</span> */}
                    <img src={imagePreview || (user?.avatar && `http://localhost:3001/images/${user?.avatar}`) || avatarDefault} alt />
                    <div className="absolute top-0 left-0 w-full h-full bg-[rgba(8,8,8,0.2)] hidden group-hover:block">
                      <div className='flex justify-center items-center gap-2 h-full'>
                        <CameraOutlined className='text-white cursor-pointer text-base' />
                      </div>
                    </div>
                  </div>
                )}
              </UploadFile>
              <Button onClick={onUploadAvatar} type='primary' shape="round" size={'medium'} className='bg-[#8e8f90] !hover:bg-[#8e8f90] text-xs'>Cập nhật Avatar</Button>
            </div>
            <div className='flex flex-col justify-between'>
              <div>
                <Typography.Title level={3} className='!mb-1'>{user?.fullname}</Typography.Title>
                <div className='flex items-center gap-4'>
                  <Typography.Text className='flex justify-start items-center text-[#fa6342] font-bold'><UserOutlined className='mr-2' /> {user?.title_name}</Typography.Text>
                  {user.title_level && <Typography.Text className='flex justify-start items-center text-[#fa6342] font-bold'><RiseOutlined className='mr-2' /> {user.title_level}</Typography.Text>}
                </div>
              </div>
              <ul className='flex justify-between items-center gap-6 flex-wrap mt-4'>
                <li>
                  <b>Ngày vào làm</b>
                  <p>{user?.create_at}</p>
                </li>
                <li>
                  <b>Thâm niên</b>
                  <p>{user?.create_date}</p>
                </li>
                <li>
                  <b>Đăng nhập lần cuối</b>
                  <p>{user?.update_at}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className='flex justify-start items-start gap-3'>
            <div className='bg-white rounded-xl p-3 shadow-sm min-h-[200px] mt-3 auth flex-1'>
              <Typography.Title level={4} className='border-b border-b-gray-300'>Thông tin cá nhân</Typography.Title>
              <div className="ct_login wrap !m-0 !p-0 !bg-white !max-w-full">
                <div className='mb-3'>
                  <Field disable={true} classname='!h-[46px] !text-sm' {...form.register('fullname')} />
                </div>
                <div className='mb-4'>
                  <Field disable={true} classname='!h-[46px] !text-sm' {...form.register('username')} />
                </div>
                <div className='mb-4'>
                  <Field
                    {...form.register('date')}
                    renderField={(props) => (
                      <DatePicker
                        {...props}
                        size='small'
                        className='border-none w-full p-0 rounded-md overflow-hidden mb-0'
                        placeholder='Nhập ngày sinh'
                        defaultValue={selectedDate ? moment(selectedDate, 'YYYY-MM-DD') : null}
                        onChange={handleDateChange}
                        disabledDate={disabledDate}
                        format="DD-MM-YYYY"
                      />
                    )} />
                </div>
                <div className='mb-4'>
                  <Field placeholder='Nhập số điện thoại' classname='!h-[46px] !text-sm'{...form.register('phone')} />
                </div>
                <div className='mb-4'>
                  <Field placeholder='Nhập địa chỉ' classname='!h-[46px] !text-sm' {...form.register('address')} />
                </div>
                <div className='flex justify-center items-center'><Button onClick={onSubmit} disabled={loading} type='primary'>{loading && <LoadingOutlined className='mr-2' />}Cập nhật thông tin</Button></div>
              </div>
            </div>
            <div className='bg-white rounded-xl p-3 shadow-sm  mt-3 auth flex-1'>
              <Typography.Title level={4} className='border-b border-b-gray-300'>Thông tin khác</Typography.Title>
              <div className="flex justify-center items-center min-h-[338px]">
                không có thông tin
              </div>
            </div>
          </div>
        </Col>
        <Col span={8} className='pl-3'>
          <div className='bg-white rounded-xl p-3 shadow-sm flex-1'>
            <Typography.Title level={4} className='border-b border-b-gray-300'>Sự kiện</Typography.Title>
            <div className="flex justify-center items-center min-h-[506px] ">
              không có sự kiện
            </div>
          </div>
        </Col>
      </Row>

    </main>
  )
}

export default Info
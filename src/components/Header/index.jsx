import { CheckCircleFilled, CloseCircleOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Input, Popconfirm, Popover, Tooltip, message } from 'antd'
import { clearToken, clearUser, getUser } from '@/utils/token'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment/moment'
import { useUser } from '@/hooks/useUser'
import { useAuth } from '@/hooks/useAuth'
import { useDispatch } from 'react-redux'
import { checkinAction, checkoutAction, cleartCheckinsAction } from '@/store/userReducer'
import { handleError } from '@/utils/handleError'
import { timeCheckin, timeCheckout } from '@/utils/timeCheckin'
import { useDebounce } from '@/hooks/useDebounce'
import { useQuery } from '@/hooks/useQuery'
import { personalService } from '@/services/personal'
import queryString from 'query-string'
import { API_DEFAULT, avatarDefault } from '@/config/api'
import { PersonalCard, PersonalCardLoading } from '../PersonalCard'
import { PATH } from '@/config/path'

function Header() {
    const { user } = useAuth()
    const [value, setValue] = useDebounce('')
    const [valueSearch,setValueSearch] = useState('')
    const { user: dataCheckin, checkoutLoading, checkinLoading } = useUser()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [timeLateCheckin, setTimelateCheckin] = useState(null)
    const [timeLateCheckout, setTimelateCheckout] = useState(null)

    const [open, setOpen] = useState(false);
    const [openSearch, setOpenSearch] = useState(false)
    // search
    const qs = queryString.stringify({
        value: value
    })
    const { data, loading } = useQuery({
        queryKey: [qs],
        keepPrivousData: true,
        queryFn: ({ signal }) => personalService.getAllPersonal(`?type=search&${qs}`, signal),
        enabled: !!value,
        dependencyList:[qs]
    })

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    // SEARCH
    const handleOpenSearch = (newOpen) => {
        if (value === '') {
            setOpenSearch(false)
        }
        setOpenSearch(newOpen);
    };
    const onChangeSearch = (ev) => {
        setValue(ev.target.value)
        setValueSearch(ev.target.value)
    }
    const clearSearch = () => {
        setValue('')
        setValueSearch('')
        setOpenSearch(false)
    }
    useEffect(() => {
        if (value.trim() !== '') {
            setOpenSearch(true)
        }
    }, [value.trim()])
    const onLogout = async () => {
        navigate('/login')
        localStorage.clear()
        await dispatch(cleartCheckinsAction())
        message.success('Bạn đã đăng xuất')
        window.location.reload(false)
    }
    // check in
    const onCheckin = () => {
        const currentDateTime = moment().format('DD-MM-YYYY HH:mm:ss');
        const formattedLateTime = timeCheckin(currentDateTime.split(' ')[1])
        setTimelateCheckin(formattedLateTime)
    }
    const confirmCheckin = async () => {
        const currentDateTime = moment().format('DD-MM-YYYY HH:mm:ss');
        try {
            await dispatch(checkinAction({ id: user?.id, time: currentDateTime }))

        } catch (error) {
            handleError(error)
        }
    }
    // check out
    const onCheckout = () => {
        const currentDateTime = moment().format('DD-MM-YYYY HH:mm:ss');
        const formattedLateTime = timeCheckout(currentDateTime.split(' ')[1])
        setTimelateCheckout(formattedLateTime)
    }
    const confirmCheckout = async () => {
        const currentDateTime = moment().format('DD-MM-YYYY HH:mm:ss');
        try {
            await dispatch(checkoutAction({ id: user?.id, time: currentDateTime }))
        } catch (error) {
            handleError(error)
        }
    }
    //xử lý reset checkin, checkout
    // useEffect(() => {
    //     const countdownDate = new Date();
    //     countdownDate.setHours(23, 59, 59, 0); // Thiết lập thời gian tới 23:59:59

    //     const intervalId = setInterval(async () => {
    //         const now = new Date();
    //         if (now >= countdownDate) {
    //             // Thực hiện sự kiện khi đến thời gian 23:59:59
    //             await dispatch(cleartCheckinsAction())
    //             clearInterval(intervalId); // Dừng đếm ngược khi thời gian đã đến
    //         }
    //     }, 1000); // Kiểm tra mỗi giây

    //     return () => {
    //         clearInterval(intervalId); // Hủy bỏ interval khi component bị unmount
    //     };
    // }, []);


    return (
        <div className='h-[70px] bg-white flex justify-between items-center px-[24px] shadow-sm'>
            {/* search */}
            <Popover
                content={
                    data?.data.length > 0 ?
                        <div className={`bg-white flex flex-col justify-start items-start gap-2 left-0 w-full max-w-[360px]`}>
                            {
                                loading ? Array.from(Array(2)).map((_, i) => <PersonalCardLoading key={i} />) :
                                    data?.data?.map((item, index) => <PersonalCard key={item.id} {...item} />)
                            }
                        </div> :
                        <div className={`bg-white w-full max-w-[360px] flex justify-center items-center`}>
                            Không tìm thấy kết quả
                        </div>
                }
                title=""
                trigger="click"
                overlayClassName='w-full max-w-[360px] h-full max-h-[300px] '
                open={valueSearch.trim() !== '' && openSearch}
                onOpenChange={handleOpenSearch}
            >
                <div className='bg-[#ced4da] rounded-[30px] py-2 px-4 flex items-center w-full relative max-w-[360px]'>
                    <SearchOutlined className='text-[#495057] mr-2 cursor-pointer text-lg' />
                    <input value={valueSearch} type="text" autoComplete="off" className='flex-1 w-full bg-transparent border-none outline-none' placeholder='Nhập tên,số điện thoại...' onChange={onChangeSearch} />
                    <CloseCircleOutlined onClick={clearSearch} className={`absolute text-gray-400 right-3 top-[50%] translate-y-[-50%] cursor-pointer hidden ${valueSearch.trim() !== '' && '!block'}`} />
                </div>
            </Popover>
            <div className='flex items-center gap-2'>
                {
                    user?.admin === 0 && (
                        <>
                            {
                                dataCheckin.checkin ?
                                    <div className='py-[4px] px-[12px] rounded-[30px] bg-gray-300'>
                                        {dataCheckin.checkin?.checkin_time?.split(' ')[1]}
                                    </div> :
                                    <Popconfirm
                                        title="Bạn muốn check in"
                                        description={`Thời gian bạn check in trễ: ${timeLateCheckin}`}
                                        onConfirm={confirmCheckin}
                                        onCancel={() => console.log('hủy thao tác')}
                                        okText="Check in"
                                        cancelText="No"
                                        icon={<CheckCircleFilled className='text-green-500' />}

                                    >
                                        <Button onClick={onCheckin} disabled={dataCheckin.checkin} type="primary" shape="round" size={'medium'} className='disabled:text-white'>
                                            {checkinLoading ? <LoadingOutlined /> : 'Check in'}
                                        </Button>
                                    </Popconfirm>
                            }
                            {
                                dataCheckin.checkin && (
                                    dataCheckin.checkout ?
                                        <div className='py-[4px] px-[12px] rounded-[30px] bg-gray-300'>
                                            {dataCheckin.checkout?.checkout_time?.split(' ')[1]}
                                        </div> :
                                        <Popconfirm
                                            title="Bạn muốn check out"
                                            description={`Thời gian bạn check out sớm: ${timeLateCheckout}`}
                                            onConfirm={confirmCheckout}
                                            onCancel={() => console.log('hủy thao tác')}
                                            okText="Check out"
                                            cancelText="No"
                                            icon={<CheckCircleFilled className='text-green-500' />}

                                        >
                                            <Button onClick={onCheckout} disabled={dataCheckin.checkout} type="primary" shape="round" size={'medium'} className='disabled:text-white'>
                                                {checkoutLoading ? <LoadingOutlined /> : 'Check out'}
                                            </Button>
                                        </Popconfirm>)
                            }
                        </>
                    )
                }
                <div className='flex items-center ml-10'>
                    <div className='mr-3 flex justify-end flex-col items-end'>
                        <p>{user?.fullname}</p>
                        <p className='font-semibold text-xs text-[#1677ff]'>{user?.title_name}</p>
                    </div>
                    <Popover
                        content={<div className='flex flex-col'>
                            {
                                user?.admin === 0 &&
                                <Link to='/thong-tin-ca-nhan' className='py-[6px]'>Thông tin cá nhân</Link>
                            }
                            <Link to={user?.admin === 0 ? '/doi-mat-khau' : PATH.admin.changePassword} className='py-[6px]'>Đổi mật khẩu</Link>
                            <Link onClick={onLogout} className='py-[6px] text-red-600 hover:text-red-700'>Đăng xuất</Link>
                        </div>}
                        title=""
                        trigger="click"
                        open={open}
                        onOpenChange={handleOpenChange}
                    >
                        <Tooltip title={user?.title_level}>
                            <Avatar size={'large'} src={<img src={user?.avatar ? `${API_DEFAULT}/images/${user?.avatar}` : avatarDefault} alt="avatar" />} />
                        </Tooltip>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default Header
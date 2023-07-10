import Paginate from '@/components/Paginate/Paginate'
import PersonalItem from '@/components/PersonalItem'
import { useCurrentPage } from '@/hooks/useCurrentPage'
import { useQuery } from '@/hooks/useQuery'
import { personalService } from '@/services/personal'
import { Button, Col, Row, Spin } from 'antd'
import queryString from 'query-string'
import React, { useState } from 'react'
import DetailPersonal from './Popup/detailPersonal'
import { useLocation, useSearchParams } from 'react-router-dom'

function PersonnelAdmin() {
    const [search, setSearch] = useSearchParams()
    const { pathname } = useLocation()
    const currentPage = useCurrentPage()
    const [open, setOpen] = useState(false)
    const [idUser, setIdUser] = useState(null)
    const [cate, setCate] = useState('')
    const _search = new URLSearchParams(search)
    let path = `${pathname}?${_search.toString()}`
    console.log(path)
    const qs = queryString.stringify({
        page: currentPage,
        id_team: cate
    })
    const { data, loading } = useQuery({
        queryKey: [qs],
        keepPrivousData: true,
        queryFn: ({ signal }) => personalService.getAllPersonal(`?${qs}`, signal),
        dependencyList: [currentPage, cate]
    })


    return (
        <>
            <div className='flex items-center gap-4 mb-5'>
                <Button onClick={() => setCate(0)} type='primary' shape="round" size={'small'} className='bg-[#1677ff]'>Tất cả</Button>
                <Button onClick={() => setCate(1)} type='primary' shape="round" size={'small'} className='bg-[#1677ff]'>Ban điều hành</Button>
                <Button onClick={() => setCate(2)} type='primary' shape="round" size={'small'} className='bg-[#1677ff]'>Nhân sự</Button>
                <Button onClick={() => setCate(3)} type='primary' shape="round" size={'small'} className='bg-[#1677ff]'>Back End</Button>
                <Button onClick={() => setCate(4)} type='primary' shape="round" size={'small'} className='bg-[#1677ff]'>Front End</Button>
                <Button onClick={() => setCate(5)} type='primary' shape="round" size={'small'} className='bg-[#1677ff]'>Devops</Button>
                <Button onClick={() => setCate(6)} type='primary' shape="round" size={'small'} className='bg-[#1677ff]'>Tester</Button>
                <Button onClick={() => setCate(7)} type='primary' shape="round" size={'small'} className='bg-[#1677ff]'>PA</Button>
                <Button onClick={() => setCate(8)} type='primary' shape="round" size={'small'} className='bg-[#1677ff]'>QC</Button>
            </div>
            <div className='flex flex-col gap-[1px] pb-[60px]'>
                <Row className='py-3 bg-[#1677ff]'>
                    <Col className='text-center font-bold text-white' span={2}>STT</Col>
                    <Col className='text-center font-bold text-white' span={4}>Họ Tên</Col>
                    <Col className='text-center font-bold text-white' span={2}>Chức vụ</Col>
                    <Col className='text-center font-bold text-white' span={3}>Số điện thoại</Col>
                    <Col className='text-center font-bold text-white' span={3}>Email</Col>
                    <Col className='text-center font-bold text-white' span={3}>Ngày vào làm</Col>
                    <Col className='text-center font-bold text-white' span={2}>Thâm niên</Col>
                    <Col className='text-center font-bold text-white' span={5}>Thao tác</Col>
                </Row>
                {
                    loading ? <Row className='h-[200px] flex justify-center items-center'><Spin /></Row> :
                        data?.data.map((i, index) => (<PersonalItem onOpendetail={() => {
                            setOpen(true)
                            setIdUser(i.id)
                        }} key={index} index={index + 1} {...i} />))
                }
                <div className='flex justify-end mt-5'>
                    <Paginate totalPage={data?.pagination?.totalPages} />
                </div>
            </div>
            <DetailPersonal onCancel={() => setOpen(false)} open={open} id={idUser} />
        </>
    )
}

export default PersonnelAdmin
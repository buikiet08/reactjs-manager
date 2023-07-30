import Paginate from '@/components/Paginate/Paginate'
import PersonalItem from '@/components/PersonalItem'
import { PATH } from '@/config/path'
import { useCurrentPage } from '@/hooks/useCurrentPage'
import { useQuery } from '@/hooks/useQuery'
import { personalService } from '@/services/personal'
import { Col, Row, Spin } from 'antd'
import queryString from 'query-string'
import React from 'react'
import { Link, generatePath, useSearchParams } from 'react-router-dom'

const listCategory = ['Ban lãnh đạo', 'Nhân sự', 'BackEnd', 'FrontEnd', 'Devops', 'Tester', 'BA', 'QC']
function PersonnelAdmin() {
    const [search, setSearch] = useSearchParams()
    const currentPage = useCurrentPage()
    const id_team = Number(search.get('id_item'))
    const qs = queryString.stringify({
        page: currentPage,
        id_team: id_team !== 0 ? id_team : null
    })
    const { data, loading } = useQuery({
        queryKey: [qs],
        keepPrivousData: true,
        queryFn: ({ signal }) => personalService.getAllPersonal(`?${qs}`, signal),
        dependencyList: [currentPage, id_team]
    })


    return (
        <>
            <div className='flex items-center gap-4 mb-5'>
                <Link to={PATH.admin.personnel} className={`py-2 px-4 rounded-3xl bg-slate-400 text-white ${id_team === 0 && '!bg-[#1677ff]'}`}>Tất cả</Link>
                {
                    listCategory.map((i, index) => {
                        return (<Link to={generatePath(PATH.admin.personnel + '?id_item=' + (index + 1))} className={`py-2 px-4 rounded-3xl bg-slate-400 text-white ${id_team == (index + 1) && '!bg-[#1677ff]'}`}>{i}</Link>)
                    })
                }
            </div>
            <div className='flex flex-col gap-[1px] pb-[60px]'>
                <Row className='py-3 bg-[#1677ff]'>
                    <Col className='text-center font-bold text-white' span={1}>STT</Col>
                    <Col className='text-center font-bold text-white' span={5}>Họ Tên</Col>
                    <Col className='text-center font-bold text-white' span={3}>Chức vụ</Col>
                    <Col className='text-center font-bold text-white' span={3}>Số điện thoại</Col>
                    <Col className='text-center font-bold text-white' span={4}>Email</Col>
                    <Col className='text-center font-bold text-white' span={3}>Ngày vào làm</Col>
                    <Col className='text-center font-bold text-white' span={2}>Thâm niên</Col>
                    <Col className='text-center font-bold text-white' span={3}>Thao tác</Col>
                </Row>
                {
                    loading ? <Row className='h-[200px] flex justify-center items-center'><Spin /></Row> :
                        data?.data.map((i, index) => (<PersonalItem detail key={index} index={index + 1} id={i.id} {...i} />))
                }
                <div className='flex justify-end mt-5'>
                    <Paginate totalPage={data?.pagination?.totalPages} />
                </div>
            </div>
        </>
    )
}

export default PersonnelAdmin
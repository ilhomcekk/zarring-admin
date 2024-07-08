import React, { useEffect } from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CFormInput,
  CTableRow,
  CPagination,
  CPaginationItem,
  CPopover,
  CBadge,
  CCloseButton,
} from '@coreui/react'
import { useState } from 'react'
import { cilArrowLeft, cilArrowRight, cilPen, cilTrash, cilZoom } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import OrderStore from '../../../store/order'
import { BASE_URL } from '../../../config'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { setColorFromStatus, setTextFromStatus } from '../../../helpers/form'
import { useNavigate } from 'react-router-dom'
import RangePicker from 'react-range-picker'
import PageLoading from '../../../components/PageLoading/PageLoading'

const CodeProductTable = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const from_to = searchParams.get('from_to')
  const code = searchParams.get('code')
  const page = searchParams.get('page')
  const pageSize = searchParams.get('pageSize')
  const { getList, list, listLoading } = OrderStore()
  const [params, setParams] = useState({
    page: page,
    pageSize: pageSize,
    code: code,
    from_to: from_to,
  })
  const handleChangeInput = (name, value) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      [name]: value || null,
    }))
  }
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value != null),
      )

      const queryString = new URLSearchParams(filteredParams).toString()
      navigate(`?${queryString}`)
    }
  }

  useEffect(() => {
    const newParams = {
      page: page,
      pageSize: pageSize,
      code: code,
      from_to: from_to,
    }
    setParams(newParams)
    getList(newParams)
  }, [search])
  return (
    <>
      <div className="overflow-x-auto">
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Код товара</CTableHeaderCell>
              <CTableHeaderCell scope="col">Время</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="col">
                <CFormInput
                  type="text"
                  value={params?.code}
                  onChange={(e) => handleChangeInput('code', e.target.value)}
                  onKeyPress={handleSearch}
                />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <div className={`${params?.from_to && 'date-active'}`}>
                  <RangePicker
                    onDateSelected={(f, l) => {
                      const fromDateUnix = Math.floor(new Date(f).getTime() / 1000)
                      const toDateUnix = Math.floor(new Date(l).getTime() / 1000)
                      handleChangeInput('from_to', `${fromDateUnix}-${toDateUnix}`)
                    }}
                    onClose={() => {
                      const filteredParams = Object.fromEntries(
                        Object.entries(params).filter(([key, value]) => value != null),
                      )
                      const queryString = new URLSearchParams(filteredParams).toString()
                      navigate(`?${queryString}`)
                    }}
                  />
                  {params?.from_to && (
                    <CCloseButton
                      className="ms-2"
                      onClick={() => {
                        const newParams = { ...params }
                        newParams['from_to'] = null
                        setParams(newParams)
                        const filteredParams = Object.fromEntries(
                          Object.entries(newParams).filter(([key, value]) => value != null),
                        )

                        const queryString = new URLSearchParams(filteredParams).toString()
                        navigate(`?${queryString}`)
                      }}
                    />
                  )}
                </div>
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {list?.orders?.map((item, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{item?.id}</CTableHeaderCell>
                <CTableDataCell>{item?.user_name}</CTableDataCell>
                <CTableDataCell>{item?.user_number}</CTableDataCell>
                <CTableDataCell>
                  <CBadge size="lg" className="p-2" color={setColorFromStatus(item?.status)}>
                    {setTextFromStatus(item?.status)}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>{item?.created_at}</CTableDataCell>
              </CTableRow>
            ))}
            <CPagination>
              <CPaginationItem
                onClick={() => {
                  const newParams = { ...params }
                  newParams['page'] -= 1
                  setParams(newParams)
                  getList(newParams)
                }}
                disabled={params.page === 1}
              >
                <CIcon icon={cilArrowLeft} />
              </CPaginationItem>
              {[...Array(list?.totalPages)]?.map((_, idx) => (
                <CPaginationItem
                  onClick={() => {
                    const newParams = { ...params }
                    newParams['page'] = idx + 1
                    setParams(newParams)
                    getList(newParams)
                  }}
                  active={params.page === idx + 1}
                  key={idx}
                >
                  {idx + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem
                onClick={() => {
                  const newParams = { ...params }
                  newParams['page'] += 1
                  setParams(newParams)
                  getList(newParams)
                }}
                disabled={params.page === list?.totalPages}
              >
                <CIcon icon={cilArrowRight} />
              </CPaginationItem>
            </CPagination>
          </CTableBody>
        </CTable>
      </div>
      <PageLoading loading={listLoading} />
    </>
  )
}

export default CodeProductTable

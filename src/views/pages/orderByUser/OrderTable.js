import React, { useEffect } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CBadge,
} from '@coreui/react'
import { useState } from 'react'
import { cilArrowLeft, cilArrowRight } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import OrderStore from '../../../store/order'
import { setColorFromStatus, setTextFromStatus } from '../../../helpers/form'
import PageLoading from '../../../components/PageLoading/PageLoading'

const OrderTable = () => {
  const { getListByUser, ordersByUser, listLoading } = OrderStore()
  const [params, setParams] = useState({
    page: 1,
    pageSize: 20,
    user_name: null,
  })
  useEffect(() => {
    getListByUser(params)
  }, [])

  return (
    <>
      <div className="overflow-x-auto">
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ИД</CTableHeaderCell>
              <CTableHeaderCell scope="col">Имя заказчика</CTableHeaderCell>
              <CTableHeaderCell scope="col">Номер заказчика</CTableHeaderCell>
              <CTableHeaderCell scope="col">Статус заказа</CTableHeaderCell>
              <CTableHeaderCell scope="col">Время</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {ordersByUser?.orders?.map((item, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{item?.id}</CTableHeaderCell>
                <CTableDataCell>{item?.user_name}</CTableDataCell>
                <CTableDataCell>{item?.user_number}</CTableDataCell>
                <CTableDataCell>
                  <CBadge size="lg" className="p-2" color={setColorFromStatus(item?.status)}>
                    {setTextFromStatus(item?.status)}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>{item?.createdAt}</CTableDataCell>
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
              {[...Array(ordersByUser?.totalPages)]?.map((_, idx) => (
                <CPaginationItem
                  onClick={() => {
                    const newParams = { ...params }
                    newParams['page'] = idx + 1
                    setParams(newParams)
                    getListByUser(newParams)
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
                  getListByUser(newParams)
                }}
                disabled={params.page === ordersByUser?.totalPages}
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

export default OrderTable

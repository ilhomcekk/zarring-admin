import React from 'react'
import {
  CCardTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import statsStore from '../../../store/stats'

const ClientsMaxCountTable = () => {
  const { clientsMaxCount } = statsStore()

  return (
    <>
      <CCardTitle className="mb-4">Самые заказываемые клиенты</CCardTitle>
      <div className="overflow-x-auto">
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Заказ ИД</CTableHeaderCell>
              <CTableHeaderCell scope="col">Имя</CTableHeaderCell>
              <CTableHeaderCell scope="col">Номер телефона</CTableHeaderCell>
              <CTableHeaderCell scope="col">Количество</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {clientsMaxCount?.map((product, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{product?.order_id}</CTableHeaderCell>
                <CTableDataCell>{product?.name}</CTableDataCell>
                <CTableDataCell>{product?.number}</CTableDataCell>
                <CTableDataCell>{product?.count}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </>
  )
}

export default ClientsMaxCountTable

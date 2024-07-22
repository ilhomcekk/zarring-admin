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
import { BASE_URL } from '../../../config'
import Zoom from 'react-medium-image-zoom'

const ProductsMaxCountTable = () => {
  const { productsMaxCount } = statsStore()

  return (
    <>
      <CCardTitle className="mb-4 mt-4">Самые заказываемые продукты</CCardTitle>
      <div className="overflow-x-auto">
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ИД</CTableHeaderCell>
              <CTableHeaderCell scope="col">Имя</CTableHeaderCell>
              <CTableHeaderCell scope="col">Количество</CTableHeaderCell>
              <CTableHeaderCell scope="col">Категория</CTableHeaderCell>
              <CTableHeaderCell scope="col">Цена</CTableHeaderCell>
              <CTableHeaderCell scope="col">Код товара</CTableHeaderCell>
              <CTableHeaderCell scope="col">Картинка</CTableHeaderCell>
              <CTableHeaderCell scope="col">Время</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {productsMaxCount?.map((product, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{product?.id}</CTableHeaderCell>
                <CTableDataCell>{product?.title}</CTableDataCell>
                <CTableDataCell>{product?.count}</CTableDataCell>
                <CTableDataCell>{product?.category_name}</CTableDataCell>
                <CTableDataCell>{product?.price}</CTableDataCell>
                <CTableDataCell>{product?.code}</CTableDataCell>
                <CTableDataCell>
                  <Zoom>
                    <img
                      style={{ objectFit: 'contain' }}
                      src={BASE_URL + product?.img}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </Zoom>
                </CTableDataCell>
                <CTableDataCell>{product?.created_at}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </>
  )
}

export default ProductsMaxCountTable

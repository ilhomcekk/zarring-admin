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
} from '@coreui/react'
import { useState } from 'react'
import { cilArrowLeft, cilArrowRight, cilPen, cilTrash, cilZoom } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import ProductsShowModal from './ProductsShowModal'
import ProductsEditModal from './ProductsEditModal'
import productStore from '../../../store/products'
import categoryStore from '../../../store/category'

const ProductsTable = () => {
  const { getList, list } = productStore()
  const { getList: getCategory } = categoryStore()
  const [item, setItem] = useState({})
  const [params, setParams] = useState({
    page: 1,
    pageSize: 5,
  })
  const [showModal, setShowModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  useEffect(() => {
    getList(params)
    getCategory(params)
  }, [])
  return (
    <>
      <div className="overflow-x-auto">
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Имя</CTableHeaderCell>
              <CTableHeaderCell scope="col">Категория</CTableHeaderCell>
              <CTableHeaderCell scope="col">Цена</CTableHeaderCell>
              <CTableHeaderCell scope="col">Статус</CTableHeaderCell>
              <CTableHeaderCell scope="col">Картинка</CTableHeaderCell>
              <CTableHeaderCell scope="col">Время</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput type="text" placeholder="Filter by First Name" name="firstName" />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput type="text" placeholder="Filter by Last Name" name="lastName" />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput type="text" placeholder="Filter by Username" name="username" />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput type="text" placeholder="Filter by Username" name="username" />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput type="text" placeholder="Filter by Username" name="username" />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput type="text" placeholder="Filter by Username" name="username" />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {list?.data?.map((product, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{product?.id}</CTableHeaderCell>
                <CTableDataCell>{product?.title_ru}</CTableDataCell>
                <CTableDataCell>{product?.category_id}</CTableDataCell>
                <CTableDataCell>{product?.price}</CTableDataCell>
                <CTableDataCell>{product?.status}</CTableDataCell>
                <CTableDataCell>{product?.img}</CTableDataCell>
                <CTableDataCell>{product?.createdAt}</CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex">
                    <CButton
                      color="primary"
                      onClick={() => {
                        setItem(product)
                        setShowModal(true)
                      }}
                    >
                      <CIcon icon={cilZoom} />
                    </CButton>
                    <CButton
                      className="mx-2"
                      color="danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                    <CButton color="warning" onClick={() => setEditModal(true)}>
                      <CIcon icon={cilPen} />
                    </CButton>
                  </div>
                </CTableDataCell>
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
                <CPaginationItem key={idx}>{idx + 1}</CPaginationItem>
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
      <ProductsShowModal visible={showModal} onClose={() => setShowModal(false)} item={item} />
      <ProductsEditModal visible={editModal} onClose={() => setEditModal(false)} />
    </>
  )
}

export default ProductsTable

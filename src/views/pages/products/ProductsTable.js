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
  CTableFoot,
} from '@coreui/react'
import { useState } from 'react'
import { cilPen, cilTrash, cilZoom } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import ProductsShowModal from './ProductsShowModal'
import ProductsEditModal from './ProductsEditModal'
import productStore from '../../../store/products'

const ProductsTable = () => {
  const { getList } = productStore()
  const [params, setParams] = useState({
    page: 1,
    pageSize: 5,
  })
  const [showModal, setShowModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [products, setProducts] = useState([
    { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo' },
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat' },
    { id: 3, firstName: 'Larry the Bird', lastName: '', username: '@twitter' },
  ])
  useEffect(() => {
    getList(params)
  }, [])
  return (
    <>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Username</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
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
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {products.map((product, index) => (
            <CTableRow key={product.id}>
              <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
              <CTableDataCell>{product.firstName}</CTableDataCell>
              <CTableDataCell>{product.lastName}</CTableDataCell>
              <CTableDataCell>{product.username}</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" onClick={() => setShowModal(true)}>
                  <CIcon icon={cilZoom} />
                </CButton>
                <CButton className="mx-2" color="danger" onClick={() => handleDelete(product.id)}>
                  <CIcon icon={cilTrash} />
                </CButton>
                <CButton color="warning" onClick={() => setEditModal(true)}>
                  <CIcon icon={cilPen} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
          <CPagination>
            <CPaginationItem>Prev</CPaginationItem>
            <CPaginationItem>1</CPaginationItem>
            <CPaginationItem>Next</CPaginationItem>
          </CPagination>
        </CTableBody>
      </CTable>
      <ProductsShowModal visible={showModal} onClose={() => setShowModal(false)} />
      <ProductsEditModal visible={editModal} onClose={() => setEditModal(false)} />
    </>
  )
}

export default ProductsTable

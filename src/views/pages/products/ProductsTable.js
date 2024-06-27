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
import { BASE_URL } from '../../../config'
import Zoom from 'react-medium-image-zoom'

const ProductsTable = () => {
  const { getList, list } = productStore()
  const { getList: getCategory } = categoryStore()
  const [item, setItem] = useState({})
  const [idItem, setIdItem] = useState(null)
  const [params, setParams] = useState({
    page: 1,
    pageSize: 20,
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
              <CTableHeaderCell scope="col">ИД</CTableHeaderCell>
              <CTableHeaderCell scope="col">Имя</CTableHeaderCell>
              <CTableHeaderCell scope="col">Категория</CTableHeaderCell>
              <CTableHeaderCell scope="col">Цена</CTableHeaderCell>
              <CTableHeaderCell scope="col">Картинка</CTableHeaderCell>
              <CTableHeaderCell scope="col">Время</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput type="text" name="firstName" />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput type="text" name="username" />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput type="text" name="username" />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput type="text" name="username" />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput type="text" name="username" />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {list?.data?.map((product, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{product?.id}</CTableHeaderCell>
                <CTableDataCell>{product?.title}</CTableDataCell>
                <CTableDataCell>{product?.category_name}</CTableDataCell>
                <CTableDataCell>{product?.price}</CTableDataCell>
                <CTableDataCell>
                  <Zoom>
                    <img src={BASE_URL + product?.img} width={50} height={50} alt="" />
                  </Zoom>
                </CTableDataCell>
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
                    <CButton
                      color="warning"
                      onClick={() => {
                        setIdItem(product?.id)
                        setEditModal(true)
                      }}
                    >
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
      <ProductsShowModal visible={showModal} onClose={() => setShowModal(false)} item={item} />
      <ProductsEditModal visible={editModal} onClose={() => setEditModal(false)} id={idItem} />
    </>
  )
}

export default ProductsTable

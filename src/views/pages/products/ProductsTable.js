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
  CFormSelect,
  CCloseButton,
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
import { toast } from 'react-toastify'
import PageLoading from '../../../components/PageLoading/PageLoading'
import DatePicker from '../../forms/datePicker/DatePicker'
import { removeFilter } from '../../../utils'

const ProductsTable = () => {
  const { getList, list, deleteLoading, remove, listLoading } = productStore()
  const { getList: getCategory, list: categories, getParents } = categoryStore()
  const [item, setItem] = useState({})
  const [idItem, setIdItem] = useState(null)
  const [params, setParams] = useState({
    page: 1,
    pageSize: 20,
    id: null,
    title: null,
    category_id: null,
    price: null,
    code: null,
    from_to: null,
  })
  const [showModal, setShowModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const handleChangeInput = (name, value) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      [name]: value || null,
    }))
  }
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      getList(params)
    }
  }

  useEffect(() => {
    getList(params)
    getParents()
  }, [])
  return (
    <>
      <div className="overflow-x-auto">
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell style={{ width: '40px' }}>ИД</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '250px' }}>Имя</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '250px' }}>Категория</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '250px' }}>Цена</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '100px' }}>Код товара</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '150px' }}>Картинка</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '250px' }}>Время</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '50px' }}></CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell style={{ width: '40px' }}>
                <CFormInput
                  type="text"
                  value={params?.id}
                  onChange={(e) => handleChangeInput('id', e.target.value)}
                  onKeyPress={handleSearch}
                />
              </CTableHeaderCell>
              <CTableHeaderCell style={{ width: '40px' }}>
                <CFormInput
                  type="text"
                  value={params?.title}
                  onChange={(e) => handleChangeInput('title', e.target.value)}
                  onKeyPress={handleSearch}
                />
              </CTableHeaderCell>
              <CTableHeaderCell style={{ width: '40px' }}>
                <CFormSelect
                  name="category_id"
                  value={params?.category_id}
                  onChange={(e) => {
                    handleChangeInput('category_id', e.target.value)
                    getList({
                      ...params,
                      page: 1,
                      category_id: e.target.value || null,
                    })
                  }}
                  options={[
                    '',
                    ...categories?.map((item) => ({
                      label: item?.title,
                      value: item?.id,
                    })),
                  ]}
                />
              </CTableHeaderCell>
              <CTableHeaderCell style={{ width: '40px' }}>
                <CFormInput
                  type="text"
                  onChange={(e) => handleChangeInput('price', e.target.value)}
                  onKeyPress={handleSearch}
                />
              </CTableHeaderCell>
              <CTableHeaderCell style={{ width: '40px' }}>
                <CFormInput
                  type="text"
                  onChange={(e) => handleChangeInput('code', e.target.value)}
                  onKeyPress={handleSearch}
                />
              </CTableHeaderCell>
              <CTableHeaderCell style={{ width: '40px' }}></CTableHeaderCell>
              <CTableHeaderCell style={{ width: '40px' }}>
                <div className={`d-flex align-items-center ${params?.from_to && 'date-active'}`}>
                  <DatePicker
                    params={params}
                    setParams={setParams}
                    handleSearch={() => {
                      getList(params)
                    }}
                    column={'from_to'}
                    onClear={() => {
                      const data = { ...params }
                      delete data['from_to']
                      getList(data)
                      removeFilter(setParams, params, 'from_to')
                    }}
                  />
                </div>
              </CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {list?.data?.map((product, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell>{product?.id}</CTableHeaderCell>
                <CTableDataCell>{product?.title}</CTableDataCell>
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
                    <CPopover
                      title={product?.id}
                      trigger={'focus'}
                      content={
                        <div>
                          <div>Вы точно хотите удалить?</div>
                          <CButton
                            disabled={deleteLoading}
                            onClick={() =>
                              remove(product?.id).then((res) => {
                                if (res?.data) {
                                  toast.success('Успешно удалено')
                                  getList({
                                    page: 1,
                                    pageSize: 20,
                                  })
                                }
                              })
                            }
                            color="danger"
                            className="mt-2"
                          >
                            Удалить
                          </CButton>
                        </div>
                      }
                    >
                      <CButton className="mx-2" color="danger">
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CPopover>
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
      <PageLoading loading={listLoading} />
    </>
  )
}

export default ProductsTable

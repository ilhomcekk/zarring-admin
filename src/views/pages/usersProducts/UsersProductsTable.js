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
} from '@coreui/react'
import { useState } from 'react'
import { cilArrowLeft, cilArrowRight, cilPen, cilTrash, cilZoom } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import BannerShowModal from './BannerShowModal'
import BannerEditModal from './BannerEditModal'
import BannerStore from '../../../store/banner'
import { BASE_URL } from '../../../config'
import { toast } from 'react-toastify'
import RangePicker from 'react-range-picker'
import PageLoading from '../../../components/PageLoading/PageLoading'
import statsStore from '../../../store/stats'

const UsersProductsTable = () => {
  const { getUsersProducts, usersProducts, remove, deleteLoading, listLoading } = statsStore()
  const [item, setItem] = useState({})
  const [idItem, setIdItem] = useState(null)
  const [params, setParams] = useState({
    page: 1,
    pageSize: 20,
    order_id: null,
    name: null,
    number: null,
    product_count: null,
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
      getUsersProducts(params)
    }
  }
  useEffect(() => {
    getUsersProducts(params)
  }, [])
  return (
    <>
      <div className="overflow-x-auto">
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Заказ ИД</CTableHeaderCell>
              <CTableHeaderCell scope="col">Имя</CTableHeaderCell>
              <CTableHeaderCell scope="col">Номер телефона</CTableHeaderCell>
              <CTableHeaderCell scope="col">Количество товаров</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="col">
                <CFormInput
                  type="text"
                  value={params?.order_id}
                  onChange={(e) => handleChangeInput('order_id', e.target.value)}
                  onKeyPress={handleSearch}
                />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput
                  type="text"
                  value={params?.name}
                  onChange={(e) => handleChangeInput('name', e.target.value)}
                  onKeyPress={handleSearch}
                />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput
                  type="text"
                  value={params?.number}
                  onChange={(e) => handleChangeInput('number', e.target.value)}
                  onKeyPress={handleSearch}
                />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput
                  type="text"
                  value={params?.product_count}
                  onChange={(e) => handleChangeInput('product_count', e.target.value)}
                  onKeyPress={handleSearch}
                />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {usersProducts?.rows?.map((item, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{item?.order_id}</CTableHeaderCell>
                <CTableDataCell>{item?.name}</CTableDataCell>
                <CTableDataCell>{item?.number}</CTableDataCell>
                <CTableDataCell>{item?.product_count}</CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex">
                    <CButton
                      color="primary"
                      onClick={() => {
                        setItem(item)
                        setShowModal(true)
                      }}
                    >
                      <CIcon icon={cilZoom} />
                    </CButton>
                    {/* <CPopover
                      title={item?.dataValues?.id}
                      trigger={'focus'}
                      content={
                        <div>
                          <div>Вы точно хотите удалить?</div>
                          <CButton
                            disabled={deleteLoading}
                            onClick={() =>
                              remove(item?.dataValues?.id).then((res) => {
                                if (res?.data) {
                                  toast.success('Успешно удалено')
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
                        setIdItem(item?.dataValues?.id)
                        setEditModal(true)
                      }}
                    >
                      <CIcon icon={cilPen} />
                    </CButton> */}
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
                  getUsersProducts(newParams)
                }}
                disabled={params.page === 1}
              >
                <CIcon icon={cilArrowLeft} />
              </CPaginationItem>
              {[...Array(usersProducts?.totalPages)]?.map((_, idx) => (
                <CPaginationItem
                  onClick={() => {
                    const newParams = { ...params }
                    newParams['page'] = idx + 1
                    setParams(newParams)
                    getUsersProducts(newParams)
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
                  getUsersProducts(newParams)
                }}
                disabled={params.page === usersProducts?.totalPages}
              >
                <CIcon icon={cilArrowRight} />
              </CPaginationItem>
            </CPagination>
          </CTableBody>
        </CTable>
      </div>
      <BannerShowModal visible={showModal} onClose={() => setShowModal(false)} item={item} />
      <BannerEditModal visible={editModal} onClose={() => setEditModal(false)} id={idItem} />
      <PageLoading loading={listLoading} />
    </>
  )
}

export default UsersProductsTable

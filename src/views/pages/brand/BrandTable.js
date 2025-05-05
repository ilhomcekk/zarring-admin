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
  CCloseButton,
} from '@coreui/react'
import { useState } from 'react'
import { cilArrowLeft, cilArrowRight, cilPen, cilTrash, cilZoom } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import BrandShowModal from './BrandShowModal'
import BrandEditModal from './BrandEditModal'
import BrandStore from '../../../store/brand'
import { BASE_URL } from '../../../config'
import { toast } from 'react-toastify'
import RangePicker from 'react-range-picker'
import PageLoading from '../../../components/PageLoading/PageLoading'
import DatePicker from '../../forms/datePicker/DatePicker'
import { modalsStore } from '../../../store/index'
import ConfirmModal from '../../notifications/modals/ConfirmModal'

const BrandTable = () => {
  const { getList, list, remove, deleteLoading, listLoading } = BrandStore()
  const { closeModal, openModal } = modalsStore()
  const [item, setItem] = useState({})
  const [idItem, setIdItem] = useState(null)
  const [params, setParams] = useState({
    page: 1,
    pageSize: 20,
    id: null,
    name: null,
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
  }, [])
  return (
    <>
      <div className="overflow-x-auto">
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ИД</CTableHeaderCell>
              <CTableHeaderCell scope="col">Имя</CTableHeaderCell>
              <CTableHeaderCell scope="col">Картинка</CTableHeaderCell>
              <CTableHeaderCell scope="col">Время</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="col">
                <CFormInput
                  type="text"
                  value={params?.id}
                  onChange={(e) => handleChangeInput('id', e.target.value)}
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
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">
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
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {list?.map((item, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{item?.id}</CTableHeaderCell>
                <CTableDataCell>{item?.name}</CTableDataCell>
                <CTableDataCell>
                  <img src={BASE_URL + item?.img} width={50} height={50} alt="" />
                </CTableDataCell>
                <CTableDataCell>{item?.created_at}</CTableDataCell>
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
                    <CButton
                      className="mx-2"
                      color="danger"
                      onClick={() => {
                        setIdItem(item.id)
                        openModal('confirm')
                      }}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                    <CButton
                      color="warning"
                      onClick={() => {
                        setIdItem(item?.id)
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
      <BrandShowModal visible={showModal} onClose={() => setShowModal(false)} item={item} />
      <BrandEditModal visible={editModal} onClose={() => setEditModal(false)} id={idItem} />
      <ConfirmModal
        onConfirm={() =>
          remove(idItem).then((res) => {
            if (res?.data) {
              closeModal('confirm')
            }
          })
        }
        onClose={() => setIdItem(null)}
        id={idItem}
        loading={deleteLoading}
      />
      <PageLoading loading={listLoading} />
    </>
  )
}

export default BrandTable

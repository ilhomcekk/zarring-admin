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
import BrandShowModal from './BrandShowModal'
import BrandEditModal from './BrandEditModal'
import BrandStore from '../../../store/brand'
import { BASE_URL } from '../../../config'
import { toast } from 'react-toastify'
import RangePicker from 'react-range-picker'
import PageLoading from '../../../components/PageLoading/PageLoading'

const BrandTable = () => {
  const { getList, list, remove, deleteLoading, listLoading } = BrandStore()
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
                <RangePicker
                  onDateSelected={(f, l) => {
                    const fromDateUnix = Math.floor(new Date(f).getTime() / 1000)
                    const toDateUnix = Math.floor(new Date(l).getTime() / 1000)
                    handleChangeInput('from_to', `${fromDateUnix}-${toDateUnix}`)
                  }}
                  onClose={() => {
                    if (params?.from_to) getList({ ...params, page: 1 })
                  }}
                />
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
                    <CPopover
                      title={item?.id}
                      trigger={'focus'}
                      content={
                        <div>
                          <div>Вы точно хотите удалить?</div>
                          <CButton
                            disabled={deleteLoading}
                            onClick={() =>
                              remove(item?.id).then((res) => {
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
      <PageLoading loading={listLoading} />
    </>
  )
}

export default BrandTable

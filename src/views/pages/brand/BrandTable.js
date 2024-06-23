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

const BrandTable = () => {
  const { getList: getBrand, list, remove, deleteLoading } = BrandStore()
  const [item, setItem] = useState({})
  const [idItem, setIdItem] = useState(null)
  const [params, setParams] = useState({
    page: 1,
    pageSize: 20,
  })
  const [showModal, setShowModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  useEffect(() => {
    getBrand(params)
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
                <CTableDataCell>{item?.createdAt}</CTableDataCell>
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
    </>
  )
}

export default BrandTable

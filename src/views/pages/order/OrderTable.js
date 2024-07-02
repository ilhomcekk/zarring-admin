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
  CBadge,
} from '@coreui/react'
import { useState } from 'react'
import { cilArrowLeft, cilArrowRight, cilPen, cilTrash, cilZoom } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import OrderShowModal from './OrderShowModal'
import OrderEditModal from './OrderEditModal'
import OrderStore from '../../../store/order'
import { BASE_URL } from '../../../config'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { setColorFromStatus, setTextFromStatus } from '../../../helpers/form'

const OrderTable = () => {
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const status = searchParams.get('status')
  const page = searchParams.get('page')
  const pageSize = searchParams.get('pageSize')
  const { getList: getOrder, list, remove, deleteLoading } = OrderStore()
  const [item, setItem] = useState({})
  const [idItem, setIdItem] = useState(null)
  const [params, setParams] = useState({
    page: page,
    pageSize: pageSize,
    status: status,
  })
  const [showModal, setShowModal] = useState(false)
  const [editModal, setEditModal] = useState(false)

  useEffect(() => {
    const newParams = {
      page: page,
      pageSize: pageSize,
      status: status,
    }
    setParams(newParams)
    getOrder(newParams)
  }, [search])
  return (
    <>
      <div className="overflow-x-auto">
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ИД</CTableHeaderCell>
              <CTableHeaderCell scope="col">Имя заказчика</CTableHeaderCell>
              <CTableHeaderCell scope="col">Номер заказчика</CTableHeaderCell>
              <CTableHeaderCell scope="col">Статус заказа</CTableHeaderCell>
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
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {list?.orders?.map((item, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{item?.id}</CTableHeaderCell>
                <CTableDataCell>{item?.user_name}</CTableDataCell>
                <CTableDataCell>{item?.user_number}</CTableDataCell>
                <CTableDataCell>
                  <CBadge size="lg" className="p-2" color={setColorFromStatus(item?.status)}>
                    {setTextFromStatus(item?.status)}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>{item?.createdAt}</CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex">
                    {/* <CButton
                      color="primary"
                      onClick={() => {
                        setItem(item)
                        setShowModal(true)
                      }}
                    >
                      <CIcon icon={cilZoom} />
                    </CButton> */}
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
      <OrderShowModal visible={showModal} onClose={() => setShowModal(false)} item={item} />
      <OrderEditModal visible={editModal} onClose={() => setEditModal(false)} id={idItem} />
    </>
  )
}

export default OrderTable

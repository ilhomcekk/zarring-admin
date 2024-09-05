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
  CCloseButton,
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
import { useNavigate } from 'react-router-dom'
import RangePicker from 'react-range-picker'
import PageLoading from '../../../components/PageLoading/PageLoading'
import productStore from '../../../store/products'
import handleProductsStore from '../../../store/handleProducts'

const OrderTable = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const status = searchParams.get('status')
  const id = searchParams.get('id')
  const user_name = searchParams.get('user_name')
  const user_number = searchParams.get('user_number')
  const from_to = searchParams.get('from_to')
  const page = searchParams.get('page')
  const pageSize = searchParams.get('pageSize')
  const { getList, list, remove, deleteLoading, listLoading } = OrderStore()
  const { clearProducts } = handleProductsStore()
  const { getProductCodes } = productStore()
  const [item, setItem] = useState({})
  const [idItem, setIdItem] = useState(null)
  const [params, setParams] = useState({
    page: page,
    pageSize: pageSize,
    status: status,
    id: id,
    user_name: user_name,
    user_number: user_number,
    from_to: from_to,
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
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value != null),
      )
      const queryString = new URLSearchParams(filteredParams).toString()
      navigate(`?${queryString}`)
    }
  }

  useEffect(() => {
    const newParams = {
      page: page,
      pageSize: pageSize,
      status: status,
      id: id,
      user_name: user_name,
      user_number: user_number,
      from_to: from_to,
    }
    setParams(newParams)
    getList(newParams)
    getProductCodes()
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
              <CTableHeaderCell scope="col">Количество товара</CTableHeaderCell>
              <CTableHeaderCell scope="col">Статус заказа</CTableHeaderCell>
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
                  value={params?.user_name}
                  onChange={(e) => handleChangeInput('user_name', e.target.value)}
                  onKeyPress={handleSearch}
                />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput
                  type="text"
                  value={params?.user_number}
                  onChange={(e) => handleChangeInput('user_number', e.target.value)}
                  onKeyPress={handleSearch}
                />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <div className={`d-flex align-items-center ${params?.from_to && 'date-active'}`}>
                  <RangePicker
                    onDateSelected={(f, l) => {
                      const fromDateUnix = Math.floor(new Date(f).getTime() / 1000)
                      const toDateUnix = Math.floor(new Date(l).getTime() / 1000)
                      handleChangeInput('from_to', `${fromDateUnix}-${toDateUnix}`)
                    }}
                    onClose={() => {
                      const filteredParams = Object.fromEntries(
                        Object.entries(params).filter(([key, value]) => value != null),
                      )
                      const queryString = new URLSearchParams(filteredParams).toString()
                      navigate(`?${queryString}`)
                    }}
                  />
                  {params?.from_to && (
                    <CCloseButton
                      className="ms-2"
                      onClick={() => {
                        const newParams = { ...params }
                        newParams['from_to'] = null
                        setParams(newParams)
                        const filteredParams = Object.fromEntries(
                          Object.entries(newParams).filter(([key, value]) => value != null),
                        )

                        const queryString = new URLSearchParams(filteredParams).toString()
                        navigate(`?${queryString}`)
                      }}
                    />
                  )}
                </div>
              </CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {list?.orders?.map((item, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{item?.id}</CTableHeaderCell>
                <CTableDataCell>{item?.user_name}</CTableDataCell>
                <CTableDataCell>{item?.user_number}</CTableDataCell>
                <CTableDataCell>{item?.products?.length}</CTableDataCell>
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
                    {/* <CPopover
                      title={item?.id}
                      trigger={'focus'}
                      visible
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
                            className="mt-2 mx-auto d-flex"
                          >
                            Удалить
                          </CButton>
                        </div>
                      }
                    >
                      <CButton className="mx-2" color="danger">
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CPopover> */}
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
      <OrderEditModal
        visible={editModal}
        onClose={() => {
          setEditModal(false)
          clearProducts()
        }}
        id={idItem}
      />
      <PageLoading loading={listLoading} />
    </>
  )
}

export default OrderTable

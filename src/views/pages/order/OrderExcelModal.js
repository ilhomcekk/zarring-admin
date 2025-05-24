import {
  CBadge,
  CButton,
  CCallout,
  CCol,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../config'
import DatePicker from '../../forms/datePicker/DatePicker'
import orderStore from '../../../store/order'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilArrowRight } from '@coreui/icons'
import {
  setColorFromStatus,
  setStaticColorFromStatus,
  setTextFromStatus,
  statusList,
} from '../../../helpers/form'
import { toast } from 'react-toastify'

const OrderExcelModal = ({ visible, onClose }) => {
  const [params, setParams] = useState({
    page: 1,
    pageSize: 20,
    status: null,
  })
  const {
    getExcelList: getList,
    excelList: list,
    excelListLoading: listLoading,
    downloadExcel,
    downloadExcelLoading,
  } = orderStore()
  const handleInputChange = (e) => {
    const { name, value } = e.target
    const data = { ...params }
    if (value === 'Все') {
      delete data[name]
    } else {
      data[name] = value
    }
    setParams(data)
    // getList(data)
  }
  useEffect(() => {
    if (visible) {
      getList(params)
    }
  }, [visible])
  console.log(params)
  return (
    <CModal size="xl" visible={visible} onClose={onClose} backdrop="static">
      <CModalHeader>
        <CModalTitle>Excel</CModalTitle>
        <CButton
          onClick={() => {
            if (!params.from_to) {
              toast.error('Выберите время')
            } else {
              downloadExcel({
                status: params.status,
                date: params?.from_to,
              })
            }
          }}
          disabled={downloadExcelLoading}
          color="primary"
          className="ms-4"
        >
          {downloadExcelLoading ? 'Загрузка...' : 'Скачать в Excel'}
        </CButton>
      </CModalHeader>
      <CModalBody>
        <CCol xs={{ span: 8 }} className="mx-auto">
          <CRow className="mb-3">
            <CFormLabel className="col-sm-6 col-form-label">Выберите статус</CFormLabel>
            <CCol sm={6}>
              <CInputGroup>
                <CFormSelect
                  name="status"
                  value={params?.status}
                  onChange={handleInputChange}
                  options={statusList?.map((item) => ({
                    label: item?.name,
                    value: item?.value,
                  }))}
                  style={{
                    background: setStaticColorFromStatus(Number(params?.status)),
                    color: '#fff',
                  }}
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel className="col-sm-6 col-form-label">Выберите период</CFormLabel>
            <CCol sm={6}>
              <CInputGroup>
                <div
                  className={`d-flex align-items-center w-100 ${params?.from_to && 'date-active'}`}
                >
                  <DatePicker
                    params={params}
                    setParams={setParams}
                    handleSearch={() => {
                      // getList(params)
                    }}
                    column={'from_to'}
                    className="w-100"
                    onClear={() => {
                      const data = { ...params }
                      delete data['from_to']
                      // getList(data)
                      setParams((prev) => ({ ...prev, from_to: null }))
                    }}
                  />
                </div>
              </CInputGroup>
            </CCol>
          </CRow>
          {/* <div className="overflow-x-auto">
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ИД</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Имя заказчика</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Размер</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Номер заказчика</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Количество товара</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Статус заказа</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Время</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <CFormSelect
                      name="status"
                      value={params?.status}
                      onChange={handleInputChange}
                      options={statusList?.map((item) => ({
                        label: item?.name,
                        value: item?.value,
                      }))}
                      style={{
                        background: setStaticColorFromStatus(Number(params?.status)),
                        color: '#fff',
                      }}
                    />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <div
                      className={`d-flex align-items-center ${params?.from_to && 'date-active'}`}
                    >
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
                          setParams((prev) => ({ ...prev, from_to: null }))
                        }}
                      />
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
                    <CTableDataCell>
                      {item?.products?.map((item) => item?.selected_size)}
                    </CTableDataCell>
                    <CTableDataCell>{item?.user_number}</CTableDataCell>
                    <CTableDataCell>
                      {item?.products?.reduce(
                        (acc, product) => acc + (Number(product?.count) || 0),
                        0,
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CBadge size="lg" className="p-2" color={setColorFromStatus(item?.status)}>
                        {setTextFromStatus(item?.status)}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{item?.created_at}</CTableDataCell>
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
          </div> */}
        </CCol>
      </CModalBody>
    </CModal>
  )
}

export default OrderExcelModal

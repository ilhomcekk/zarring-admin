import React, { useEffect } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CFormInput,
  CTableRow,
  CPagination,
  CPaginationItem,
  CCloseButton,
  CFormSelect,
} from '@coreui/react'
import { useState } from 'react'
import { cilArrowLeft, cilArrowRight } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import RangePicker from 'react-range-picker'
import PageLoading from '../../../components/PageLoading/PageLoading'
import productStore from '../../../store/products'

const CodeProductTable = () => {
  const { getProductCodes, productCodes, productCodesLoading, getList, list, listLoading } =
    productStore()
  const [params, setParams] = useState({
    page: 1,
  })
  const handleChangeInput = (name, value) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      [name]: value || null,
    }))
  }
  useEffect(() => {
    getProductCodes()
  }, [getProductCodes])
  return (
    <>
      <div className="overflow-x-auto">
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Код товара</CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="col">
                <CFormSelect
                  name="code"
                  value={params?.code}
                  onChange={(e) => {
                    handleChangeInput('code', e.target.value)
                    getList({
                      ...params,
                      page: 1,
                      code: e.target.value || null,
                    })
                  }}
                  options={[
                    '',
                    ...productCodes?.map((item) => ({
                      label: item?.code,
                      value: item?.code,
                    })),
                  ]}
                />
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {list?.data?.map((product, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{product?.id}</CTableHeaderCell>
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
      <PageLoading loading={listLoading} />
    </>
  )
}

export default CodeProductTable

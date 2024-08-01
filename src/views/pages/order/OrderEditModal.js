import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CBadge,
  CButton,
  CCallout,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import OrderEditstore from '../../../store/order'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../../config'
import {
  setColorFromStatus,
  setStaticColorFromStatus,
  setTextFromStatus,
  statusList,
} from '../../../helpers/form'
import handleProductsStore from '../../../store/handleProducts'
import StateProductsModal from './StateProducts'
import productStore from '../../../store/products'
import { isHas } from '../../../utils'

const OrderEditModal = ({ visible, onClose, id }) => {
  const [modal, setModal] = useState(false)
  const { setProducts, stateProducts, toggleProduct } = handleProductsStore()
  const { productCodes, getList: getProducts, list: products, clearList } = productStore()
  const { detail: item, getDetail, getList, edit, editLoading } = OrderEditstore()
  const [params, setParams] = useState({
    user_name: '',
    user_number: '',
    status: 0,
    products: stateProducts || [],
  })
  const [productParams, setProductParams] = useState({
    page: 1,
    pageSize: 20,
    code: null,
  })
  const handleChangeInput = (name, value) => {
    setProductParams({ ...params, [name]: value })
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setParams({ ...params, [name]: value })
  }

  useEffect(() => {
    setParams((prev) => ({ ...prev, products: stateProducts }))
  }, [stateProducts])
  useEffect(() => {
    if (visible) {
      getDetail(id)
      clearList()
    }
  }, [visible])
  useEffect(() => {
    setParams({
      user_name: item?.user_name,
      user_number: item?.user_number,
      status: item?.status,
    })
    setProducts(item?.products || [])
  }, [item])

  const handleSubmit = () => {
    edit(id, params)
      .then((res) => {
        console.log(res, 'asdasdas')
        if (res?.data) {
          toast.success('Успешно')
          getList({
            page: 1,
            pageSize: 20,
          })
          onClose()
        }
      })
      .catch((err) => console.log('err', err))
  }
  return (
    <>
      <CModal size="xl" visible={visible} onClose={onClose} backdrop="static">
        <CModalHeader>
          <CModalTitle>Заказ № ( {item?.id} )</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow xs={{ gutter: 2 }}>
            <CCol xs={{ span: 6 }}>
              <CCallout className="p-2 m-0" color="primary">
                Имя заказчика
              </CCallout>
            </CCol>
            <CCol xs={{ span: 6 }}>
              <CListGroup>
                <CFormInput
                  name="user_name"
                  onChange={handleInputChange}
                  value={params?.user_name}
                />
              </CListGroup>
            </CCol>
            <CCol xs={{ span: 6 }}>
              <CCallout className="p-2 m-0" color="primary">
                Номер заказчика
              </CCallout>
            </CCol>
            <CCol xs={{ span: 6 }}>
              <CListGroup>
                <CFormInput
                  name="user_number"
                  onChange={handleInputChange}
                  value={params?.user_number}
                />
              </CListGroup>
            </CCol>
            <CCol xs={{ span: 6 }}>
              <CCallout className="p-2 m-0" color="primary">
                Статус заказа
              </CCallout>
            </CCol>
            <CCol xs={{ span: 6 }}>
              <CListGroup>
                <CFormSelect
                  name="status"
                  className="w-50"
                  value={params?.status}
                  onChange={handleInputChange}
                  options={statusList?.map((item) => ({
                    label: item?.name,
                    value: item?.value,
                  }))}
                  style={{
                    background: setStaticColorFromStatus(Number(params?.status)),
                  }}
                />
                {/* <CListGroupItem className="p-2">
                {
                  <CBadge className="p-2" color={setColorFromStatus(item?.status)}>
                    {setTextFromStatus(item?.status)}
                  </CBadge>
                }
              </CListGroupItem> */}
              </CListGroup>
            </CCol>
            <CCol xs={{ span: 6 }}>
              <CCallout className="p-2 m-0" color="primary">
                Время
              </CCallout>
            </CCol>
            <CCol xs={{ span: 6 }}>
              <CListGroup>
                <CListGroupItem className="p-2">{item?.created_at}</CListGroupItem>
              </CListGroup>
            </CCol>
            <CCol xs={{ span: 12 }} onClick={() => setModal(true)}>
              <CCallout className="p-2 m-0" color="primary">
                Товары ( {stateProducts?.length} )
              </CCallout>
            </CCol>
            <CCol xs={{ span: 12 }}>
              <div className="overflow-x-auto">
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">ИД</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Картинка</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Имя</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Количество</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Код</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Сумма</CTableHeaderCell>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="col">
                        <CFormSelect
                          name="code"
                          value={productParams?.code}
                          onChange={(e) => {
                            handleChangeInput('code', e.target.value)
                            getProducts({
                              page: 1,
                              pageSize: 20,
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
                  {products?.data?.length > 0 && 'Поиск по коду'}
                  <CTableBody>
                    {products?.data?.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{item?.id}</CTableHeaderCell>
                        <CTableDataCell>{item?.title}</CTableDataCell>
                        <CTableDataCell>
                          <img src={BASE_URL + item?.img} width={50} height={50} alt="" />
                        </CTableDataCell>
                        <CTableDataCell>{item?.count}</CTableDataCell>
                        <CTableDataCell>{item?.code}</CTableDataCell>
                        <CTableDataCell>{item?.price}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color={`${isHas(stateProducts, item?.id) ? 'danger' : 'primary'}`}
                            onClick={() => toggleProduct(item)}
                          >
                            {isHas(stateProducts, item?.id) ? 'Удалить' : 'Добавить'}
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                  {stateProducts?.length > 0 && 'Ваши товары'}
                  <CTableBody>
                    {stateProducts?.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{item?.id}</CTableHeaderCell>
                        <CTableDataCell>{item?.title}</CTableDataCell>
                        <CTableDataCell>
                          <img src={BASE_URL + item?.img} width={50} height={50} alt="" />
                        </CTableDataCell>
                        <CTableDataCell>{item?.count}</CTableDataCell>
                        <CTableDataCell>{item?.code}</CTableDataCell>
                        <CTableDataCell>{item?.price}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSubmit}>
            Сохранить
          </CButton>
        </CModalFooter>
      </CModal>
      <StateProductsModal visible={modal} onClose={() => setModal(false)} />
    </>
  )
}

export default OrderEditModal

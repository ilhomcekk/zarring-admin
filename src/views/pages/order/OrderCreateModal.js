import { cilMinus, cilPlus, cilTrash } from '@coreui/icons'
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
import productStore from '../../../store/products'
import handleProductsStore from '../../../store/handleProducts'
import { isHas } from '../../../utils'
import StateProductsModal from './StateProducts'
import orderStore from '../../../store/order'

const OrderCreateModal = ({ visible, onClose }) => {
  const [modal, setModal] = useState(false)
  const { create, createLoading } = orderStore()
  const { getList } = OrderEditstore()
  const { stateProducts, toggleProduct, clearProducts } = handleProductsStore()
  console.log(stateProducts)
  const { productCodes, getList: getProducts, list: products, clearList } = productStore()
  const [params, setParams] = useState({
    user_name: '',
    user_number: '',
    products: stateProducts,
  })
  const [productParams, setProductParams] = useState({
    page: 1,
    pageSize: 20,
    code: null,
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setParams({ ...params, [name]: value })
  }
  const handleChangeInput = (name, value) => {
    setProductParams({ ...params, [name]: value })
  }
  const clearParams = () => {
    setParams({ user_name: '', user_number: '', products: stateProducts })
  }

  useEffect(() => {
    setParams((prev) => ({ ...prev, products: stateProducts }))
  }, [stateProducts])

  const handleSubmit = () => {
    if (!params.user_name) {
      toast.error('Заполните имя')
    } else if (!params.user_number) {
      toast.error('Заполните номер телефона')
    } else if (params.products?.length < 1) {
      toast.error('Добавьте товар')
    } else {
      create(params).then((res) => {
        if (res?.data?.id) {
          toast.success('Заказ успешно добавлено')
          onClose()
          clearProducts()
          getList()
          clearParams()
        }
      })
    }
  }
  useEffect(() => {
    if (visible) {
      clearList()
    }
  }, [visible])
  return (
    <>
      <CModal size="xl" visible={visible} onClose={onClose} backdrop="static">
        <CModalHeader>
          <CModalTitle>Создать заказ</CModalTitle>
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
                      <CTableHeaderCell scope="col">Имя</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Картинка</CTableHeaderCell>
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
                  <CTableBody>
                    {products?.data?.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{item?.id}</CTableHeaderCell>
                        <CTableDataCell>{item?.title}</CTableDataCell>
                        <CTableDataCell>
                          <img src={BASE_URL + item?.img} width={50} height={50} alt="" />
                        </CTableDataCell>
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
                </CTable>
              </div>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" disabled={createLoading} onClick={handleSubmit}>
            {createLoading ? 'Загрузка' : 'Сохранить'}
          </CButton>
        </CModalFooter>
      </CModal>
      <StateProductsModal visible={modal} onClose={() => setModal(false)} />
    </>
  )
}

export default OrderCreateModal

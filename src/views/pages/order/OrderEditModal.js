import { cilPen, cilTrash } from '@coreui/icons'
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
import Zoom from 'react-medium-image-zoom'

const OrderEditModal = ({ visible, onClose, id }) => {
  const [modal, setModal] = useState(false)
  const { setProducts, stateProducts, toggleProduct, selectedSizes, setSelectedSizes } =
    handleProductsStore()
  const handleSelectSize = (productId, size) => {
    const prevSizes = selectedSizes
    if (prevSizes[productId] === size) {
      const updated = { ...prevSizes }
      delete updated[productId]
      setSelectedSizes(updated)
    } else {
      setSelectedSizes({
        ...prevSizes,
        [productId]: size,
      })
    }
  }
  console.log(stateProducts)
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
    if (!params.user_name) {
      toast.error('Заполните имя')
    } else if (!params.user_number) {
      toast.error('Заполните номер телефона')
    } else if (params.products?.length < 1) {
      toast.error('Добавьте товар')
    } else {
      const updatedProducts = params.products?.map((product) => ({
        ...product,
        selected_size: selectedSizes?.[product.id] || product?.selected_size || null,
      }))
      const updatedParams = {
        ...params,
        products: updatedProducts,
      }
      edit(id, updatedParams)
        .then((res) => {
          console.log(res, 'asdasdas')
          if (res?.data) {
            toast.success('Успешно')
            getList({
              page: 1,
              pageSize: 20,
            })
            onClose()
            setProductParams({
              page: 1,
              pageSize: 20,
              code: null,
            })
            setSelectedSizes({})
          }
        })
        .catch((err) => console.log('err', err))
    }
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
                    color: '#fff',
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
            <CCol xs={{ span: 12 }} onClick={() => setModal(true)} style={{ cursor: 'pointer' }}>
              <CCallout className="p-2 m-0" color="primary">
                Товары ( {stateProducts?.length} ) <CIcon icon={cilPen} />
              </CCallout>
            </CCol>
            <CCol xs={{ span: 12 }}>
              <div className="overflow-x-auto">
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">ИД</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Имя</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Размеры</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Картинка</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Количество</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Код</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Сумма</CTableHeaderCell>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
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
                          <div className="d-flex flex-wrap gap-1">
                            {Array.isArray(item?.size)
                              ? item?.size?.map((sizeItem, idx) => (
                                  <div
                                    style={{
                                      border: '1px solid #dadada',
                                      padding: '0.3rem',
                                      borderRadius: '4px',
                                      cursor: 'pointer',
                                      minWidth: '32px',
                                      textAlign: 'center',
                                      backgroundColor:
                                        selectedSizes[item?.id] === sizeItem
                                          ? '#6261CC'
                                          : 'transparent',
                                      color:
                                        selectedSizes[item?.id] === sizeItem ? '#fff' : 'inherit',
                                    }}
                                    key={idx}
                                    onClick={() => handleSelectSize(item?.id, sizeItem)}
                                  >
                                    {sizeItem}
                                  </div>
                                ))
                              : item?.size}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <Zoom>
                            <img src={BASE_URL + item?.img} width={50} height={50} alt="" />
                          </Zoom>
                        </CTableDataCell>
                        <CTableDataCell>{item?.count}</CTableDataCell>
                        <CTableDataCell>{item?.code}</CTableDataCell>
                        <CTableDataCell>{item?.price}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color={`${isHas(stateProducts, item?.id) ? 'danger' : 'primary'}`}
                            onClick={() => toggleProduct(item, selectedSizes)}
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
                        <CTableHeaderCell scope="row" style={{ width: '80px' }}>
                          {item?.id}
                        </CTableHeaderCell>
                        <CTableDataCell>{item?.title}</CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex gap-1">
                            <div
                              style={{
                                border: '1px solid #dadada',
                                padding: '0.3rem',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                minWidth: '32px',
                                textAlign: 'center',
                                backgroundColor: 'transparent',
                                color: 'inherit',
                              }}
                            >
                              {selectedSizes?.[item?.id]
                                ? selectedSizes?.[item?.id]
                                : item?.selected_size}
                            </div>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <Zoom>
                            <img src={BASE_URL + item?.img} width={50} height={50} alt="" />
                          </Zoom>
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

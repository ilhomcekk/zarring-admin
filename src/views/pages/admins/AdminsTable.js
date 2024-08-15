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
import AdminsShowModal from './AdminsShowModal'
import AdminsEditModal from './AdminsEditModal'
import PageLoading from '../../../components/PageLoading/PageLoading'
import adminsStore from '../../../store/admins'
import {
  findRoleColorFromNumber,
  findRoleFromNumber,
  findStatusColorFromNumber,
  findStatusFromNumber,
} from '../../../utils'

const AdminsProductsTable = () => {
  const { getList, list, remove, deleteLoading, listLoading } = adminsStore()
  const [item, setItem] = useState({})
  const [idItem, setIdItem] = useState(null)
  const [params, setParams] = useState({
    page: 1,
    pageSize: 20,
    id: null,
    login: null,
    name: null,
    phone: null,
    role: null,
    status: null,
    created_at: null,
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
              <CTableHeaderCell scope="col">Логин</CTableHeaderCell>
              <CTableHeaderCell scope="col">Имя</CTableHeaderCell>
              <CTableHeaderCell scope="col">Номер телефона</CTableHeaderCell>
              <CTableHeaderCell scope="col">Роль</CTableHeaderCell>
              <CTableHeaderCell scope="col">Статус</CTableHeaderCell>
              <CTableHeaderCell scope="col">Дата создания</CTableHeaderCell>
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
                  value={params?.login}
                  onChange={(e) => handleChangeInput('login', e.target.value)}
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
              <CTableHeaderCell scope="col">
                <CFormInput
                  type="text"
                  value={params?.phone}
                  onChange={(e) => handleChangeInput('phone', e.target.value)}
                  onKeyPress={handleSearch}
                />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput
                  type="text"
                  value={params?.role}
                  onChange={(e) => handleChangeInput('role', e.target.value)}
                  onKeyPress={handleSearch}
                />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <CFormInput
                  type="text"
                  value={params?.status}
                  onChange={(e) => handleChangeInput('status', e.target.value)}
                  onKeyPress={handleSearch}
                />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {list?.map((item, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{item?.id}</CTableHeaderCell>
                <CTableDataCell>{item?.login}</CTableDataCell>
                <CTableDataCell>{item?.name}</CTableDataCell>
                <CTableDataCell>{item?.phone}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={findRoleColorFromNumber(item?.role)}>
                    {findRoleFromNumber(item?.role)}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color={findStatusColorFromNumber(item?.status)}>
                    {findStatusFromNumber(item?.status)}
                  </CBadge>
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
          </CTableBody>
        </CTable>
      </div>
      <AdminsShowModal visible={showModal} onClose={() => setShowModal(false)} item={item} />
      <AdminsEditModal visible={editModal} onClose={() => setEditModal(false)} id={idItem} />
      <PageLoading loading={listLoading} />
    </>
  )
}

export default AdminsProductsTable

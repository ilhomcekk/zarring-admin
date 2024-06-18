import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CFormInput,
  CTableRow,
} from '@coreui/react'
import { useState } from 'react'
import { cilTrash, cilZoom } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo' },
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat' },
    { id: 3, firstName: 'Larry the Bird', lastName: '', username: '@twitter' },
  ])
  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Username</CTableHeaderCell>
          <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell scope="col"></CTableHeaderCell>
          <CTableHeaderCell scope="col">
            <CFormInput type="text" placeholder="Filter by First Name" name="firstName" />
          </CTableHeaderCell>
          <CTableHeaderCell scope="col">
            <CFormInput type="text" placeholder="Filter by Last Name" name="lastName" />
          </CTableHeaderCell>
          <CTableHeaderCell scope="col">
            <CFormInput type="text" placeholder="Filter by Username" name="username" />
          </CTableHeaderCell>
          <CTableHeaderCell scope="col"></CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {products.map((product, index) => (
          <CTableRow key={product.id}>
            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
            <CTableDataCell>{product.firstName}</CTableDataCell>
            <CTableDataCell>{product.lastName}</CTableDataCell>
            <CTableDataCell>{product.username}</CTableDataCell>
            <CTableDataCell>
              <CButton color="primary" variant="outline" className="mr-2">
                <CIcon icon={cilZoom} />
              </CButton>
              <CButton color="danger" variant="outline" onClick={() => handleDelete(product.id)}>
                <CIcon icon={cilTrash} />
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default Products

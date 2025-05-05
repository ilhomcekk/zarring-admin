import {
  CButton,
  CHeader,
  CLoadingButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react-pro'
import React from 'react'
import { modalsStore } from '../../../store/index'

const ConfirmModal = ({ onConfirm, onClose, id, loading }) => {
  const { modals, closeModal } = modalsStore()
  return (
    <CModal
      visible={modals.confirm}
      onClose={() => {
        onClose()
        closeModal('confirm')
      }}
    >
      <CHeader>
        <CModalTitle>Подтверждение ( ID: {id} )</CModalTitle>
      </CHeader>
      <CModalBody>Вы точно хотите удалить?</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => closeModal('confirm')}>
          Закрыть
        </CButton>
        <CButton disabled={loading} loading={loading} color="primary" onClick={onConfirm}>
          Удалить
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ConfirmModal

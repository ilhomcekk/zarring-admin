import React, { useState, useEffect } from 'react'
import { format, parse } from 'date-fns'
import { CButton, CDateRangePicker } from '@coreui/react-pro'
import { addFilter } from '../../../utils'
import CIcon from '@coreui/icons-react'
import { cilXCircle } from '@coreui/icons'

const DatePicker = ({ params, setParams, handleSearch, column, onClear, label, style }) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const removeFilter = () => {
    // onClear(setParams, column, null)
    // onClear(setParams, column, null, 'between')
  }

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate)
    setEndDate(newEndDate)

    if (newStartDate && newEndDate) {
      const formattedValue = `${format(newStartDate, 'yyyy-MM-dd')}_${format(newEndDate, 'yyyy-MM-dd')}`
      addFilter(setParams, column, formattedValue)
    } else {
      // onClear()
    }
  }

  return (
    <div>
      {label ? <div style={{ marginBottom: '8px' }}>{label}</div> : null}
      <CDateRangePicker
        footer
        confirmButton={
          <CButton color="primary" onClick={handleSearch}>
            Искать
          </CButton>
        }
        style={style}
        locale="ru-RU"
        placeholder={['Дата нач', 'дата окон']}
        inputDateParse={(date) => parse(date, 'yyyy-MM-dd', new Date())}
        inputDateFormat={(date) => format(new Date(date), 'MMMM dd, yyyy')}
        onStartDateChange={(date) => handleDateChange(date, endDate)}
        onEndDateChange={(date) => handleDateChange(startDate, date)}
        startDate={startDate}
        endDate={endDate}
        cancelButton={false}
        todayButton={false}
        cleaner={
          <div style={{ position: 'relative', width: '18px', height: '24px', cursor: 'pointer' }}>
            <CIcon
              icon={cilXCircle}
              style={{
                width: '18px',
                height: '24px',
                '--ci-primary-color': '#fff',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
              }}
              onClick={onClear}
            ></div>
          </div>
        }
      />
    </div>
  )
}

export default DatePicker

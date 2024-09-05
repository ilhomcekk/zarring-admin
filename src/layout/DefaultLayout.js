import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import authStore from '../store/auth'
import { getToken, removeToken } from '../helpers/api'
import { useNavigate } from 'react-router-dom'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const { getMe } = authStore()

  useEffect(() => {
    const token = getToken()
    if (!token) {
      navigate('/login')
    } else {
      getMe()
        .then((res) => {
          console.log('asdasdasdas', res)
          if (res?.response?.status === 401) {
            navigate('/login')
            removeToken()
          }
        })
        .catch((err) => {
          // if (err?.response?.status === 401) {
          navigate('/login')
          removeToken()
          // }
        })
    }
  }, [])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout

import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

const ProtectedRoutes = (props) => {
  const location = useLocation()
  const auth = localStorage.getItem('logIn')
  return auth   ? <><Outlet /></> : <Navigate to={'/login'} state={{from:location}} replace />
}

export default ProtectedRoutes
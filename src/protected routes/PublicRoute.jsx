import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {

  const user = { name: 'ck', role: 'admin' }
  // const user = null

  if (user && (user.role === "admin" || user.role === "sub-admin")) {
    return <Navigate to="/admin/dashboard" replace />;
  }


  return (
    <Outlet />
  )
}

export default PublicRoute
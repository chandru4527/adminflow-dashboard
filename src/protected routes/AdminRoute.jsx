import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
  
  const user = null

  if (!user) {
    return <Navigate to='/admin/login' />
  }

    // Allow only admin and sub-admin
  if (user.role !== "admin" && user.role !== "sub-admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return (<Outlet />)
}

export default AdminRoute
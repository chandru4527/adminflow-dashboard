import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {

  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user && (user.role === "admin" || user.role === "sub-admin")) {
    return <Navigate to="/admin/dashboard" replace />;
  }


  return (
    <Outlet />
  )
}

export default PublicRoute
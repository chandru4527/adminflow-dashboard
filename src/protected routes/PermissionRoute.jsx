import React from 'react'

const PermissionRoute = ({permission, children}) => {

    const user = JSON.parse(sessionStorage.getItem("user"));

    if(!user) return <Navigate to="/admin/login" replace />

    if(user === 'admin' || user.permissions?.[permission]) {
        return children
    }

  return children
}

export default PermissionRoute
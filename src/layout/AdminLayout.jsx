import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const AdminLayout = () => {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className='flex min-h-screen bg-gray-100 w-full'>

      {/* aside */}
      <Sidebar collapsed={collapsed} />

      <div className="flex-1 flex flex-col">
        {/* navbar */}
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* main */}
        <main className="flex-1 p-6">

          <Outlet />

        </main>

      </div>

    </div>
  )
}

export default AdminLayout
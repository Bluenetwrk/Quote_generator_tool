import React from 'react'
import { useNavigate, Outlet, Navigate } from 'react-router-dom'

function Private() {
  const EmployeetAuth = localStorage.getItem("EmpLog")
  return (
    EmployeetAuth ? <Outlet/> : <Navigate to = "/" />
  )
}

export default Private
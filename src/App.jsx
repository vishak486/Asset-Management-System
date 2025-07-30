import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import VendorList from './pages/VendorList'
import AssetList from './pages/AssetList'
import GrnList from './pages/GrnList'
import { useSelector } from 'react-redux'

function App() {

  // const isLoggedIn = !!sessionStorage.getItem("token");
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/vendors" element={token ? <VendorList /> : <Navigate to="/" />} />
        <Route path="/assets" element={token ? <AssetList /> : <Navigate to="/" />} />
        <Route path="/grns" element={token ? <GrnList /> : <Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App

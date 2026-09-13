import { useState } from 'react'

import VerifyOtp from './pages/VerifyOtp';
import OpenRoute from './component/core/Auth/OpenRoute'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './component/common/Navbar';

import Login from './pages/Login';

import Signup from './pages/Signup';


function App() {

  return (
    <div className='w-screen min-h-screen bg-[#000814] flex flex-col'>

      <NavBar/>

      <Routes >
        <Route path="/" element={<Home/>} />  

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route path="/verify-email" element={<VerifyOtp />} />
      </Routes>
    </div>
  )
}

export default App;

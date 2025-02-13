"use client";
import React from 'react'
import LogOutButton from '../ui/logout'

const Header = () => {
  return (
      <nav className="sticky left-0 top-0 h-[100vh] w-[20vw] bg-gradient-to-br from-slate-700  to-slate-700">
            <h1 className="text-white font-bold text-2xl md:text-3xl md:px-4 py-1 px-2">Clarity</h1>
            <ul className="max-h-[100vh] overflow-y-auto">
              <li className=" bg-slate-500  text-white border-slate-500 text-md md:px-6 py-1 px-4 hover:bg-slate-600 w-100">Home</li>
              <li className=" bg-slate-500 text-white border-slate-500 text-md md:px-6 py-1 px-4 hover:bg-slate-600 w-100">Dashboard</li>
              <li className=" bg-slate-500 text-white border-slate-500 text-md md:px-6 py-1 px-4 hover:bg-slate-600 w-100">About</li>
              <li className=" bg-slate-500 text-white border-slate-500 text-md md:px-6 py-1 px-4 hover:bg-slate-600 w-100"><LogOutButton/></li> 
            </ul>
    </nav>
  )
}

export default Header

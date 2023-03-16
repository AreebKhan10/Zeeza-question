import React from 'react'
import  logo from '../assets/Logo.png'

export default function Navbar() {
  return (
    <>
    <div className='h-20 flex flex-row bg-[#47529B]' >
      <img src={logo} className='w-52 h-16 mt-2 ml-2' ></img>
    </div>
    <div  className='h-12 flex flex-row bg-[#EFEEF5]'>
      <h3 className='mt-2 ml-12 text-[#1C3E57] font-medium text-xl'>Acadmic Report</h3> 
    </div>
    </>
  )
}

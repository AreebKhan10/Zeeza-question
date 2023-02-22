import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Questions from '../pages/Questions'
import StudentDetails from '../components/StudentDetails'

export default function FullLayout() {
  return (
    <div>
      <Navbar />
      <StudentDetails />
      <Questions />
      
    </div>
  )
}

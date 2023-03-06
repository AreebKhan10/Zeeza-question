import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Questions from '../pages/Questions'
import StudentDetails from '../components/StudentDetails'
import Loading from '../components/Loading'
import { useGlobalContext } from '../context'


export default function FullLayout() {
  var {loading} = useGlobalContext()

  if(loading){
    return <Loading />
  }


  return (
    <div>
      <Navbar />
      <StudentDetails />
      <Questions />
      
    </div>
  )
}

import React, { useEffect, useState } from "react";
import  logo from '../assets/Logo.png'
import { useGlobalContext } from '../context'

export default function Navbar() {
  
  const {stuDetails} = useGlobalContext()

  var total_question = 35;
  var total_answered = 0;
  stuDetails?.questions?.forEach((val,index) => {
   
    var answred_q = val.answeres
    total_answered += answred_q.length;
  });

  const percentage = (total_answered/ total_question) * 100


  return (
    <>
    <div className='flex flex-row bg-[#47529B] logoImage' >
      <img src={logo} className='w-100'></img>
    </div>
    <div  className='flex flex-row justify-between bg-[#EFEEF5] acdemicReport'>
      <h3 className='text-[#1C3E57] font-medium text-xl'>Acadmic Report</h3> 
      <div className="bg-[#EFEEF5] p-2 percentageRatio">
          <p className="text-[#47529B] text-md">{percentage ? Math.floor(percentage) : 0}% Complete</p>

          {/* <div class="overflow-hidden h-2 mb-2 text-xs flex rounded bg-white m-1">
            <div class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#47529B] w-1/4"></div>
          </div> */}
        </div>
    </div>
    </>
  )
}

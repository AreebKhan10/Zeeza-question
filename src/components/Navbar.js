import React, { useEffect, useState } from "react";
import axios from "axios";
import  logo from '../assets/Logo.png'

export default function Navbar() {
  const [stuDetails, setStuDetails] = useState({})


  useEffect(()=>{

    const searchParams = new URLSearchParams(document.location.search)
  
    const url =
        `https://31zctjiomj.execute-api.us-east-1.amazonaws.com/default/enhacereport?StudentID=${searchParams.get('StudentID')}&Token=${searchParams.get('Token')}`;
  
      axios
        .get(url)
        .then((res) => {
          setStuDetails(res.data)
          console.log(res, "Responce")})
        .catch((err) => console.log(err));
  
  },[])

  console.log(stuDetails, "<---- in nav")

  // const totalanswered = stuDetails?.questions?.map(x => x.questions)
  // const filteredArray = totalanswered?.filter(obj => obj[0].answered === true);
  // console.log(filteredArray, "<----filteredArray")

  var total_question = 0;
  var total_answered = 0;
  stuDetails?.questions?.forEach((val,index) => {
    total_question += val.questions.length;
    var answred_q = val.questions.filter(x => x.answered === true);
    total_answered += answred_q.length;
  });

  console.log(total_question,'----------total_question');
  console.log(total_answered,'----------total_answered');
  const percentage = (total_answered/ total_question) * 100

  console.log(percentage, "<----percentage")

  // console.log(totalanswered.map(result=>{
  //   result = result.answered.filter(course=> )
  //   return result
  // }))
  // console.log(totalanswered.filter(x => x.every(c => c.answered === true)), "<---- totalanswered")

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

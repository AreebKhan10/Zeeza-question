import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentDetails() {

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

console.log(stuDetails)

  return (
    <div className="studentTableWrapper bg-white">
      <table class="studentTable table-auto text-medium text-[#1C3E57]">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Age</th>
            <th>School</th>
            <th>Grade</th>
            <th>Provider Name</th>
            <th>Service Provided</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
            
          <tr className="text-normal text-[#1C3E57]">
          
            <td>
              {stuDetails.FirstName ?` ${stuDetails.FirstName} ${stuDetails.LastName} `:
              <svg class="animate-spin h-5 w-5  bg-indigo-500" viewBox="0 0 24 24"> </svg> 
                }
            </td>
            <td>{stuDetails.Age ? stuDetails.Age :
              <svg class="animate-spin h-5 w-5  bg-indigo-500" viewBox="0 0 24 24"> </svg> 
            }</td>
            <td>{stuDetails.School}</td>
            <td>{stuDetails.Grade}</td>
            <td>{stuDetails.ProviderName}</td>
            <td>{stuDetails.ServiceProvided}</td>
            <td>{stuDetails.Hours}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

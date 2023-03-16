import React from "react";

export default function StudentDetails() {
  return (
    <div className="sticky top-0 bg-white">
      <table class="table-auto border-2  border-b-[#EFEEF5] w-full  text-medium text-[#1C3E57]">
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
          <tr className="text-normal text-[#1C3E57] text-center">
            <td>Darrell Steward</td>
            <td>8</td>
            <td>Ronald Richards</td>
            <td>6</td>
            <td>Savannah Nguyen</td>
            <td>Speech therapy</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
    </div>

    // <div  className="border-2 border-b-[#EFEEF5]" >

    //     <div className="flex flex-row justify-around ml-60 text-[#1C3E57]">
    //         <h3 className="p-2 font-medium">Student Name</h3>
    //         <h3 className="p-2 ml-4 font-medium">Age</h3>
    //         <h3 className="p-2 ml-4 font-medium">School</h3>
    //         <h3 className="p-2 ml-4 font-medium">Grade</h3>
    //         <h3 className="p-2 ml-4 font-medium">Provider Name</h3>
    //         <h3 className="p-2 ml-4 font-medium">Service Provided</h3>
    //         <h3 className="p-2 ml-4 font-medium">Hours</h3>
    //     </div>
    //     <div className="flex flex-row justify-around ml-60 text-[#1C3E57]">
    //         <p className="p-2">Darrell Steward</p>
    //         <p className="p-2 ml-4">8</p>
    //         <p className="p-2 ml-4">Ronald Richards</p>
    //         <p className="p-2 ml-4">6</p>
    //         <p className="p-2 ml-4">Savannah Nguyen</p>
    //         <p className="p-2 ml-4">Speech therapy</p>
    //         <p className="p-2 ml-4">2</p>

    //     </div>

    // </div>
  );
}

import React, {useState, useContext, useEffect} from "react";
import axios from "axios";


const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [stuDetails, setStuDetails] = useState({})
    
    useEffect(()=>{

        const searchParams = new URLSearchParams(document.location.search)
      
        const url =
            `https://31zctjiomj.execute-api.us-east-1.amazonaws.com/default/enhacereport?StudentID=${searchParams.get('StudentID')}&Token=${searchParams.get('Token')}`;
      
          axios
            .get(url)
            .then((res) => {
                console.log(res, "<----IN CONTEXT")
                setStuDetails(res.data)
              console.log(res, "Responce")})
            .catch((err) => console.log(err));
      
      },[])


    return <AppContext.Provider value= {{
        stuDetails
      }} 
      >{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
  }

 export { AppContext, AppProvider }
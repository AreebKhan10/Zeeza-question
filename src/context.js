import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [stuDetails, setStuDetails] = useState({});
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filteredJSON, setFilteredJSON] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState([]);
  const [submit,setSubmit] = useState(false);
  const [disable, setDisable] = useState(false)
  const [update, setUpdate] = useState(false)
  // var filteredJSON = [];



  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
   
    const url = `https://31zctjiomj.execute-api.us-east-1.amazonaws.com/default/enhacereport?StudentID=${searchParams.get(
      "StudentID"
    )}&Token=${searchParams.get("Token")}`;

    axios
      .get(url)
      .then((res) => {
        setTotalQuestions(res.data.questions.length)
        setFilteredJSON(res.data.questions)
        setStuDetails(res.data);
        
        if(res.data){
          setLoading(false)
        }
      })
      .catch((err) => { 
          console.log(err)
         setLoading(false)
        
        });
    }, []);
    

    return (
      <AppContext.Provider
      value={{
        stuDetails,
        setPercentage,
        percentage,
        setStuDetails,
        filteredJSON,
        setFilteredJSON,
        loading,
        submit,
        setSubmit,
        disable, 
        setDisable,
        update, 
        setUpdate,
        totalQuestions,
        setTotalQuestions
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

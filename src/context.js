import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [stuDetails, setStuDetails] = useState({});
  const [percentage, setPercentage] = useState(0);
  const [filteredJSON, setFilteredJSON] = useState([]);
  // var filteredJSON = [];



  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);

    const url = `https://31zctjiomj.execute-api.us-east-1.amazonaws.com/default/enhacereport?StudentID=${searchParams.get(
      "StudentID"
    )}&Token=${searchParams.get("Token")}`;

    axios
      .get(url)
      .then((res) => {
        setStuDetails(res.data);
        var total_question = 38;
        var total_answered = 0;
        total_answered += res.data.questions.length;
        console.log(filteredJSON, "<----filteredJSONCONTEXT");
        const percentages = (total_answered / total_question) * 100;
        setPercentage(percentages);
        console.log(res, "Responce");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <AppContext.Provider
      value={{
        stuDetails,
        setPercentage,
        percentage,
        setStuDetails,
        filteredJSON,
        setFilteredJSON
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

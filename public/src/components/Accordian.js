import React, { useState, useRef, useEffect } from "react";
import ChevronClosed from "../assets/ChevronClosed.svg";
import ChevronOpen from "../assets/ChevronOpen.svg";
import check from "../assets/check.png";
import uncheck from "../assets/uncheck.png";

export default function Accordian({
  title,
  content,
  setMultiLimit,
  MultiLimit,
  QuesID,
  ID,
  Data,
  setData,
  MultiLimitSub,
  setMultiLimitSub,
}) {
  const [isOpened, setOpened] = useState(false);
  const [height, setHeight] = useState("0px");
  const contentElement = useRef(null);
  const [tileQues, settitleQues] = useState([]);
  const [contentQues, setContentQues] = useState([]);
  const [subgoal, setSubgoal] = useState(0);

  useEffect(() => {
    setData(Data);
    console.log(ID, "<---ID");
    console.log(MultiLimit, "<----- INDEXX");
  }, [MultiLimit, MultiLimitSub]);

  const HandleOpening = (index) => {
    setOpened(!isOpened);
    setSubgoal(index);
  };

  const handleCheckSupergoal = (index) => {
    setMultiLimitSub([]);
  };

  const handleCheckSubGoal = (i) => {
    //this is for math section
    if (ID === 1 && QuesID === 6) {
      var getallchecked = Data[ID].questions[QuesID].goalQues[
        subgoal
      ].text.filter((x) => x.check == true).length;

      var currentvalue =
        Data[ID].questions[QuesID].goalQues[subgoal].text[i].check;

      var totalsubchecked = 0;
      //Data[ID].questions[QuesID].goalQues.forEach((element) => {
      var filteredvalues = Data[ID].questions[QuesID].goalQues[
        subgoal
      ].text.filter((x) => x.check == true);
      totalsubchecked += filteredvalues.length;
      ///});

      if (currentvalue === true) {
        Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
          ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
          check: false,
        };
        if (getallchecked == 1) {
          Data[ID].questions[QuesID].goalQues[subgoal].check = false;
        }
        setData(Data);
      } else {
        if (getallchecked == 0) {
          Data[ID].questions[QuesID].goalQues[subgoal].check = true;
          setData(Data);
        }
        var totalsuperchecked = 0;
        var totalsupergoalselected = Data[ID].questions[QuesID].goalQues.filter(
          (x) => x.check == true
        );
        totalsuperchecked = totalsupergoalselected.length;
        if (totalsuperchecked < 3) {
          // Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
          //   ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
          //   check: true,
          // };
          // setData(Data);
          if (totalsubchecked < 3) {
            Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
              ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
              check: true,
            };
            setData(Data);
          } else {
            if (getallchecked == 0) {
              Data[ID].questions[QuesID].goalQues[subgoal].check = false;
              setData(Data);
            }
            alert(" only 6 allow");
          }
        } else {
          if (getallchecked == 0) {
            Data[ID].questions[QuesID].goalQues[subgoal].check = false;
            setData(Data);
          }
          alert(" only 3 allow");
        }
      }
    }
    if (ID === 1 && QuesID === 7) {
      var getallchecked = Data[ID].questions[QuesID].goalQues[
        subgoal
      ].text.filter((x) => x.check == true).length;

      var currentvalue =
        Data[ID].questions[QuesID].goalQues[subgoal].text[i].check;

      var totalsubchecked = 0;
      Data[ID].questions[QuesID].goalQues.forEach((element) => {
        var filteredvalues = element.text.filter((x) => x.check == true);
        totalsubchecked += filteredvalues.length;
      });

      if (currentvalue === true) {
        Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
          ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
          check: false,
        };
        if (getallchecked == 1) {
          Data[ID].questions[QuesID].goalQues[subgoal].check = false;
        }
        setData(Data);
      } else {
        if (getallchecked == 0) {
          Data[ID].questions[QuesID].goalQues[subgoal].check = true;
          setData(Data);
        }
        var totalsuperchecked = 0;
        var totalsupergoalselected = Data[ID].questions[QuesID].goalQues.filter(
          (x) => x.check == true
        );
        totalsuperchecked = totalsupergoalselected.length;
        if (totalsuperchecked < 4) {
          // Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
          //   ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
          //   check: true,
          // };
          // setData(Data);
          if (totalsubchecked < 5) {
            Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
              ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
              check: true,
            };
            setData(Data);
          } else {
            if (getallchecked == 0) {
              Data[ID].questions[QuesID].goalQues[subgoal].check = false;
              setData(Data);
            }
            alert(" only 5 allow");
          }
        } else {
          if (getallchecked == 0) {
            Data[ID].questions[QuesID].goalQues[subgoal].check = false;
            setData(Data);
          }
          alert(" only 3 allow");
        }
      }
    }
    if (ID === 2 && QuesID === 5) {
      var getallchecked = Data[ID].questions[QuesID].goalQues[
        subgoal
      ].text.filter((x) => x.check == true).length;

      var currentvalue =
        Data[ID].questions[QuesID].goalQues[subgoal].text[i].check;

      var totalsubchecked = 0;
      //Data[ID].questions[QuesID].goalQues.forEach((element) => {
      var filteredvalues = Data[ID].questions[QuesID].goalQues[
        subgoal
      ].text.filter((x) => x.check == true);
      totalsubchecked += filteredvalues.length;
      //});

      if (currentvalue === true) {
        Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
          ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
          check: false,
        };
        if (getallchecked == 1) {
          Data[ID].questions[QuesID].goalQues[subgoal].check = false;
        }
        setData(Data);
      } else {
        if (getallchecked == 0) {
          Data[ID].questions[QuesID].goalQues[subgoal].check = true;
          setData(Data);
        }
        var totalsuperchecked = 0;
        var totalsupergoalselected = Data[ID].questions[QuesID].goalQues.filter(
          (x) => x.check == true
        );
        totalsuperchecked = totalsupergoalselected.length;
        if (totalsuperchecked < 4) {
          // Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
          //   ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
          //   check: true,
          // };
          // setData(Data);
          if (totalsubchecked < 4) {
            Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
              ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
              check: true,
            };
            setData(Data);
          } else {
            if (getallchecked == 0) {
              Data[ID].questions[QuesID].goalQues[subgoal].check = false;
              setData(Data);
            }
            alert(" only 6 allow");
          }
        } else {
          if (getallchecked == 0) {
            Data[ID].questions[QuesID].goalQues[subgoal].check = false;
            setData(Data);
          }
          alert(" only 3 allow");
        }
      }
    }
    if (ID === 2 && QuesID === 6) {
      var getallchecked = Data[ID].questions[QuesID].goalQues[
        subgoal
      ].text.filter((x) => x.check == true).length;

      var currentvalue =
        Data[ID].questions[QuesID].goalQues[subgoal].text[i].check;

      var totalsubchecked = 0;
      //Data[ID].questions[QuesID].goalQues.forEach((element) => {
      var filteredvalues = Data[ID].questions[QuesID].goalQues[
        subgoal
      ].text.filter((x) => x.check == true);
      totalsubchecked += filteredvalues.length;
      //});

      if (currentvalue === true) {
        Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
          ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
          check: false,
        };
        if (getallchecked == 1) {
          Data[ID].questions[QuesID].goalQues[subgoal].check = false;
        }
        setData(Data);
      } else {
        if (getallchecked == 0) {
          Data[ID].questions[QuesID].goalQues[subgoal].check = true;
          setData(Data);
        }
        var totalsuperchecked = 0;
        var totalsupergoalselected = Data[ID].questions[QuesID].goalQues.filter(
          (x) => x.check == true
        );
        totalsuperchecked = totalsupergoalselected.length;
        if (totalsuperchecked < 4) {
          // Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
          //   ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
          //   check: true,
          // };
          // setData(Data);
          if (totalsubchecked < 3) {
            Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
              ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
              check: true,
            };
            setData(Data);
          } else {
            if (getallchecked == 0) {
              Data[ID].questions[QuesID].goalQues[subgoal].check = false;
              setData(Data);
            }
            alert(" only 6 allow");
          }
        } else {
          if (getallchecked == 0) {
            Data[ID].questions[QuesID].goalQues[subgoal].check = false;
            setData(Data);
          }
          alert(" only 3 allow");
        }
      }
    }
    if (ID === 3 && QuesID === 4) {
      var getallchecked = Data[ID].questions[QuesID].goalQues[
        subgoal
      ].text.filter((x) => x.check == true).length;

      var currentvalue =
        Data[ID].questions[QuesID].goalQues[subgoal].text[i].check;

      var totalsubchecked = 0;
      Data[ID].questions[QuesID].goalQues.forEach((element) => {
        var filteredvalues = element.text.filter((x) => x.check == true);
        totalsubchecked += filteredvalues.length;
      });

      if (currentvalue === true) {
        Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
          ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
          check: false,
        };
        if (getallchecked == 1) {
          Data[ID].questions[QuesID].goalQues[subgoal].check = false;
        }
        setData(Data);
      } else {
        if (getallchecked == 0) {
          Data[ID].questions[QuesID].goalQues[subgoal].check = true;
          setData(Data);
        }
        var totalsuperchecked = 0;
        var totalsupergoalselected = Data[ID].questions[QuesID].goalQues.filter(
          (x) => x.check == true
        );
        totalsuperchecked = totalsupergoalselected.length;
        if (totalsuperchecked < 4) {
          // Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
          //   ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
          //   check: true,
          // };
          // setData(Data);
          if (totalsubchecked < 6) {
            Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
              ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
              check: true,
            };
            setData(Data);
          } else {
            if (getallchecked == 0) {
              Data[ID].questions[QuesID].goalQues[subgoal].check = false;
              setData(Data);
            }
            alert(" only 6 allow");
          }
        } else {
          if (getallchecked == 0) {
            Data[ID].questions[QuesID].goalQues[subgoal].check = false;
            setData(Data);
          }
          alert(" only 3 allow");
        }
      }
    }
    if (ID === 3 && QuesID === 5) {
      var getallchecked = Data[ID].questions[QuesID].goalQues[
        subgoal
      ].text.filter((x) => x.check == true).length;

      var currentvalue =
        Data[ID].questions[QuesID].goalQues[subgoal].text[i].check;

      var totalsubchecked = 0;
      Data[ID].questions[QuesID].goalQues.forEach((element) => {
        var filteredvalues = element.text.filter((x) => x.check == true);
        totalsubchecked += filteredvalues.length;
      });

      if (currentvalue === true) {
        Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
          ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
          check: false,
        };
        if (getallchecked == 1) {
          Data[ID].questions[QuesID].goalQues[subgoal].check = false;
        }
        setData(Data);
      } else {
        if (getallchecked == 0) {
          Data[ID].questions[QuesID].goalQues[subgoal].check = true;
          setData(Data);
        }
        var totalsuperchecked = 0;
        var totalsupergoalselected = Data[ID].questions[QuesID].goalQues.filter(
          (x) => x.check == true
        );
        totalsuperchecked = totalsupergoalselected.length;
        if (totalsuperchecked < 4) {
          // Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
          //   ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
          //   check: true,
          // };
          // setData(Data);
          if (totalsubchecked < 6) {
            Data[ID].questions[QuesID].goalQues[subgoal].text[i] = {
              ...Data[ID].questions[QuesID].goalQues[subgoal].text[i],
              check: true,
            };
            setData(Data);
          } else {
            if (getallchecked == 0) {
              Data[ID].questions[QuesID].goalQues[subgoal].check = false;
              setData(Data);
            }
            alert(" only 6 allow");
          }
        } else {
          if (getallchecked == 0) {
            Data[ID].questions[QuesID].goalQues[subgoal].check = false;
            setData(Data);
          }
          alert(" only 3 allow");
        }
      }
    }
  };
  useEffect(() => {
    settitleQues(title);

    setContentQues(content);
    console.log("content in useeffect ", contentQues);
  }, [tileQues, contentQues, MultiLimitSub, MultiLimit]);
  console.log(title, "main title");
  return (
    <>
      {title?.goalQues?.map((record, index) => (
        <div
          onClick={() => HandleOpening(index)}
          className="border border-indigo-400"
        >
          <div className={"bg-indigo-300 p-4 flex justify-between text-white"}>
            <li className="flex flex-row mt-4 m-2">
              {record.check === true ? (
                <img
                  src={check}
                  className={"h-8 mr-2"}
                  onClick={() => handleCheckSupergoal(index)}
                />
              ) : (
                <img
                  src={uncheck}
                  className={"h-8 mr-2"}
                  onClick={() => handleCheckSupergoal(index)}
                />
              )}

              {record.value}
            </li>
            {/* {isOpened ? <ChevronOpen /> : <ChevronClosed />} */}
          </div>
          <>
            {subgoal === index &&
              record.text?.map((rec, i) => (
                <div
                  ref={contentElement}
                  // style=  {{ height: height }}
                  className="bg-gray-200 overflow-hidden transition-all duration-200"
                >
                  <p className="p-4">
                    <label class="inline-flex items-center p-2"></label>

                    <li className="flex flex-row mt-4 m-2">
                      {rec.check === true ? (
                        <img
                          src={check}
                          className={"h-8 mr-2"}
                          onClick={() => handleCheckSubGoal(i)}
                        />
                      ) : (
                        <img
                          src={uncheck}
                          className={"h-8 mr-2"}
                          onClick={() => handleCheckSubGoal(i)}
                        />
                      )}
                      {rec.text}
                    </li>
                  </p>
                </div>
              ))}
          </>
        </div>
      ))}
    </>
  );
}

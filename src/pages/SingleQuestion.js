import React, { useEffect, useState } from "react";
import check from "../assets/check.png";
import uncheck from "../assets/uncheck.png";
import axios from "axios";
import AccordianComponent from "../components/Accordian";

export default function SingleQuestion({
  setgoalLevel,
  singleQuestion,
  QuesID,
  setData,
  ID,
  Data,
  setMultiLimit,
  MultiLimit,
  CheckID,
  setUpdateCheck,
  MultiLimitSub,
  setMultiLimitSub,
  stuDetails,
}) {
  const [status, setStatus] = useState(false);

  const Option = singleQuestion?.question[QuesID]?.options?.map(
    (option) => option?.value
  );
  const value = singleQuestion?.question?.map((ques) => ques?.question);
  const quesTitle = singleQuestion?.question[QuesID];
  const quesContents = singleQuestion?.question[QuesID]?.goalQues?.map(
    (goal) => goal?.text
  );
  const checkindex =
    "options" in Data[ID].questions[QuesID]
      ? Data[ID].questions[QuesID].options.findIndex((p) => p.check == true)
      : -1;

  useEffect(() => {
    setData(Data);
    console.log(Data,'---helloooo')
  }, [Data, MultiLimit, MultiLimitSub]);

  const handleCheck = (index) => {
    if (ID == 0 && QuesID == 0) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );

      if (isChecked) {
        Data[ID].questions[QuesID].options[index] = {
          ...Data[ID].questions[QuesID].options[index],
          check: false,
        };
        setData(Data);
      } else {
        if (allChecked.length < Data[ID].questions[QuesID].max) {
          Data[ID].questions[QuesID].options[index] = {
            ...Data[ID].questions[QuesID].options[index],
            check: true,
          };
          setData(Data);
        } else {
          alert(`Only ${Data[ID].questions[QuesID].max} Allowed`);
        }
      }
    }
    if (ID == 0 && QuesID == 1) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
      setUpdateCheck(index);
    }
    if (ID == 0 && QuesID == 2) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (isChecked) {
        Data[ID].questions[QuesID].options[index] = {
          ...Data[ID].questions[QuesID].options[index],
          check: false,
        };
        setData(Data);
      } else {
        if (allChecked.length < Data[ID].questions[QuesID].max) {
          Data[ID].questions[QuesID].options[index] = {
            ...Data[ID].questions[QuesID].options[index],
            check: true,
          };
          setData(Data);
        } else {
          alert(`Only ${Data[ID].questions[QuesID].max} Allowed`);
        }
      }
    }
    if (ID == 0 && QuesID == 3) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (isChecked) {
        Data[ID].questions[QuesID].options[index] = {
          ...Data[ID].questions[QuesID].options[index],
          check: false,
        };
        setData(Data);
      } else {
        if (allChecked.length < Data[ID].questions[QuesID].max) {
          Data[ID].questions[QuesID].options[index] = {
            ...Data[ID].questions[QuesID].options[index],
            check: true,
          };
          setData(Data);
        } else {
          alert(`Only ${Data[ID].questions[QuesID].max} Allowed`);
        }
      }
    }
    if (ID == 0 && QuesID == 4) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
        setUpdateCheck(index);
      }
    }

    if (ID == 1 && QuesID == 0) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }
    if (ID == 1 && QuesID == 1) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }
    if (ID == 1 && QuesID == 2) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }
    if (ID == 1 && QuesID == 3) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (isChecked) {
        Data[ID].questions[QuesID].options[index] = {
          ...Data[ID].questions[QuesID].options[index],
          check: false,
        };
        setData(Data);
      } else {
        if (allChecked.length < Data[ID].questions[QuesID].max) {
          Data[ID].questions[QuesID].options[index] = {
            ...Data[ID].questions[QuesID].options[index],
            check: true,
          };
          setData(Data);
        } else {
          alert(`Only ${Data[ID].questions[QuesID].max} Allowed`);
        }
      }
    }
    if (ID == 1 && QuesID == 4) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }

    if (ID == 2 && QuesID == 0) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }
    if (ID == 2 && QuesID == 1) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }
    if (ID == 2 && QuesID == 2) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }
    if (ID == 2 && QuesID == 3) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );

      if (isChecked) {
        Data[ID].questions[QuesID].options[index] = {
          ...Data[ID].questions[QuesID].options[index],
          check: false,
        };
        setData(Data);
      } else {
        if (allChecked.length < Data[ID].questions[QuesID].max) {
          Data[ID].questions[QuesID].options[index] = {
            ...Data[ID].questions[QuesID].options[index],
            check: true,
          };
          setData(Data);
        } else {
          alert(`Only ${Data[ID].questions[QuesID].max} Allowed`);
        }
      }
    }
    if (ID == 2 && QuesID == 4) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }

    if (ID == 3 && QuesID == 0) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }
    if (ID == 3 && QuesID == 1) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }
    if (ID == 3 && QuesID == 2) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }
    if (ID == 3 && QuesID == 3) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }
    if (ID == 4 && QuesID == 0) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }
    if (ID == 4 && QuesID == 1) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }
    if (ID == 4 && QuesID == 2) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }
    if (ID == 4 && QuesID == 3) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (isChecked) {
        Data[ID].questions[QuesID].options[index] = {
          ...Data[ID].questions[QuesID].options[index],
          check: false,
        };
        setData(Data);
      } else {
        if (allChecked.length < Data[ID].questions[QuesID].max) {
          Data[ID].questions[QuesID].options[index] = {
            ...Data[ID].questions[QuesID].options[index],
            check: true,
          };
          setData(Data);
        } else {
          alert(`Only ${Data[ID].questions[QuesID].max} Allowed`);
        }
      }
    }
    if (ID == 4 && QuesID == 4) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (isChecked) {
        Data[ID].questions[QuesID].options[index] = {
          ...Data[ID].questions[QuesID].options[index],
          check: false,
        };
        setData(Data);
      } else {
        if (allChecked.length < Data[ID].questions[QuesID].max) {
          Data[ID].questions[QuesID].options[index] = {
            ...Data[ID].questions[QuesID].options[index],
            check: true,
          };
          setData(Data);
        } else {
          alert(`Only ${Data[ID].questions[QuesID].max} Allowed`);
        }
      }
    }
    if (ID == 4 && QuesID == 5) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (isChecked) {
        Data[ID].questions[QuesID].options[index] = {
          ...Data[ID].questions[QuesID].options[index],
          check: false,
        };
        setData(Data);
      } else {
        if (allChecked.length < Data[ID].questions[QuesID].max) {
          Data[ID].questions[QuesID].options[index] = {
            ...Data[ID].questions[QuesID].options[index],
            check: true,
          };
          setData(Data);
        } else {
          alert(`Only ${Data[ID].questions[QuesID].max} Allowed`);
        }
      }
    }
    if (ID == 4 && QuesID == 6) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (isChecked) {
        Data[ID].questions[QuesID].options[index] = {
          ...Data[ID].questions[QuesID].options[index],
          check: false,
        };
        setData(Data);
      } else {
        if (allChecked.length < Data[ID].questions[QuesID].max) {
          Data[ID].questions[QuesID].options[index] = {
            ...Data[ID].questions[QuesID].options[index],
            check: true,
          };
          setData(Data);
        } else {
          alert(`Only ${Data[ID].questions[QuesID].max} Allowed`);
        }
      }
    }

    if (ID == 5 && QuesID == 0) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var currentValue = Data[ID].questions[QuesID].options[index].value;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (isChecked) {
        Data[ID].questions[QuesID].options[index] = {
          ...Data[ID].questions[QuesID].options[index],
          check: false,
        };
        setData(Data);
      } else {
        if (currentValue != "none") {
          if (allChecked.length < Data[ID].questions[QuesID].max) {
            var noneIndex = Data[ID].questions[QuesID].options.findIndex(
              (x) => x.value == "none"
            );
            Data[ID].questions[QuesID].options[noneIndex].check = false;
            setData(Data);
            Data[ID].questions[QuesID].options[index] = {
              ...Data[ID].questions[QuesID].options[index],
              check: true,
            };
            setData(Data);
          } else {
            alert(`Only ${Data[ID].questions[QuesID].max} Allowed`);
          }
        } else {
          Data[ID].questions[QuesID].options.forEach((option, key) => {
            Data[ID].questions[QuesID].options[key] = {
              ...Data[ID].questions[QuesID].options[key],
              check: false,
            };
            setData(Data);
          });
          Data[ID].questions[QuesID].options[index] = {
            ...Data[ID].questions[QuesID].options[index],
            check: true,
          };
          setData(Data);
        }
      }
    }
    if (ID == 6 && QuesID == 0) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }
    if (ID == 5 && QuesID == 1) {
      var isChecked = Data[ID].questions[QuesID].options[index].check;
      var allChecked = Data[ID].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (!isChecked) {
        Data[ID].questions[QuesID].options.forEach((element, point) => {
          Data[ID].questions[QuesID].options[point].check = false;
          setData(Data);
        });
        Data[ID].questions[QuesID].options[index].check = true;
        setData(Data);
      }
    }

    setStatus(!status);
  };

  return (
    <div className="my-14 ml-40 mb-32">
      <p className="text-5xl">{singleQuestion?.title}</p>
      <p className="p-2 text-blue-800">
        {QuesID + 1} of {Data[ID].questions.length}
      </p>
      <p className="text-xl text-[#002B48]">{value[QuesID]?.replace("[name]", `${stuDetails.FirstName}'s`)}</p>
      <p className="p-2 text-blue-800">
        {Data[ID].questions[QuesID].description}
      </p>

      {singleQuestion.select === "Multi" ? (
        <>
          {singleQuestion.select === "Multi" ? (
            <>
              {singleQuestion?.question[QuesID]?.options?.map(
                (option, index) => {
                  if (!("isHidden" in option) || option.isHidden === false) {
                    return (
                      <li className="flex flex-row mt-4 m-2">
                        {option.check === true ? (
                          <img
                            src={check}
                            className={"h-8 mr-2"}
                            onClick={() => handleCheck(index)}
                          />
                        ) : (
                          <img
                            src={uncheck}
                            className={"h-8 mr-2"}
                            onClick={() => handleCheck(index)}
                          />
                        )}

                        {option.value}
                      </li>
                    );
                  }
                }
              )}
            </>
          ) : (
            <>
              {singleQuestion?.question[QuesID]?.options?.map(
                (option, index) => (
                  <li className="block px-4 py-2 hover:bg-gray-100">
                    <div onClick={() => handleCheck(index)}>
                      <label class="inline-flex items-center p-2">
                        <input
                          type="radio"
                          class="form-radio"
                          name="accountType"
                          value="personal"
                        />
                        {/* <span class="ml-2">{option.value}</span> */}
                        {option.text}
                      </label>
                    </div>
                  </li>
                )
              )}
            </>
          )}
        </>
      ) : singleQuestion.select === "Accordian" ? (
        <>
          <AccordianComponent
            setgoalLevel={setgoalLevel}
            title={quesTitle}
            content={quesContents}
            setMultiLimit={setMultiLimit}
            singleQuestion={singleQuestion}
            QuesID={QuesID}
            MultiLimit={MultiLimit}
            ID={ID}
            setData={setData}
            Data={Data}
            MultiLimitSub={MultiLimitSub}
            setMultiLimitSub={setMultiLimitSub}
          />
        </>
      ) : (
        <div class="p-5">
          <div class="group relative">
            <button
              type="button"
              class="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              {/* Select Your answer */}
              {checkindex >= 0
                ? Data[ID]?.questions[QuesID]?.options[checkindex]?.value
                : "Select Option"}
              <svg
                class="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <nav
              tabindex="0"
              class="b w-full b-2 bg-white invisible border-gray-300 rounded absolute left-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1"
            >
              <ul class="py-1">
                {
                  <>
                    {singleQuestion?.question[QuesID]?.options?.map(
                      (option, index) => {
                        if (
                          !("isHidden" in option) ||
                          option.isHidden === false
                        ) {
                          return (
                            <li className="block px-4 py-2 hover:bg-gray-100">
                              <div onClick={() => handleCheck(index)}>
                                <label
                                  class="flex items-center p-2 block"
                                  for={"accountType" + index}
                                >
                                  <input
                                    type="radio"
                                    class="form-radio"
                                    name={"accountType"}
                                    id={"accountType" + index}
                                    value="personal"
                                    checked={index == checkindex}
                                  />
                                  {/* <span class="ml-2">{option.value}</span> */}
                                  {option.value}
                                </label>
                              </div>
                            </li>
                          );
                        }
                      }
                    )}
                  </>
                }
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

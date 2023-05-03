import { data } from "autoprefixer";
import PreviousMap from "postcss/lib/previous-map";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useGlobalContext } from "../context";
import cogoToast from 'cogo-toast'

export default function Footer({
  setgoalLevel,
  goalLevel,
  setQuesID,
  QuesID,
  singleQuestion,
  setID,
  setMultiLimit,
  MultiLimit,
  setUpdateCheck,
  setData,
  Data,
  id,
  MultiLimitSub,
  setMultiLimitSub,
  QUESTIONS,
  // stuDetails,
  // filteredJSON,
  // setFilter
  initialData
}) {
  var {
    stuDetails,
    filteredJSON,
    setFilteredJSON,
    setSubmit,
    setUpdate,
    totalQuestions,
    setTotalQuestions,
  } = useGlobalContext();

  let [progress, setProgress] = useState("");
  const { setPercentage, percentage, setStuDetails, setDisable } =
    useGlobalContext();
  const groupNameArray = [
    "Background",
    "Decoding",
    "Reading Comprehension",
    "Math",
    "Speech and Language",
    "Social-emotional",
    "Summary",
  ];
  const uniqueArray = (array) => {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) a.splice(j--, 1);
      }
    }

    return a;
  };

  const isQuestionUpdate = (id, QuesID) => {
    if (Data[id].questions[QuesID].answered === true) {
      let parent = groupNameArray[id];
      var oldAnswer = filteredJSON.filter(
        (x) => x.groupName == parent && x.externalId == QuesID
      );
      let currentAnswer = [];
      console.log(filteredJSON, "<---filteredJSON");
      if (Data[id].questions[QuesID].select == "Accordian") {
        const getSelectedGoals = Data[id].questions[QuesID].goalQues.filter(
          (x) => x.check === true
        );
        for (const goal of getSelectedGoals) {
          const tempObj = {};
          tempObj.value = goal.value;
          tempObj.subAnswers = goal.text
            .filter((x) => x.check === true)
            .map((x) => x.text);
          currentAnswer.push(tempObj);
          // goal.text = goal.text.filter((x) => x.check === true);
        }
      } else {
        currentAnswer = Data[id].questions[QuesID].options
          .filter((x) => x.check === true)
          .map((x) => x.value);
      }

      console.log(
        JSON.stringify(oldAnswer),
        JSON.stringify(currentAnswer),
        "<---oldAnswer === currentAnswer"
      );
      if (
        JSON.stringify(oldAnswer[0].answeres) == JSON.stringify(currentAnswer)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const GradeLevels = [
    ["Nursery"],
    ["Kindergarten", "Pre1-A"],
    ["1",1],
    ["2",2],
    ["3",3],
    [4,"4"],
    ["5",5],
    ["6",6],
    ["7",7],
    ["8",8],
    ["9",9],
    ["10",10],
    ["11",11],
    ["12",12],
  ];

  const handleNext = () => {
    const grade = GradeLevels.findIndex((x) => x.includes(stuDetails.Grade));
    const checkUpdate = isQuestionUpdate(id, QuesID);
    if (id == 0 && QuesID == 0) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        cogoToast.error(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        if (checkUpdate === false) {
          var toShowOptions = [];
          Data[id].questions[QuesID].options.forEach((value, index) => {
            if (value.check === true) {
              toShowOptions = toShowOptions.concat(value.show);
            }
          });

          Data[id].questions[QuesID + 2].options.forEach((value, index) => {
            Data[id].questions[QuesID + 2].options[index].check = false;
            if (toShowOptions.includes(index)) {
              Data[id].questions[QuesID + 2].options[index].isHidden = false;
            } else {
              Data[id].questions[QuesID + 2].options[index].isHidden = true;
            }
            setData(Data);
          });
        }

        nextQuestion(id, QuesID);
      }
    }
    if (id == 0 && QuesID == 1) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        setUpdateCheck(-1);
        nextQuestion(id, QuesID);
      }
    }
    if (id == 0 && QuesID == 2) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        cogoToast.error(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 0 && QuesID == 3) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        cogoToast.error(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 0 && QuesID == 4) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        setUpdateCheck(-1);
        nextQuestion(id, QuesID);
      }
    }
    if (id == 1 && QuesID == 0) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 1 && QuesID == 1) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        if (checkUpdate === false) {
          Data[id].questions[QuesID + 1].options.forEach((value, index) => {
            if (Data[id].questions[QuesID + 1].options[index].level <= grade) {
              Data[id].questions[QuesID + 1].options[index].isHidden = false;
              setData(Data);
            } else {
              Data[id].questions[QuesID + 1].options[index].isHidden = true;
              setData(Data);
            }
          });
        }
        nextQuestion(id, QuesID);
      }
    }
    if (id == 1 && QuesID == 2) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 1 && QuesID == 3) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        cogoToast.error(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 1 && QuesID == 4) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        if (checkUpdate === false) {
          var option = [];
          var dependentLevel = Data[id].questions[
            Data[id].questions[QuesID + 1].dependQuestion
          ].options.filter((x) => x.check === true);
          Data[id].questions[QuesID + 1].suberGoals.forEach((value, index) => {
            if (
              value.level < grade + 1 &&
              value.level >= dependentLevel[0].level
            ) {
              var isPresenrt = option.filter((x) => x.value == value.title);
              if (!isPresenrt.length > 0) {
                var subGoals = [];
                value.subGoals.forEach((x) => {
                  subGoals.push({
                    text: x,
                    check: false,
                  });
                });
                option.push({
                  value: value.title,
                  text: subGoals,
                  check: false,
                });
              } else {
                var superGoalIndex = option.findIndex(
                  (p) => p.value == value.title
                );
                value.subGoals.forEach((x) => {
                  var exsitdGoal = option[superGoalIndex].text.filter(
                    (goal) => goal.text == x
                  );
                  if (!exsitdGoal.length > 0) {
                    option[superGoalIndex].text.push({
                      text: x,
                      check: false,
                    });
                  }
                });
              }
            }
          });
          Data[id].questions[QuesID + 1].goalQues = option;
          setData(Data);

          console.log("---------updated data");
        }
        nextQuestion(id, QuesID);
      }
    }
    if (id == 1 && QuesID == 5) {
      var allCheckded = Data[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
        //to check subgoal limit
      let allsublimit = allCheckded.map(x => x.text)
      let countTrue = 0;
      for (let array of allsublimit) {
        if (array.length >= 3) {
          let trueCount = 0;
          for (let obj of array) {
            if (obj.check) {
              trueCount++;
            }
          }
          if (trueCount >= 3) {
            countTrue++;
          }
        }
      }
      if (countTrue === allsublimit.filter(array => array.length >= 3).length) {
        if (allCheckded.length < 2) {
          cogoToast.error("minimum 2 Selection is Required");
        } else {
          if (checkUpdate === false) {
            var allAnsers = [];
            allCheckded.forEach((value, index) => {
              value.text.forEach((texval, point) => {
                if (texval.check === true){
                  allAnsers.push(texval.text);
                }
              });
            });
            
            var option = [];
            var dependentLevel = Data[id].questions[
              Data[id].questions[QuesID + 1].dependQuestion
            ].options.filter((x) => x.check === true);
            Data[id].questions[QuesID + 1].suberGoals.forEach((value, index) => {
              var isPresenrt = option.filter((x) => x.value == value.title);
              if (!isPresenrt.length > 0) {
                var subGoals = [];
                value.subGoals.forEach((x) => {
                  var exsitdGoal = subGoals.filter(
                    (goal) => goal.text == x.title
                  );
                  if (!exsitdGoal.length > 0) {
                    if (
                      x.level <= grade + 1 &&
                      x.level >= dependentLevel[0].level
                    ) {
                      if (!allAnsers.includes(x.title)) {
                        subGoals.push({
                          text: x.title,
                          check: false,
                        });
                      }
                    }
                  }
                });
                option.push({
                  value: value.title,
                  text: subGoals,
                  check: false,
                });
              } else {
                var superGoalIndex = option.findIndex(
                  (p) => p.value == value.title
                );
                value.subGoals.forEach((x) => {
                  var exsitdGoal = option[superGoalIndex].text.filter(
                    (goal) => goal.text == x.title
                  );
                  if (!exsitdGoal.length > 0) {
                    if (
                      x.level <= grade + 1 &&
                      x.level >= dependentLevel[0].level
                    ) {
                      if (!allAnsers.includes(x.title)) {
                        option[superGoalIndex].text.push({
                          text: x.title,
                          check: false,
                        });
                      }
                    }
                  }
                });
              }
            });
  
            Data[id].questions[QuesID + 1].goalQues = option;
            console.log(Data,"<----Data")
            setData(Data);
            console.log(Data, "this is the data");
          }
          nextQuestion(id, QuesID);
        }

      } else {
        cogoToast.error("select atleast 3 goals from each super goal.");
      }


     
    }
    if (id == 1 && QuesID == 6) {
      var allCheckded = Data[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
      var allsubChecked = 0;
      allCheckded.forEach((value, index) => {
        value.text.forEach((textval, textindex) => {
          if (textval.check === true) allsubChecked += 1;
        });
      });
      if (allsubChecked < 3) {
        cogoToast.error("minimum 3 Required");
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 2 && QuesID == 0) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 2 && QuesID == 1) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        if (checkUpdate === false) {
          Data[id].questions[QuesID + 1].options.forEach((value, index) => {
            if (Data[id].questions[QuesID + 1].options[index].level <= grade) {
              Data[id].questions[QuesID + 1].options[index].isHidden = false;
              setData(Data);
            } else {
              Data[id].questions[QuesID + 1].options[index].isHidden = true;
              setData(Data);
            }
          });
        }
        nextQuestion(id, QuesID);
      }
    }
    if (id == 2 && QuesID == 2) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 2 && QuesID == 3) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        cogoToast.error(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 2 && QuesID == 4) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        if (checkUpdate === false) {
          var option = [];
          var dependentLevel = Data[id].questions[
            Data[id].questions[QuesID + 1].dependQuestion
          ].options.filter((x) => x.check === true);
          Data[id].questions[QuesID + 1].suberGoals.forEach((value, index) => {
            if (
              value.level < grade + 1 &&
              value.level >= dependentLevel[0].level
            ) {
              var isPresenrt = option.filter((x) => x.value == value.title);
              if (!isPresenrt.length > 0) {
                var subGoals = [];
                value.subGoals.forEach((x) => {
                  subGoals.push({
                    text: x,
                    check: false,
                  });
                });
                option.push({
                  value: value.title,
                  text: subGoals,
                  check: false,
                });
              } else {
                var superGoalIndex = option.findIndex(
                  (p) => p.value == value.title
                );
                value.subGoals.forEach((x) => {
                  var exsitdGoal = option[superGoalIndex].text.filter(
                    (goal) => goal.text == x
                  );
                  if (!exsitdGoal.length > 0) {
                    option[superGoalIndex].text.push({
                      text: x,
                      check: false,
                    });
                  }
                });
              }
            }
          });
          Data[id].questions[QuesID + 1].goalQues = option;
          setData(Data);

          console.log(Data[id].questions[QuesID + 1], "---------updated data");
        }
        nextQuestion(id, QuesID);
      }
    }
    if (id == 2 && QuesID == 5) {
      var allCheckded = Data[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
       //to check subgoal limit
       let allsublimit = allCheckded.map(x => x.text)
       let countTrue = 0;
       for (let array of allsublimit) {
         if (array.length >= 3) {
           let trueCount = 0;
           for (let obj of array) {
             if (obj.check) {
               trueCount++;
             }
           }
           if (trueCount >= 3) {
             countTrue++;
           }
         }
       }
       if (countTrue === allsublimit.filter(array => array.length >= 3).length) {

         if (allCheckded.length < 2) {
           cogoToast.error("Two main super goals Required");
         } else {
           if (checkUpdate === false) {
             var allAnsers = [];
             allCheckded.forEach((value, index) => {
               value.text.forEach((texval, point) => {
                 if (texval.check === true) allAnsers.push(texval.text);
               });
             });
             var option = [];
             var dependentLevel = Data[id].questions[
               Data[id].questions[QuesID + 1].dependQuestion
             ].options.filter((x) => x.check === true);
             Data[id].questions[QuesID + 1].suberGoals.forEach((value, index) => {
               if (
                 value.level <= grade + 1 &&
                 value.level >= dependentLevel[0].level
               ) {
                 var isPresenrt = option.filter((x) => x.value == value.title);
                 if (!isPresenrt.length > 0) {
                   var subGoals = [];
                   value.subGoals.forEach((x) => {
                     var exsitdGoal = subGoals.filter((goal) => goal.text == x);
                     if (!exsitdGoal.length > 0) {
                       if (!allAnsers.includes(x)) {
                         subGoals.push({
                           text: x,
                           check: false,
                         });
                       }
                     }
                   });
                   option.push({
                     value: value.title,
                     text: subGoals,
                     check: false,
                   });
                 } else {
                   var superGoalIndex = option.findIndex(
                     (p) => p.value == value.title
                   );
                   value.subGoals.forEach((x) => {
                     var exsitdGoal = option[superGoalIndex].text.filter(
                       (goal) => goal.text == x
                     );
                     if (!exsitdGoal.length > 0) {
                       if (!allAnsers.includes(x)) {
                         option[superGoalIndex].text.push({
                           text: x,
                           check: false,
                         });
                       }
                     }
                   });
                 }
               }
             });
             Data[id].questions[QuesID + 1].goalQues = option;
             setData(Data);
           }
           nextQuestion(id, QuesID);
         }

       }else {
        cogoToast.error("select atleast 3 goals from each super goal.");
      }
    }
    if (id == 2 && QuesID == 6) {
      var allCheckded = Data[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
      //to check subgoal limit
      let allsublimit = allCheckded.map(x => x.text)
      let countTrue = 0;
      for (let array of allsublimit) {
        if (array.length >= 3) {
          let trueCount = 0;
          for (let obj of array) {
            if (obj.check) {
              trueCount++;
            }
          }
          if (trueCount >= 3) {
            countTrue++;
          }
        }
      }
      if (countTrue === allsublimit.filter(array => array.length >= 3).length) {

        if (allCheckded.length < 3) {
          cogoToast.error("Two main super goals Required");
        } else {
          nextQuestion(id, QuesID);
        }

      }else {
        cogoToast.error("select atleast 3 goals from each super goal.");
      }


    }
    if (id == 3 && QuesID == 0) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        if (checkUpdate === false) {
          Data[id].questions[QuesID + 1].options.forEach((value, index) => {
            if (Data[id].questions[QuesID + 1].options[index].level <= grade) {
              Data[id].questions[QuesID + 1].options[index].isHidden = false;
              setData(Data);
            } else {
              Data[id].questions[QuesID + 1].options[index].isHidden = true;
              setData(Data);
            }
          });
        }
        nextQuestion(id, QuesID);
      }
    }
    if (id == 3 && QuesID == 1) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 3 && QuesID == 2) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 3 && QuesID == 3) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        if (checkUpdate === false) {
          var option = [];
          var dependentLevel = Data[id].questions[
            Data[id].questions[QuesID + 1].dependQuestion
          ].options.filter((x) => x.check === true);
          Data[id].questions[QuesID + 1].suberGoals.forEach((value, index) => {
            if (
              value.level < grade + 1 &&
              value.level >= dependentLevel[0].level
            ) {
              var isPresenrt = option.filter((x) => x.value == value.title);
              if (!isPresenrt.length > 0) {
                var subGoals = [];
                value.subGoals.forEach((x) => {
                  subGoals.push({
                    text: x,
                    check: false,
                  });
                });
                option.push({
                  value: value.title,
                  text: subGoals,
                  check: false,
                });
              } else {
                var superGoalIndex = option.findIndex(
                  (p) => p.value == value.title
                );
                value.subGoals.forEach((x) => {
                  var exsitdGoal = option[superGoalIndex].text.filter(
                    (goal) => goal.text == x
                  );
                  if (!exsitdGoal.length > 0) {
                    option[superGoalIndex].text.push({
                      text: x,
                      check: false,
                    });
                  }
                });
              }
            }
          });
          Data[id].questions[QuesID + 1].goalQues = option;
          setData(Data);

          console.log(Data[id].questions[QuesID + 1], "---------updated data");
        }
        nextQuestion(id, QuesID);
      }
    }
    if (id == 3 && QuesID == 4) {
      var allCheckded = Data[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
      if (allCheckded.length < 3) {
        cogoToast.error("Three super goals required");
      } else {
        if (checkUpdate === false) {
          var allAnsers = [];
          allCheckded.forEach((value, index) => {
            value.text.forEach((texval, point) => {
              if (texval.check === true) allAnsers.push(texval.text);
            });
          });
          var option = [];
          var dependentLevel = Data[id].questions[
            Data[id].questions[QuesID + 1].dependQuestion
          ].options.filter((x) => x.check === true);
          Data[id].questions[QuesID + 1].suberGoals.forEach((value, index) => {
            var checkInHide = Data[id].questions[
              QuesID + 1
            ].removeSuperGoals.filter((x) => x.hide == value.title);
            var toAdd = true;
            if (checkInHide.length > 0) {
              allAnsers.every((x) => {
                if (checkInHide[0].titles.includes(x)) {
                  toAdd = false;
                  return false;
                }
                return true;
              });
            }
            if (
              value.level <= grade + 1 &&
              value.level >= dependentLevel[0].level &&
              toAdd
            ) {
              var isPresenrt = option.filter((x) => x.value == value.title);
              if (!isPresenrt.length > 0) {
                var subGoals = [];
                value.subGoals.forEach((x) => {
                  var exsitdGoal = subGoals.filter((goal) => goal.text == x);
                  if (!exsitdGoal.length > 0) {
                    if (!allAnsers.includes(x)) {
                      subGoals.push({
                        text: x,
                        check: false,
                      });
                    }
                  }
                });
                option.push({
                  value: value.title,
                  text: subGoals,
                  check: false,
                });
              } else {
                var superGoalIndex = option.findIndex(
                  (p) => p.value == value.title
                );
                value.subGoals.forEach((x) => {
                  var exsitdGoal = option[superGoalIndex].text.filter(
                    (goal) => goal.text == x
                  );
                  if (!exsitdGoal.length > 0) {
                    if (!allAnsers.includes(x)) {
                      option[superGoalIndex].text.push({
                        text: x,
                        check: false,
                      });
                    }
                  }
                });
              }
            }
          });

          option = option.filter((x) => x.text.length > 0);

          Data[id].questions[QuesID + 1].goalQues = option;
          setData(Data);
        }
        nextQuestion(id, QuesID);
      }
    }
    if (id == 3 && QuesID == 5) {
      var allCheckded = Data[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
      if (allCheckded.length < 3) {
        cogoToast.error("Three super goals required");
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 4 && QuesID == 0) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {

        if (allChecked[0].value == "Yes") {
          Data[id].questions[QuesID].answered = true
          nextQuestion(id, QuesID + 1, false);
        } else {
          nextQuestion(id, QuesID);
        }
      }
    }
    if (id == 4 && QuesID == 1) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        if (allChecked[0].value == "No") {
          nextQuestion(id, Data[id].questions.length - 1);
        } else {
          nextQuestion(id, QuesID);
        }
      }
    }
    if (id == 4 && QuesID == 2) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 4 && QuesID == 3) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        cogoToast.error(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        if (checkUpdate === false) {
          var toHideOptions = [];
          allChecked.forEach((value, index) => {
            toHideOptions = toHideOptions.concat(value.doHide);
          });
          Data[id].questions[QuesID + 1].options.forEach((value, index) => {
            Data[id].questions[QuesID + 1].options[index].check = false;
            if (toHideOptions.includes(index)) {
              Data[id].questions[QuesID + 1].options[index].isHidden = true;
            } else {
              Data[id].questions[QuesID + 1].options[index].isHidden = false;
            }
            setData(Data);
          });
        }
        nextQuestion(id, QuesID);
      }
    }
    if (id == 4 && QuesID == 4) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        cogoToast.error(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 4 && QuesID == 5) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        cogoToast.error(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        if (checkUpdate === false) {
          var toHideOptions = [];
          allChecked.forEach((value, index) => {
            toHideOptions = toHideOptions.concat(value.doHide);
          });
          Data[id].questions[QuesID + 1].options.forEach((value, index) => {
            Data[id].questions[QuesID + 1].options[index].check = false;
            if (toHideOptions.includes(index)) {
              Data[id].questions[QuesID + 1].options[index].isHidden = true;
            } else {
              Data[id].questions[QuesID + 1].options[index].isHidden = false;
            }
            setData(Data);
          });
        }
        nextQuestion(id, QuesID);
      }
    }
    if (id == 4 && QuesID == 6) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        cogoToast.error(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 5 && QuesID == 0) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      console.log("all checked",allChecked)
      if (allChecked.length < Data[id].questions[QuesID].min) {
        cogoToast.error(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        if (allChecked.length == 1 && allChecked[0].value == "none") {
          console.log(Data[id].questions[4], "<----answered");
          nextQuestion(id, Data[id].questions.length - 1);
          Data[id].questions[1].answered = false;
          Data[id].questions[2].answered = false;
          Data[id].questions[3].answered = false;
          Data[id].questions[4].answered = false;
          setData(Data);
        } else {
          // if (checkUpdate === false) {
            var option = [];
            var checkedLevel = Data[id].questions[
              Data[id].questions[QuesID + 2].dependQuestion
            ].options.filter((x) => x.check === true);
  
            var DependentLevel = [];
            checkedLevel.forEach((value, index) => {
              if (value.check === true) DependentLevel.push(value.level);
            });
  
            Data[id].questions[QuesID + 2].suberGoals.forEach((value, index) => {
              if (DependentLevel.includes(value.level)) {
                var subGoals = [];
                value.subGoals.forEach((x) => {
                  subGoals.push({
                    text: x,
                    check: false,
                  });
                });
                option.push({
                  value: value.title,
                  text: subGoals,
                  check: false,
                });
              }
            });
  
            Data[id].questions[QuesID + 2].goalQues = option;
            setData(Data);
          // }
          nextQuestion(id, QuesID);
        }
      }
    }
    if (id == 5 && QuesID == 1) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        if (checkUpdate === false) {
          var option = [];
          var checkedLevel = Data[id].questions[
            Data[id].questions[QuesID + 1].dependQuestion
          ].options.filter((x) => x.check === true);

          var DependentLevel = [];
          checkedLevel.forEach((value, index) => {
            if (value.check === true) DependentLevel.push(value.level);
          });

          Data[id].questions[QuesID + 1].suberGoals.forEach((value, index) => {
            if (DependentLevel.includes(value.level)) {
              var subGoals = [];
              value.subGoals.forEach((x) => {
                subGoals.push({
                  text: x,
                  check: false,
                });
              });
              option.push({
                value: value.title,
                text: subGoals,
                check: false,
              });
            }
          });

          Data[id].questions[QuesID + 1].goalQues = option;
          setData(Data);
        }
        nextQuestion(id, QuesID);
      }
    }
    if (id == 5 && QuesID == 2) {
      var allCheckded = Data[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
      if (allCheckded.length < Data[id].questions[QuesID].goalQues.length) {
        cogoToast.error("Required");
      } else {
        if (checkUpdate === false) {
          var option = [];
          var checkedLevel = Data[id].questions[
            Data[id].questions[QuesID + 1].dependQuestion
          ].options.filter((x) => x.check === true);

          var DependentLevel = [];
          checkedLevel.forEach((value, index) => {
            if (value.check === true) DependentLevel.push(value.level);
          });

          Data[id].questions[QuesID + 1].suberGoals.forEach((value, index) => {
            if (DependentLevel.includes(value.level)) {
              var subGoals = [];
              value.subGoals.forEach((x) => {
                subGoals.push({
                  text: x,
                  check: false,
                });
              });
              option.push({
                value: value.title,
                text: subGoals,
                check: false,
              });
            }
          });

          Data[id].questions[QuesID + 1].goalQues = option;
          setData(Data);
        }
        nextQuestion(id, QuesID);
      }
    }
    if (id == 5 && QuesID == 3) {
      var allCheckded = Data[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
      if (allCheckded.length < Data[id].questions[QuesID].goalQues.length) {
        cogoToast.error("Required");
      } else {
        if (checkUpdate === false) {
          var allCheckded = Data[id].questions[QuesID].goalQues.filter(
            (x) => x.check === true
          );
          var option = [];
          var checkedLevel = Data[id].questions[
            Data[id].questions[QuesID + 1].dependQuestion
          ].options.filter((x) => x.check === true);

          var DependentLevel = [];
          var allanswer = [];
          allCheckded.forEach((value, index) => {
            value.text.forEach((val, point) => {
              if (val.check === true) allanswer.push(val.text);
            });
            //if (value.check === true) DependentLevel.push(value.level);
          });

          checkedLevel.forEach((value, index) => {
            if (value.check === true) DependentLevel.push(value.level);
          });

          Data[id].questions[QuesID + 1].suberGoals.forEach((value, index) => {
            if (DependentLevel.includes(value.level)) {
              var subGoals = [];
              value.subGoals.forEach((x) => {
                if (x.hideIf.length > 0) {
                  if (!allanswer.includes(x.hideIf[0])) {
                    subGoals.push({
                      text: x.title,
                      check: false,
                    });
                  }
                } else {
                  subGoals.push({
                    text: x.title,
                    check: false,
                  });
                }
              });
              option.push({
                value: value.title,
                text: subGoals,
                check: false,
              });
            }
          });

          Data[id].questions[QuesID + 1].goalQues = option;
          setData(Data);
        }
        nextQuestion(id, QuesID);
      }
    }
    if (id == 5 && QuesID == 4) {
      var allCheckded = Data[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
      if (allCheckded.length < Data[id].questions[QuesID].goalQues.length) {
        cogoToast.error("Required");
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 6 && QuesID == 0) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        cogoToast.error(`Required`);
      } else {
        Data[id].questions[QuesID].answered = true;
        setData(Data);
        PostData(id, QuesID);
      }
    }
  };




  useEffect(() => {
        const percentage = (id / 6 ) * 100
        setPercentage(percentage);
    
        if(id === 1){
          setProgress("w-1/6");
        } else if (id === 2){
          setProgress("w-2/6");
        }else if (id === 3){
          setProgress("w-3/6");
        }else if (id === 4){
          setProgress("w-4/6");
        }else if (id === 5){
          setProgress("w-5/6");
        }else if (id === 6){
          setProgress("w-full");
        }else{
          setProgress("");
        }
     
    
    
  }, [percentage, filteredJSON, id]);


  const nextQuestion = (parent, question, makeTrue = true) => {
    
    if(makeTrue) Data[parent].questions[question].answered = true;
    console.log("Ddddd",Data)
    setData(Data);
    var questionLength = Data[parent].questions.length;
    var parentId = parent;
    var questionId = question;
    // if(totalQuestions.length){
    if (question < questionLength - 1) {
      questionId = questionId + 1;
    } else {
      questionId = 0;
      parentId = parentId + 1;
    }

    // }else{
    //   questionId = 0;
    //     parentId = parentId
    // }
    if (
      "isRandom" in Data[parentId].questions[questionId] &&
      Data[parentId].questions[questionId].isRandom === true
    ) {
      questionId = questionId + 1;
    }
    changeQuestionToGender(parentId, questionId);
    PostData(parentId, questionId);
    setID(parentId);
    setQuesID(questionId);

    
    
    const percentage = (id / 6 ) * 100
    setPercentage(percentage);

    if(id === 1){
      setProgress("w-1/6");
    } else if (id === 2){
      setProgress("w-2/6");
    }else if (id === 3){
      setProgress("w-3/6");
    }else if (id === 4){
      setProgress("w-4/6");
    }else if (id === 5){
      setProgress("w-5/6");
    }else if (id === 6){
      setProgress("w-full");
    }

    // scroll to top func

    if(window){
      window.scroll(0,0) 
    }
  };


  const getFilteredJSONData = (groupId, questionId) => {
    const groupName = groupNameArray[groupId];
    let filteredJSONQuestionObj = { groupName: groupName };
    const getGroupObjFromParent = Data.find(
      (x) => x.title.toLowerCase() === groupName.toLowerCase()
    );
    const getCompletedQuestionFromGroup =
      getGroupObjFromParent.questions[questionId];

    const is_exist = filteredJSON.filter(
      (x) => x.groupName == groupName && x.externalId == questionId
    );

    if (is_exist.length > 0) {
      const index = filteredJSON.findIndex(
        (x) => x.groupName == groupName && x.externalId == questionId
      );
      if (getCompletedQuestionFromGroup.select === "Accordian") {
        const getSelectedGoals = getCompletedQuestionFromGroup.goalQues.filter(
          (x) => x.check === true
        );
        filteredJSON[index].answeres = [];
        for (const goal of getSelectedGoals) {
          const tempObj = {};
          tempObj.value = goal.value;
          tempObj.subAnswers = goal.text
            .filter((x) => x.check === true)
            .map((x) => x.text);
          filteredJSON[index].answeres.push(tempObj);
          // goal.text = goal.text.filter((x) => x.check === true);
        }
      } else {
        filteredJSON[index].answeres = getCompletedQuestionFromGroup.options
          .filter((x) => x.check === true)
          .map((x) => x.value);
      }
    } else {
      filteredJSONQuestionObj.questionId =
        getCompletedQuestionFromGroup.questionID;
      filteredJSONQuestionObj.externalId = QuesID;
      filteredJSONQuestionObj.groupID = groupId;
      filteredJSONQuestionObj.question = getCompletedQuestionFromGroup.question;

      if (getCompletedQuestionFromGroup.select === "Accordian") {
        filteredJSONQuestionObj.question =
          filteredJSONQuestionObj.question.replace(
            "name",
            stuDetails.FirstName
          );
        const getSelectedGoals = getCompletedQuestionFromGroup.goalQues.filter(
          (x) => x.check === true
        );
        filteredJSONQuestionObj.answeres = [];
        for (const goal of getSelectedGoals) {
          const tempObj = {};
          tempObj.value = goal.value;
          tempObj.subAnswers = goal.text
            .filter((x) => x.check === true)
            .map((x) => x.text);
          filteredJSONQuestionObj.answeres.push(tempObj);
          // goal.text = goal.text.filter((x) => x.check === true);
        }

      } else {
        filteredJSONQuestionObj.answeres = getCompletedQuestionFromGroup.options
          .filter((x) => x.check === true)
          .map((x) => x.value);
        filteredJSONQuestionObj.question =
          filteredJSONQuestionObj.question.replace(
            "name",
            stuDetails.FirstName
          );
      }

      // setFilter(filteredJSON.concat(filteredJSONQuestionObj));
      filteredJSON.push(filteredJSONQuestionObj);
      setFilteredJSON(filteredJSON);

      console.log("filteredJSONddd", filteredJSON);
    }
  };

  const PostData = (parent, ques) => {
    getFilteredJSONData(id, QuesID);
    if (filteredJSON.length) {
      console.log("filteredJSON++++", filteredJSON, QuesID);

      const searchParams = new URLSearchParams(document.location.search);
      console.log("filteredJSON", filteredJSON);
      const updatedData = filteredJSON;
      const body = JSON.stringify({
        ...stuDetails,
        questions: updatedData,
      });

      var config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: `https://31zctjiomj.execute-api.us-east-1.amazonaws.com/default/enhacereport?StudentID=${searchParams.get(
          "StudentID"
        )}&Token=${searchParams.get("Token")}`,
        headers: {
          "Content-Type": "application/json",

          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, Content-Length, X-Requested-With, Accept",
        },
        withCredentials: false,
        crossdomain: true,
        data: body,
      };
      var confighook = {
        method: "POST",
        maxBodyLength: Infinity,
        url: `https://eo1uo5aa7h7sqbm.m.pipedream.net`,
        data: body,
      };

      axios(config)
        .then(function (response) {
          console.log(response.data.questions, "<---response.data.questions");
          setTotalQuestions(response.data.questions);
          if (id === 6 && QuesID === 0) {
            axios(confighook);
            setSubmit(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleBack = () => {
    // console.log(Data, "<---DATA in back")
    if(window){
      window.scroll(0,0) 
    }
    const back = true;
    // if (filteredJSON.length) {
    //   const groupName = groupNameArray[id];
    //   const getIdxFromFilteredJSon = filteredJSON.findIndex(x => x.groupName.toLowerCase() === groupName.toLowerCase() && QuesID === x.questionId);
    //   filteredJSON.splice(getIdxFromFilteredJSon, 1);

    //   const searchParams = new URLSearchParams(document.location.search)
    //   console.log('filteredJSON', filteredJSON)
    //   const updatedData = filteredJSON;
    //   const body = JSON.stringify({
    //     ...stuDetails,
    //     "questions": updatedData
    //   });

    //   var config = {
    //     method: 'POST',
    //     maxBodyLength: Infinity,
    //     url: `https://31zctjiomj.execute-api.us-east-1.amazonaws.com/default/enhacereport?StudentID=${searchParams.get('StudentID')}&Token=${searchParams.get('Token')}`,
    //     headers: {
    //       'Content-Type': 'application/json',

    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
    //             "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With, Accept"

    //     },
    //     withCredentials: false,
    //     crossdomain: true,
    //     data : body
    //   };

    //   axios(config)
    //   .then(function (response) {

    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // }
    PreviousQues(id, QuesID);
    setData(Data)
  };

  const changeQuestionToGender = (parent, question) => {
    var studentName = stuDetails.FirstName;
    Data[parent].questions[question].question = Data[parent].questions[
      question
    ].question.replace("name", `${studentName}`);

    if (Data[parent].questions[question].select != "Accordian") {
      Data[parent].questions[question].options.forEach((val, index) => {
        Data[parent].questions[question].options[index].value =
          val.value.replace("name", `${studentName}`);
      });
    }

    setData(Data);
  };

  const PreviousQues = (parent, question) => {
    // if (Data[parent].questions[question].answered) {
    //   console.log('aaa')
    //   Data[parent].questions[question].answered = false;
    //   if(Data[parent].questions[question].select == "Accordian"){
    //     Data[parent].questions[question].goalQues = [];

    //   }else{
    //     for (const answer of Data[parent].questions[question].options) {
    //       if (answer.check) {
    //         answer.check = false;
    //       }
    //     }
    //   }

    // }

    if (question == 0) {
      parent = parent - 1;
      question = Data[parent].questions.length - 1;
      // Data[parent].questions.forEach((val, index) => {
      //   if(val.answered === true) question = index;
      // });
    } else {
      question = question - 1;
    }

    if (Data[parent].questions[question].answered) {
      setID(parent);
      setQuesID(question);
    } else {
      PreviousQues(parent, question);
    }
  };

  return (
    <footer className="drop-shadow-2xl border-t-4 border-gray-200 inset-x-0 w-full bg-white">
      <div className="flex flex-row items-center">
        <div className="bg-[#EFEEF5] percentageRatio">
          <p className="text-[#47529B] text-md">
            {percentage ? Math.floor(percentage) : 0}% Complete
          </p>
          <div class="overflow-hidden h-2 mb-2 text-xs flex rounded bg-white">
            <div
              class={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#47529B] ${progress}`}
            ></div>
          </div>
        </div>

        <div className="backBtnWrapper">
          <button
            onClick={handleBack} 
            className="rounded-md font-medium flex flex-row"
          >
            <FaArrowLeft className="text-center m-1 ml-0" />
            <p className="text-center ml-1">Back</p>
          </button>
        </div>
        <div className="nextBtnWrapper">
          <button
            onClick={handleNext}
            className="bg-[#DE706C] h-10 rounded-md justify-center text-white font-medium flex flex-row"
          >
            <p className="text-center mr-1">
              {id === 6 && QuesID === 0 ? "Submit" : "Next"}
            </p>
            <FaArrowRight className="text-center m-1 mr-0" />
          </button>
        </div>
      </div>
    </footer>
  );
}

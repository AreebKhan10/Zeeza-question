import { data } from "autoprefixer";
import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

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
}) {
  const uniqueArray = (array) => {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) a.splice(j--, 1);
      }
    }

    return a;
  };

  const handleNext = () => {
    const grade = 6;
    if (id == 0 && QuesID == 0) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        alert(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
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

        nextQuestion(id, QuesID);
      }
    }
    if (id == 0 && QuesID == 1) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
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
        alert(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 0 && QuesID == 3) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        alert(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 0 && QuesID == 4) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
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
        alert(`Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 1 && QuesID == 1) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
      } else {
        Data[id].questions[QuesID + 1].options.forEach((value, index) => {
          if (Data[id].questions[QuesID + 1].options[index].level <= grade) {
            Data[id].questions[QuesID + 1].options[index].isHidden = false;
            setData(Data);
          } else {
            Data[id].questions[QuesID + 1].options[index].isHidden = true;
            setData(Data);
          }
        });
        nextQuestion(id, QuesID);
      }
    }
    if (id == 1 && QuesID == 2) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 1 && QuesID == 4) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        alert(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 1 && QuesID == 5) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
      } else {
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

        nextQuestion(id, QuesID);
      }
    }
    if (id == 1 && QuesID == 6) {
      var allCheckded = Data[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
      if (allCheckded.length < 1) {
        alert("minimum 1 Selection is Required");
      } else {
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
          var isPresenrt = option.filter((x) => x.value == value.title);
          if (!isPresenrt.length > 0) {
            var subGoals = [];
            value.subGoals.forEach((x) => {
              var exsitdGoal = subGoals.filter((goal) => goal.text == x.title);
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
        setData(Data);
        console.log(Data, "this is the data");
        nextQuestion(id, QuesID);
      }
    }
    if (id == 1 && QuesID == 7) {
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
        alert("minimum 3 Required");
      } else {
        nextQuestion(id, QuesID);
      }
    }

    if (id == 2 && QuesID == 0) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 2 && QuesID == 1) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
      } else {
        Data[id].questions[QuesID + 1].options.forEach((value, index) => {
          if (Data[id].questions[QuesID + 1].options[index].level <= grade) {
            Data[id].questions[QuesID + 1].options[index].isHidden = false;
            setData(Data);
          } else {
            Data[id].questions[QuesID + 1].options[index].isHidden = true;
            setData(Data);
          }
        });
        nextQuestion(id, QuesID);
      }
    }
    if (id == 2 && QuesID == 2) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 2 && QuesID == 3) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        alert(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 2 && QuesID == 4) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
      } else {
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

        nextQuestion(id, QuesID);
      }
    }
    if (id == 2 && QuesID == 5) {
      var allCheckded = Data[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
      if (allCheckded < 1) {
        alert("Required");
      } else {
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
        nextQuestion(id, QuesID);
      }
    }
    if (id == 2 && QuesID == 6) {
      var allCheckded = Data[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
      if (allCheckded < 1) {
        alert("Required");
      } else {
        nextQuestion(id, QuesID);
      }
    }

    if (id == 3 && QuesID == 0) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
      } else {
        Data[id].questions[QuesID + 1].options.forEach((value, index) => {
          if (Data[id].questions[QuesID + 1].options[index].level <= grade) {
            Data[id].questions[QuesID + 1].options[index].isHidden = false;
            setData(Data);
          } else {
            Data[id].questions[QuesID + 1].options[index].isHidden = true;
            setData(Data);
          }
        });
        nextQuestion(id, QuesID);
      }
    }
    if (id == 3 && QuesID == 1) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 3 && QuesID == 2) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 3 && QuesID == 3) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
      } else {
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

        nextQuestion(id, QuesID);
      }
    }
    if (id == 3 && QuesID == 4) {
      var allCheckded = Data[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
      if (allCheckded < 1) {
        alert("Required");
      } else {
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
        nextQuestion(id, QuesID);
      }
    }
    if (id == 3 && QuesID == 5) {
      var allCheckded = Data[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
      if (allCheckded < 1) {
        alert("Required");
      } else {
        nextQuestion(id, QuesID);
      }
    }


    if (id == 4 && QuesID == 0) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
      } else {
        if(allChecked[0].value == 'Yes'){
          nextQuestion(id, QuesID + 1);
        }else{
          nextQuestion(id, QuesID);
        }
      }
    }
    if (id == 4 && QuesID == 1) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
      } else {
        if(allChecked[0].value == 'No'){
          nextQuestion(id, Data[id].questions.length - 1);
        }else{
          nextQuestion(id, QuesID);
        }
      }
    }
    if (id == 4 && QuesID == 2) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < 1) {
        alert(`Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 4 && QuesID == 3) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        alert(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        var toHideOptions = [];
        allChecked.forEach((value, index) => {
          toHideOptions = toHideOptions.concat(value.doHide);
        })
        Data[id].questions[QuesID + 1].options.forEach((value, index) => {
          Data[id].questions[QuesID + 1].options[index].check = false;
          if (toHideOptions.includes(index)) {
            Data[id].questions[QuesID + 1].options[index].isHidden = true;
          } else {
            Data[id].questions[QuesID + 1].options[index].isHidden = false;
          }
          setData(Data);
        });
        nextQuestion(id, QuesID);
      }
    }
    if (id == 4 && QuesID == 4) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        alert(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }
    if (id == 4 && QuesID == 5) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        alert(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        var toHideOptions = [];
        allChecked.forEach((value, index) => {
          toHideOptions = toHideOptions.concat(value.doHide);
        })
        Data[id].questions[QuesID + 1].options.forEach((value, index) => {
          Data[id].questions[QuesID + 1].options[index].check = false;
          if (toHideOptions.includes(index)) {
            Data[id].questions[QuesID + 1].options[index].isHidden = true;
          } else {
            Data[id].questions[QuesID + 1].options[index].isHidden = false;
          }
          setData(Data);
        });

        nextQuestion(id, QuesID);
      }
    }
    if (id == 4 && QuesID == 6) {
      var allChecked = Data[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      if (allChecked.length < Data[id].questions[QuesID].min) {
        alert(`Minimum ${Data[id].questions[QuesID].min} Required`);
      } else {
        nextQuestion(id, QuesID);
      }
    }






  };

  const nextQuestion = (parent, question) => {
    var questionLength = Data[parent].questions.length;
    var parentId = parent;
    var questionId = question;
    if (question < questionLength - 1) {
      questionId = questionId + 1;
    } else {
      questionId = 0;
      parentId = parentId + 1;
    }
    if (
      "isRandom" in Data[parentId].questions[questionId] &&
      Data[parentId].questions[questionId].isRandom === true
    ) {
      questionId = questionId + 1;
    }
    setID(parentId);
    setQuesID(questionId);
  };

  const handleBack = () => {};

  return (
    <footer className="drop-shadow-2xl fixed border-t-4 border-gray-200 inset-x-0 bottom-0 h-24 w-full bg-white">
      <div className="flex flex-row justify-around align-center mt-4">
        <div className="bg-[#EFEEF5] w-96 h-16 rounded-xl  p-2 ">
          <p className="text-[#47529B] text-md ml-2 mb-3">8% Complete</p>

          <div class="overflow-hidden h-2 mb-2 text-xs flex rounded bg-white m-1">
            <div class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#47529B] w-1/4"></div>
          </div>
        </div>

        <button
          onClick={handleBack}
          className="border-[#002B48] border-2 h-10 w-24 mt-2  p-2  rounded-md   font-medium flex flex-row"
        >
          <FaArrowLeft className="text-center m-1 " />
          <p className="text-center ml-1">BACK</p>
        </button>
        <button
          onClick={handleNext}
          className="bg-[#DE706C] w-24 mt-2 h-10 p-2  rounded-md justify-center text-white font-medium flex flex-row "
        >
          <p className="text-center ml-1">NEXT</p>
          <FaArrowRight className="text-center m-1 " />
        </button>
      </div>
    </footer>
  );
}

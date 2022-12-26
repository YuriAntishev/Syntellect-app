import React, { useState } from "react";
import Control from "./components/Control";
import ControlViewModel from "./viewmodels/ControlViewModel";
import { AppWrapper } from "./styles/styles";

type Input = { 
  [key: string]: string 
};

function App() {
  const [inputValues, setInputValues] = useState<any>({});

  const isNumber = (v: string) => /^\d{1,5}$/.test(v);

  const dataForButton1 = {
    typeOfInput: "text",
    nameOfInput: "control1",
    inputValues,
    setInputValues,
    rightButtons: [
      {
        id: 1,
        name: "Clear Input",
        onClick: () => {
          setInputValues({
            [dataForButton1.nameOfInput]: "",
          });
        },
      },
      {
        id: 2,
        name: "Hello world",
        onClick: () => {
          setInputValues({
            [dataForButton1.nameOfInput]: "Hello world!",
          });
        },
      },
    ],
  };

  const dataForButton2 = {
    typeOfInput: "text",
    nameOfInput: "control2",
    inputValues,
    setInputValues,
    rightButtons: [
      {
        id: 1,
        name: "Alert",
        onClick: () => alert(inputValues[dataForButton2.nameOfInput]),
      },
    ],
    leftButtons: [
      {
        id: 1,
        name: "Number or Not",
        onClick: () => {
          if (isNumber(inputValues[dataForButton2.nameOfInput])) {
            alert(inputValues[dataForButton2.nameOfInput]);
          }
          console.log("number 9999");
        },
      },
    ],
  };

  const dataForButton3 = {
    typeOfInput: "search",
    nameOfInput: "control3",
    maxTips: 3,
    inputValues,
    setInputValues,
  };

  const dataForButton4 = {
    typeOfInput: "search",
    nameOfInput: "control4",
    maxTips: 10,
    inputValues,
    setInputValues,
  };

  let buttonViewModel1 = new ControlViewModel(dataForButton1),
    buttonViewModel2 = new ControlViewModel(dataForButton2),
    buttonViewModel3 = new ControlViewModel(dataForButton3),
    buttonViewModel4 = new ControlViewModel(dataForButton4);

  return (
    <AppWrapper>
      <div>
        <h4
          style={{
            color: "rgb(150 81 255)",
          }}
        >
          Control with Buttons
        </h4>
        <Control viewModel={buttonViewModel1} />
        <br />
        <Control viewModel={buttonViewModel2} />
        <h4
          style={{
            color: "rgb(150 81 255)",
          }}
        >
          Control Autocomplete 1
        </h4>
        <Control viewModel={buttonViewModel3} />
        <h4
          style={{
            color: "rgb(150 81 255)",
          }}
        >
          Control Autocomplete 2
        </h4>
        <Control viewModel={buttonViewModel4} />
      </div>
    </AppWrapper>
  );
}

export default App;

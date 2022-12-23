import React, { useState } from "react";
import Button from "./components/controlWithButtons";
import ControlViewModel from "./viewmodels/ControlViewModel";

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
    inputValues,
    setInputValues,
  };

  let buttonViewModel1 = new ControlViewModel(dataForButton1),
    buttonViewModel2 = new ControlViewModel(dataForButton2),
    buttonViewModel3 = new ControlViewModel(dataForButton3);

  return (
    <>
      <h4>Control with Buttons</h4>
      <Button viewModel={buttonViewModel1} />
      <br />
      <br />
      <Button viewModel={buttonViewModel2} />
      <h4>Control Autocomplete</h4>
      <Button viewModel={buttonViewModel3} />
    </>
  );
}

export default App;

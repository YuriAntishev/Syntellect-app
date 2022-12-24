import React, { useEffect, useCallback } from "react";
import { observer } from "mobx-react";
import { Input } from "./Input/Input";
import ControlViewModel from "../viewmodels/ControlViewModel";
import { ControlWrapper, StyledButton } from "../styles/styles";

type ControlProps = {
  viewModel: ControlViewModel;
};

export default observer(({ viewModel }: ControlProps) => {
  const {
    typeOfInput,
    nameOfInput,
    inputValues,
    setInputValues,
    rightButtons,
    leftButtons,
  } = viewModel.model;

  const onInputChanged = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const { value, name } = e.currentTarget;
      setInputValues((prevState: any) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    },
    [setInputValues]
  );

  useEffect(() => {
    viewModel.fetchCountries();
  }, []);

  console.log("countries", viewModel);

  return (
    <ControlWrapper>
      {leftButtons?.map(({ id, name, onClick }: any) => {
        return (
          <StyledButton key={id} onClick={onClick}>
            {name}
          </StyledButton>
        );
      })}
      <Input
        type={typeOfInput}
        name={`${nameOfInput}`}
        value={inputValues[nameOfInput]}
        data={viewModel.countries}
        onChange={onInputChanged}
      />
      {rightButtons?.map(({ id, name, onClick }: any) => {
        return (
          <StyledButton key={id} onClick={onClick}>
            {name}
          </StyledButton>
        );
      })}
    </ControlWrapper>
  );
});

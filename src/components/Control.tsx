import React, { useCallback } from "react";
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
    maxTips,
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

  return (
    <ControlWrapper>
      {leftButtons?.map(
        ({
          id,
          name,
          onClick,
        }: {
          id: number;
          name: string;
          onClick: () => void;
        }) => {
          return (
            <StyledButton key={id} onClick={onClick}>
              {name}
            </StyledButton>
          );
        }
      )}
      <Input
        type={typeOfInput}
        name={`${nameOfInput}`}
        value={inputValues[nameOfInput]}
        maxTips={maxTips}
        model={viewModel}
        onChange={onInputChanged}
      />
      {rightButtons?.map(
        ({
          id,
          name,
          onClick,
        }: {
          id: number;
          name: string;
          onClick: () => void;
        }) => {
          return (
            <StyledButton key={id} onClick={onClick}>
              {name}
            </StyledButton>
          );
        }
      )}
    </ControlWrapper>
  );
});

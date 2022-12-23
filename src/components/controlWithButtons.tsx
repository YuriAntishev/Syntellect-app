import React, { useState, useEffect, useCallback } from "react";
import { observer } from "mobx-react";
import { Input } from "./Input";
// import TodoListViewModel from '../viewmodels/TodoListViewModel';
// import TodoItem from './TodoItem';

// type TodoListProps = {
//     viewModel: TodoListViewModel
// }

export default observer(({ viewModel }: any) => {
  const {
    typeOfInput,
    nameOfInput,
    inputValues,
    setInputValues,
    rightButtons,
    leftButtons,
  } = viewModel;

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
    <>
      {leftButtons?.map(({ id, name, onClick }: any) => {
        return (
          <button key={id} onClick={onClick}>
            {name}
          </button>
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
          <button key={id} onClick={onClick}>
            {name}
          </button>
        );
      })}
    </>
  );
});

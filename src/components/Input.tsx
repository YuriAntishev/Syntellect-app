import React from "react";

type Props = {};

export const Input = ({ type, data, ...props }: any) => {
  if (type === "search") {
    return (
        <>
      <input
        type={type}
        {...props}
        autoComplete="off"
        placeholder="Search Country"
        role="combobox"
        aria-haspopup="listbox"
        aria-owns="rc_select_0_list"
        aria-autocomplete="list"
        aria-controls="rc_select_0_list"
        aria-activedescendant="rc_select_0_list_0"
        aria-expanded="false"
      />
        {data?.map(
        ({ name, flag }: { name: string; flag: string }) => {
          return (
            <div>
              <div>{name}</div>
              <img src={flag} alt={name} />
            </div>
          );
        }
      )}
      </>
    );
  }

  if (type === "text") {
    return <input type="text" {...props} />;
  }

  return <div>Input</div>;
};

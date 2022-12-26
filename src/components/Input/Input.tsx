import React, { useState } from "react";
import LiveSearch from "../../components/Input/LiveSearch";
import ControlViewModel from "../../viewmodels/ControlViewModel";
import { StyledInput, RenderedItemWrapper } from "../../styles/styles";

type Props = {
  type: string;
  name: string;
  model: ControlViewModel;
  value: any;
  maxTips?: number;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

export type Country = {
  name: string;
  fullName: string;
  flag: string;
};

export const Input = ({
  type,
  name,
  model,
  value,
  maxTips,
  onChange,
}: Props) => {
  const [selectedProfile, setSelectedProfile] = useState<Country>();

  if (type === "search" && maxTips) {
    return (
      <LiveSearch
        model={model}
        maxTips={maxTips}
        value={selectedProfile?.name}
        renderItem={({ name, flag, fullName }: Country) => (
          <RenderedItemWrapper>
            <div>
              <img src={flag} alt="flag" />
            </div>
            <div>{name}</div>
            <div>{fullName}</div>
          </RenderedItemWrapper>
        )}
        onSelect={(item) => setSelectedProfile(item)}
        setSelectedProfile={setSelectedProfile}
      />
    );
  }

  if (type === "text") {
    return (
      <StyledInput
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    );
  }

  return <div>Input</div>;
};

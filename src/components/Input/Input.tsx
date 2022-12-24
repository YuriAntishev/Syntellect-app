import React, { useState } from "react";
import { StyledInput, RenderedItemWrapper } from "../../styles/styles";
import LiveSearch from "../../components/Input/LiveSearch";

type Props = {};

export const Input = ({ type, data, ...props }: any) => {
  const profiles = [
    {
      id: 1,
      name: "Австралия",
      fullName: "Австралийский Союз",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/50px-Flag_of_Australia.svg.png",
    },
    {
      id: 2,
      name: "Австрия",
      fullName: "Австрийская Республика",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/50px-Flag_of_Austria.svg.png",
    },
    {
      id: 3,
      name: "Азербайджан",
      fullName: "Азербайджанская Республика",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/50px-Flag_of_Azerbaijan.svg.png",
    },
    {
      id: 4,
      name: "Албания",
      fullName: "Республика Албания",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/50px-Flag_of_Albania.svg.png",
    },
    {
      id: 5,
      name: "Алжир",
      fullName: "Алжирская Народная Демократическая Республика",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Algeria.svg/50px-Flag_of_Algeria.svg.png",
    },
    {
      id: 6,
      name: "Ангола",
      fullName: "Республика Ангола",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Angola.svg/50px-Flag_of_Angola.svg.png",
    },
    {
      id: 7,
      name: "Андорра",
      fullName: "Княжество Андорра",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Andorra.svg/50px-Flag_of_Andorra.svg.png",
    },
    {
      id: 8,
      name: "Антигуа и Барбуда",
      fullName: "Антигуа и Барбуда",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Flag_of_Antigua_and_Barbuda.svg/50px-Flag_of_Antigua_and_Barbuda.svg.png",
    },
    {
      id: 9,
      name: "Аргентина",
      fullName: "Аргентинская Республика",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/50px-Flag_of_Argentina.svg.png",
    },
  ];

  const [results, setResults] =
    useState<{ id: number; name: string; fullName: string; flag: string }[]>();
  const [selectedProfile, setSelectedProfile] = useState<{
    id: number;
    name: string;
    fullName: string;
    flag: string;
  }>();

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setResults([]);

    const filteredValue = profiles.filter((profile) =>
      profile.name.toLowerCase().startsWith(target.value)
    );
    setResults(filteredValue);
  };

  if (type === "search") {
    return (
      <LiveSearch
        results={results}
        value={selectedProfile?.name}
        renderItem={({ name, flag, fullName }) => (
          <RenderedItemWrapper>
            <div>
              <img src={flag} alt="flag" />
            </div>
            <div>{name}</div>
            <div>{fullName}</div>
          </RenderedItemWrapper>
        )}
        onChange={handleChange}
        onSelect={(item) => setSelectedProfile(item)}
      />
    );
  }

  if (type === "text") {
    return <StyledInput type="text" {...props} autoComplete="off" />;
  }

  return <div>Input</div>;
};

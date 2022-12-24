/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, RefObject } from "react";
import { ResultsWrapper, ResultsItem } from "../../styles/styles";

interface Props<T> {
  results?: T[];
  renderItem(item: T): JSX.Element;
  focusedIndex: number;
  tips: any;
  setTips: any;
  resultContainer: RefObject<HTMLDivElement>;
  handleSelection: (selectedIndex: number) => void;
}

const SearchResults = <T extends object>({
  results,
  renderItem,
  tips,
  setTips,
  focusedIndex,
  resultContainer,
  handleSelection,
}: Props<T>): JSX.Element => {
  const [currentData, setCurrentData] = useState<string>(JSON.stringify(results));

  useEffect(() => {
    if (currentData !== JSON.stringify(results)) {
      console.log("count777", tips);
      setCurrentData(JSON.stringify(results));
      setTips((prev: any) => prev + 1);
    }
  }, [JSON.stringify(results)]);

  console.log("currentData777", currentData);
  console.log("results777", results);
  console.log("cond1", currentData !== JSON.stringify(results));

  if (tips > 10) {
    return <div></div>;
  }
  return (
    <ResultsWrapper>
      {results?.map((item, index) => {
        return (
          <ResultsItem
            key={index}
            onMouseDown={() => handleSelection(index)}
            ref={index === focusedIndex ? resultContainer : null}
            style={{
              backgroundColor: index === focusedIndex ? "rgba(0,0,0,0.1)" : "",
            }}
          >
            {renderItem(item)}
          </ResultsItem>
        );
      })}
    </ResultsWrapper>
  );
};

export default SearchResults;

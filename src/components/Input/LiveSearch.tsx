import { useCallback, useEffect, useRef, useState } from "react";
import SearchResults from "./SearchResults";
import { StyledInput } from "../../styles/styles";

interface Props<T> {
  results?: T[];
  renderItem(item: T): JSX.Element;
  onChange?: React.ChangeEventHandler;
  onSelect?: (item: T) => void;
  value?: string;
}

const LiveSearch = <T extends object>({
  results = [],
  renderItem,
  value,
  onChange,
  onSelect,
}: Props<T>): JSX.Element => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const resultContainer = useRef<HTMLDivElement>(null);
  const [showResults, setShowResults] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");
  const [tips, setTips] = useState(0);

  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;

  const handleSelection = (selectedIndex: number) => {
    const selectedItem = results[selectedIndex];
    if (!selectedItem) return resetSearchComplete();
    onSelect && onSelect(selectedItem);
    resetSearchComplete();
  };

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setShowResults(false);
  }, []);

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { key } = e;
    let nextIndexCount = 0;

    // move down
    if (key === "ArrowDown")
      nextIndexCount = (focusedIndex + 1) % results.length;

    // move up
    if (key === "ArrowUp")
      nextIndexCount = (focusedIndex + results.length - 1) % results.length;

    // hide search results
    if (key === "Escape") {
      resetSearchComplete();
    }

    // select the current item
    if (key === "Enter") {
      e.preventDefault();
      handleSelection(focusedIndex);
    }

    setFocusedIndex(nextIndexCount);
  };

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changeHandler = (e) => {
    setDefaultValue(e.target.value);
    onChange && onChange(e);
  };

  useEffect(() => {
    if (!resultContainer.current) return;

    resultContainer.current.scrollIntoView({
      block: "center",
    });
  }, [focusedIndex]);

  useEffect(() => {
    if (results.length > 0 && !showResults) setShowResults(true);

    if (results.length <= 0) setShowResults(false);
  }, [results]);

  useEffect(() => {
    if (value) setDefaultValue(value);
  }, [value]);

  return (
    <div>
      <div
        tabIndex={1}
        onBlur={resetSearchComplete}
        onKeyDown={handleKeyDown}
        className="relative"
      >
        <div
          style={{
            color: "rgb(150 81 255)",
            marginBottom: "10px",
          }}
        >
          Number of Tips {tips}
        </div>
        <div
          style={{
            color: "rgb(150 81 255)",
            marginBottom: "10px",
          }}
        >
          Maximum Tips {tips}
        </div>
        <StyledInput
          type="text"
          value={defaultValue}
          onChange={handleChange}
          placeholder="Search country..."
        />
        {showResults && (
          <SearchResults
            results={results}
            tips={tips}
            setTips={setTips}
            renderItem={renderItem}
            focusedIndex={focusedIndex}
            resultContainer={resultContainer}
            handleSelection={handleSelection}
          />
        )}
      </div>
    </div>
  );
};

export default LiveSearch;

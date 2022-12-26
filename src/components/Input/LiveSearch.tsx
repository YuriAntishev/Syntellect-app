import { useCallback, useEffect, useRef, useState } from "react";
import SearchResults from "./SearchResults";
import ControlViewModel from "../../viewmodels/ControlViewModel";
import { StyledInput } from "../../styles/styles";
import { Country } from "../../components/Input/Input";

interface Props {
  renderItem(item: Country): JSX.Element;
  onSelect?: (item: Country) => void;
  model: ControlViewModel;
  maxTips: number;
  setSelectedProfile: any;
  value?: string;
}

const LiveSearch = ({
  renderItem,
  model,
  maxTips,
  value,
  onSelect,
  setSelectedProfile,
}: Props): JSX.Element => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const resultContainer = useRef<HTMLDivElement>(null);
  const [showResults, setShowResults] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");
  const [tips, setTips] = useState(0);

  const [results, setResults] = useState<Country[]>([]);

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

    if (key === "ArrowDown")
      nextIndexCount = (focusedIndex + 1) % results.length;

    if (key === "ArrowUp")
      nextIndexCount = (focusedIndex + results.length - 1) % results.length;

    if (key === "Backspace" || key === "Delete") {
      setSelectedProfile();
    }

    if (key === "Escape") {
      resetSearchComplete();
    }

    if (key === "Enter") {
      e.preventDefault();
      handleSelection(focusedIndex);
    }

    setFocusedIndex(nextIndexCount);
  };

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changeHandler = (e) => {
    setDefaultValue(e.target.value);
  };

  useEffect(() => {
    if (!value) {
      model.fetchCountries(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (defaultValue !== "") {
      setResults(model.countries);
    }
  }, [model.countries, defaultValue]);

  console.log("defaultValue", defaultValue);
  console.log("countries555", model.countries);
  console.log("results", results);
  console.log("showResults", showResults);

  useEffect(() => {
    if (!resultContainer.current) return;

    resultContainer.current.scrollIntoView({
      block: "center",
    });
  }, [focusedIndex]);

  useEffect(() => {
    if (results.length > 0 && !showResults) setShowResults(true);

    if (results.length <= 0) setShowResults(false);

    // if (!value) setShowResults(false);
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
          Maximum Tips {maxTips}
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
            maxTips={maxTips}
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

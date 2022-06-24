import { useState, useEffect } from "react";
import "./AutoComplete.css";

const AutoComplete = ({ suggestions, autoClass, autoCompleteApi, autoCompleteId, inputVal }) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState(inputVal);

    useEffect(() => {
        setInput(inputVal)
    }, [inputVal])
    

    const onChange = (e) => {
        const userInput = e.target.value;
        autoCompleteApi(e.target.value)

        // Filter our suggestions that don't contain the user's input
        const unLinked = suggestions.filter(
            (suggestion) =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setInput(e.target.value);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };

    const onClick = (e) => {
        if (typeof autoCompleteApi === "function") {
            autoCompleteApi(e.target.innerText)
        }
        setFilteredSuggestions([]);
        setInput(e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };

    const onKeyDown = (e) => {
        // User pressed the enter key
        let val = filteredSuggestions.length > 0 ? filteredSuggestions[activeSuggestionIndex] : input
        if (e.keyCode === 13) {
            if (typeof autoCompleteApi === "function") {
                autoCompleteApi(val)
            }
            setInput(val);
            setActiveSuggestionIndex(0);
            setShowSuggestions(false);
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestionIndex === 0) {
                return;
            }

            setActiveSuggestionIndex(activeSuggestionIndex - 1);
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
                return;
            }

            setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
    };

    const SuggestionsListComponent = () => {
        return filteredSuggestions.length ? (
            <ul className="suggestions">
                {filteredSuggestions.map((suggestion, index) => {
                    let className;

                    // Flag the active suggestion with a class
                    if (index === activeSuggestionIndex) {
                        className = "suggestion-active";
                    }

                    return (
                        <li className={className} key={suggestion} onClick={onClick}>
                            {suggestion}
                        </li>
                    );
                })}
            </ul>
        ) : (
            <div className="no-suggestions">
                <span role="img" aria-label="tear emoji">
                    😪
                </span>{" "}
                <em>sorry no suggestions</em>
            </div>
        );
    };

    return (
        <>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                className={autoClass}
                id={autoCompleteId}
                value={input}
            />
            {showSuggestions && input && <SuggestionsListComponent />}
        </>
    );
};

export default AutoComplete;

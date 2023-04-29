import IconClock from "@/Icons/IconClock";
import IconSearch from "@/Icons/IconSearch";
import CommonUtils from "@/utils/commonUtils";
import useOutsideClick from "@/utils/useOutsideClick";
import { useEffect, useRef, useState } from "react";

interface IAutoComplete {
    list: IList[];
}

export interface IList {
    displayName: string;
    value: string;
}

const AutoComplete = (props: IAutoComplete) => {
    const { list } = props;
    const [searchString, setSearchString] = useState("");
    const [optionList, setOptionList] = useState(list);
    const [showResult, setShowResult] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [pastSearch, setPastSearch] = useState<string[]>([]);

    const removeShowClass = () => {
        const optionListContainer = document.querySelector(
            ".suggestion-container"
        ) as HTMLDivElement;
        optionListContainer.classList.remove("showList");
    };

    const { ref } = useOutsideClick(false, removeShowClass);

    useEffect(() => {
        if (searchString) {
            const filterList = CommonUtils.getFilteredList(
                list,
                searchString
            ).splice(0, 5);

            if (searchString.length > 1 && filterList.length) {
                setSubmitDisabled(false);
            }
            if (filterList.length === 0) {
                setSubmitDisabled(true);
            }
            setOptionList(filterList);
        } else if (searchString === "" && !showResult) {
            setOptionList(list);
            setSubmitDisabled(true);
        }
    }, [searchString]);

    const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = ev.target.value;
        setSearchString(searchValue);
    };

    const toggleOptions = () => {
        if (pastSearch.length) {
            const pastSearchContainer = document.querySelector(
                ".past-searches-container"
            ) as HTMLDivElement;
            pastSearchContainer.classList.add("space-top");
        }
        const optionListContainer = document.querySelector(
            ".suggestion-container"
        ) as HTMLDivElement;

        optionListContainer.classList.add("showList");
        setShowResult(false);
    };

    const clearSearch = () => {
        setSearchString("");
        setShowResult(false);
    };

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const filterList = CommonUtils.getFilteredList(list, searchString);

        setOptionList(filterList);
        setPastSearch((prevState) => [...prevState, searchString]);
        removeShowClass();
        setShowResult(true);
        setSearchString("");
        ref.current.blur();
        setSubmitDisabled(true);
    };

    return (
        <>
            <div ref={ref} className="autocomplete-container">
                <div className="autocomplete-wrapper">
                    <form onSubmit={(ev) => handleSubmit(ev)}>
                        <div className="form-inner">
                            <div className="input-container">
                                <input
                                    onClick={toggleOptions}
                                    ref={ref}
                                    type="text"
                                    onChange={handleSearch}
                                    value={searchString}
                                />
                                {searchString && (
                                    <span
                                        onClick={clearSearch}
                                        className="clear-button"
                                    >
                                        clear
                                    </span>
                                )}
                            </div>
                            <button disabled={submitDisabled} type="submit">
                                <IconSearch />
                            </button>
                        </div>
                    </form>

                    <OptionsList
                        optionList={optionList}
                        pastSearchlist={pastSearch}
                        searchValue={searchString}
                    />
                </div>

                {showResult && <SearchResult optionList={optionList} />}
            </div>
        </>
    );
};

const OptionsList = ({
    optionList,
    pastSearchlist,
    searchValue,
}: {
    optionList: IList[];
    pastSearchlist: string[];
    searchValue: string;
}) => {
    return (
        <div className="suggestion-container">
            {searchValue.length ? (
                <div className="optionlist-container">
                    {optionList.length > 0 ? (
                        optionList.map((option) => (
                            <div className="options" key={option.value}>
                                {option.displayName}
                            </div>
                        ))
                    ) : (
                        <div>No result found</div>
                    )}
                </div>
            ) : (
                <PastSearchList
                    searchValue={searchValue}
                    pastSearch={pastSearchlist}
                />
            )}
        </div>
    );
};

const PastSearchList = ({
    pastSearch,
    searchValue,
}: {
    pastSearch: string[];
    searchValue: string;
}) => {
    const topPastSearch = pastSearch.slice(0, 5);
    return (
        <div className="past-searches-container">
            {topPastSearch.length > 0 && searchValue.length === 0
                ? topPastSearch.map((search, index) => (
                      <div className="searches" key={search + index}>
                          <IconClock />
                          {search}
                      </div>
                  ))
                : null}
        </div>
    );
};

const SearchResult = ({ optionList }: { optionList: IList[] }) => {
    return (
        <div className="search-result-container">
            <h3 className="result-title">{optionList.length} Results</h3>
            <div className="result-container">
                {optionList.map((list) => {
                    return <div key={list.value}>{list.displayName}</div>;
                })}
            </div>
        </div>
    );
};

export default AutoComplete;

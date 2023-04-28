import useOutsideClick from "@/utils/useOutsideClick";
import { useEffect, useRef, useState } from "react";

interface IAutoComplete {
    list: {
        displayName: string;
        value: string | number;
    }[];
    placeHolder: string;
}

const AutoComplete = (props: IAutoComplete) => {
    const { list, placeHolder } = props;
    const [searchString, setSearchString] = useState("");
    const [optionList, setOptionList] = useState(list);

    const {ref, isComponentVisible, setIsComponentVisible} = useOutsideClick(false)

    const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = ev.target.value;
        setSearchString(searchValue);
    };

    

    const toggleOptions = () => {
        setIsComponentVisible(true);
    };

    useEffect(() => {}, [searchString]);
    return (
        <div className="autocomplete-container">
            <input
                onClick={toggleOptions}
                ref={ref}
                type="text"
                onChange={handleSearch}
                value={searchString}
            />
            {isComponentVisible && <OptionsList optionList={optionList} />}
        </div>
    );
};

const OptionsList = ({ optionList }: { optionList: any[] }) => {
    return (
        <div>
            {optionList.map((option) => (
                <div key={option.value}>{option.displayName}</div>
            ))}
        </div>
    );
};

export default AutoComplete;

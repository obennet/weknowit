import React, {ChangeEventHandler, CSSProperties} from "react";
import "./searchBar.css";
import {FaSearch} from 'react-icons/fa';


interface SearchBarProps {
    placeholder?: string;
    style?: CSSProperties;
    input: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onSearch: any;
}

/**
 * @param placeholder - text shown before entering a value
 * @param style - css properties
 * @param input - text written in the input
 * @param onSearch - function triggered on click and on enter
 * @param onChange - function triggered on change
 * @constructor
 */
export const SearchBar = ({placeholder, style, input, onSearch, onChange}: SearchBarProps) => {
    const handleEnterDown = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    }

    return (
        <div className={"search-bar-container"}>
            <input className={"input"} style={style} type={"text"} value={input} onChange={onChange}
                   placeholder={placeholder} onKeyDown={handleEnterDown}/>

            <div className={"search-icon-container"} onClick={onSearch}>
                <FaSearch/>
            </div>


        </div>
    )
}
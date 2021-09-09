import React, {ChangeEventHandler, CSSProperties, useState} from "react";
import "./searchBar.css";
import {FaSearch} from 'react-icons/fa';


interface SearchBarProps {
    placeholder?: string;
    style?: CSSProperties;
    input: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onSearch: any;
}

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
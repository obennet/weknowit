import React, {CSSProperties, useState} from "react";
import "./searchBar.css";
import { FaSearch } from 'react-icons/fa';


interface TextInputProps {
    placeholder?: string;
    style?: CSSProperties;
}

export const SearchBar = ({placeholder, style}: TextInputProps) => {

    const [input, setInput] = useState<string>("");

    const handleKeyDown = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            search();
            setInput("");
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const search = () => {
        console.log("search");
    }

    return (
        <div className={"search-bar-container"}>
            <input className={"input"} style={style} type={"text"} value={input} onChange={handleOnChange}
                   placeholder={placeholder} onKeyDown={handleKeyDown}/>

                   <div className={"search-icon-container"} onClick={() => search()}>
                       <FaSearch />
                   </div>


        </div>
    )
}
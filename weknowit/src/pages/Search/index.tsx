import React from "react";
import { useParams } from "react-router-dom";
import "./search.css"
import {SearchBar} from "../../components/SearchBar";

interface SearchProps {
    option: "city" | "country";
}

const Search = (): JSX.Element => {

    const { option }: SearchProps = useParams();

    return(
        <div className={"search-container"}>
            <h2>SEARCH BY {option.toUpperCase()}</h2>
            <SearchBar placeholder={`Enter a ${option}`} style={{marginTop: 16}}/>
        </div>
    )
}
export default Search;
import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import "./search.css"
import {SearchBar} from "../../components/SearchBar";
import {geoname} from "../../types";
import {getCityName, getCountryCode} from "../../functions/ApiCalls";

interface SearchProps {
    option: "city" | "country";
}

const Search = (): JSX.Element => {

    const {option}: SearchProps = useParams();
    const [input, setInput] = useState<string>("");
    const [error, setError] = useState<string>("");

    const history = useHistory();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        setError("");
    }

    const handleSearch = () => {
        if (option === "country") {
            handleCountrySearch();
        }
        else if (option === "city") {
            handleCitySearch();
        }
        setInput("");
    }

    const handleCountrySearch = () => {
        getCountryCode(input).then((response: string) => {
            const countryCode = response;
            history.push(`/search/country/${countryCode}`);
        }).catch((error) => setError(error));
    }

    const handleCitySearch = () => {
        getCityName(input).then((response: string) => {
            const cityName = response;
            history.push(`/search/city/${cityName}`);
        }).catch((error) => setError(error));
    }

    return (
        <div className={"search-container"}>
            <h2>SEARCH BY {option.toUpperCase()}</h2>
            <SearchBar input={input} placeholder={`Enter a ${option}`} style={{marginTop: 16}}
                       onSearch={handleSearch} onChange={handleOnChange}/>
            <p className={"error-message"}>{error}</p>
        </div>
    )
}
export default Search;
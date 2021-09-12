import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import "./search.css"
import {SearchBar} from "../../components/SearchBar";
import {getCityName, getCountryCode} from "../../functions/ApiCalls";
import {ClipLoader} from "react-spinners";

interface SearchProps {
    option: "city" | "country";
}

/**
 * Search for city or country depending on prop option
 * @constructor
 */
const Search = (): JSX.Element => {

    const {option}: SearchProps = useParams();
    const [input, setInput] = useState<string>("");
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const history = useHistory();

    /**
     * On change setInput to value of input
     * @param e
     */
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        setError(null);
    }

    /**
     * Call the right search method depending on option
     */
    const handleSearch = () => {
        if (option === "country") {
            handleCountrySearch();
        } else if (option === "city") {
            handleCitySearch();
        }
        setInput("");
    }

    /**
     * Search for country and navigate to country page
     */
    const handleCountrySearch = () => {
        setLoading(true);
        getCountryCode(input).then((response: string) => {
            const countryCode = response;
            setLoading(false);
            history.push(`/search/country/${countryCode}`);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        });
    }

    /**
     * Search for city and navigate to city page
     */
    const handleCitySearch = () => {
        setLoading(true);
        getCityName(input).then((response: string) => {
            const cityName = response;
            setLoading(false);
            history.push(`/search/city/${cityName}`);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        });
    }

    return (
        <div className={"search-container"}>
            {!loading ?
                <>
                    <h2>SEARCH BY {option.toUpperCase()}</h2>
                    <SearchBar input={input} placeholder={`Enter a ${option}`} style={{marginTop: 16}}
                               onSearch={handleSearch} onChange={handleOnChange}/>
                    <p className={"error-message"}>{error?.message}</p>
                </> :
                <ClipLoader color={"#000"} loading={true} size={64}/>
            }
        </div>
    )
}
export default Search;
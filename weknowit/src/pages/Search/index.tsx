import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import "./search.css"
import {SearchBar} from "../../components/SearchBar";
import {getCityName, getCountryCode} from "../../functions/ApiCalls";
import {ClipLoader} from "react-spinners";

interface SearchProps {
    option: "city" | "country";
}

const Search = (): JSX.Element => {

    const {option}: SearchProps = useParams();
    const [input, setInput] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const history = useHistory();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        setError("");
    }

    const handleSearch = () => {
        if (option === "country") {
            handleCountrySearch();
        } else if (option === "city") {
            handleCitySearch();
        }
        setInput("");
    }

    const handleCountrySearch = () => {
        setLoading(true);
        getCountryCode(input).then((response: string) => {
            const countryCode = response;
            history.push(`/search/country/${countryCode}`);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        });
    }

    const handleCitySearch = () => {
        setLoading(true);
        getCityName(input).then((response: string) => {
            const cityName = response;
            history.push(`/search/city/${cityName}`);
            setLoading(false);
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
                    <p className={"error-message"}>{error}</p>
                </> :
                <ClipLoader color={"#000"} loading={true} size={64}/>
            }


        </div>
    )
}
export default Search;
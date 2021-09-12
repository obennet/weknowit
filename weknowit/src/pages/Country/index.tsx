import React, {useEffect, useState} from "react";
import "./country.css"
import {useHistory, useParams} from "react-router-dom";
import {getCountryName, getMostPopulatedCitiesName} from "../../functions/ApiCalls";
import {Button} from "../../components/Button";
import {ClipLoader} from "react-spinners";

/**
 * Page displaying country with it's most populated cities
 * @constructor
 */
const Country = (): JSX.Element => {
    const {countryCode} = useParams<{ countryCode: string }>();
    const history = useHistory();

    const [countryName, setCountryName] = useState<string>("");
    const [cities, setCities] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getCountryName(countryCode).then(response => {
            setCountryName(response);
        }).catch(error => setCountryName(error.message));

        getMostPopulatedCitiesName(countryCode).then(response => {
            setCities(response);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        });

    }, [countryCode]);

    /**
     * Navigate to city page
     * @param city - name of city
     */
    const handleClick = (city: string): void => {
        history.push(`/search/country/${countryCode}/${city}`);
    }

    return (
        <div className={"country-container"}>
            {!loading ?
                <>
                    <h2>{countryName.toUpperCase()}</h2>
                    <ul>
                        {error === null ?
                            cities.map((city, key) =>
                                <Button text={city} key={key} style={{marginTop: 8, height: 64}}
                                        onClick={() => handleClick(city)}/>) :
                            <p className={"error-message"}>{error?.message}</p>
                        }
                    </ul>
                </> :
                <ClipLoader color={"#000"} loading={true} size={64}/>
            }
        </div>
    )
}
export default Country;
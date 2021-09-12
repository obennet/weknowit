import React, {useEffect, useState} from "react";
import "./country.css"
import {useHistory, useParams} from "react-router-dom";
import {getCountryName, getMostPopulatedCitiesName} from "../../functions/ApiCalls";
import {geoname} from "../../types";
import {Button} from "../../components/Button";

interface CountryProps {
    countryCode: string;
}

const Country = (): JSX.Element => {

    const {countryCode}: CountryProps = useParams();
    const history = useHistory();

    const [countryName, setCountryName] = useState<string>("");
    const [cities, setCities] = useState<string[] | string>([]);

    useEffect(() => {
        getCountryName(countryCode).then(response => {
            setCountryName(response);
        }).catch(error => console.error(error));

        getMostPopulatedCitiesName(countryCode).then(response => {
            setCities(response);
        }).catch(error => console.error(error));

    }, []);

    const handleClick = (city: string): void => {
        history.push(`/search/country/${countryCode}/${city}`);
    }

    return(
        <div className={"country-container"}>
            <h2>{countryName.toUpperCase()}</h2>

            <ul>
                {typeof cities !== "string"? cities.map((city, key) =>
                    <Button text={city} key={key} style={{marginTop: 8, height: 64}} onClick={() => handleClick(city)}/>):
                    <p>{cities}</p>
                }
            </ul>
        </div>
    )
}
export default Country;
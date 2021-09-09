import React, {useEffect, useState} from "react";
import "./country.css"
import {useParams} from "react-router-dom";
import {getCountryName, getMostPopulatedCitiesName} from "../../functions/ApiCalls";
import {geoname} from "../../types";

interface CountryProps {
    countryCode: string;
}

const Country = (): JSX.Element => {

    const {countryCode}: CountryProps = useParams();

    const [countryName, setCountryName] = useState<string>("");
    const [cities, setCities] = useState<geoname[] | string>([]);

    useEffect(() => {
        getCountryName(countryCode).then(response => {
            setCountryName(response);
        }).catch(error => console.error(error));

        getMostPopulatedCitiesName(countryCode).then(response => {
            setCities(response);
        }).catch(error => console.error(error));

    }, [])

    return(
        <div className={"country-container"}>
            <h2>{countryName}</h2>
        </div>
    )
}
export default Country;
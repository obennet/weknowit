import React, {useEffect, useState} from "react";
import "./country.css"
import {useHistory, useParams} from "react-router-dom";
import {getCountryName, getMostPopulatedCitiesName} from "../../functions/ApiCalls";
import {Button} from "../../components/Button";
import {ClipLoader} from "react-spinners";

interface CountryProps {
    countryCode: string;
}

const Country = (): JSX.Element => {

    const {countryCode}: CountryProps = useParams();
    const history = useHistory();

    const [countryName, setCountryName] = useState<string>("");
    const [cities, setCities] = useState<string[] | string>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getCountryName(countryCode).then(response => {
            setCountryName(response);
        }).catch(error => console.error(error));

        getMostPopulatedCitiesName(countryCode).then(response => {
            setCities(response);
            setLoading(false);
        }).catch(error => console.error(error));

    }, []);

    const handleClick = (city: string): void => {
        history.push(`/search/country/${countryCode}/${city}`);
    }

    return (
        <div className={"country-container"}>
            {!loading ?
                <>
                    <h2>{countryName.toUpperCase()}</h2>
                    <ul>
                        {typeof cities !== "string" ? cities.map((city, key) =>
                                <Button text={city} key={key} style={{marginTop: 8, height: 64}}
                                        onClick={() => handleClick(city)}/>) :
                            <p>{cities}</p>
                        }
                    </ul>
                </> :
                <ClipLoader color={"#000"} loading={true} size={64}/>
            }
        </div>
    )
}
export default Country;
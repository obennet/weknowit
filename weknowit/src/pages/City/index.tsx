import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./city.css";
import {getCityPopulation} from "../../functions/ApiCalls";
import {ClipLoader} from "react-spinners";


/**
 * Page for displaying city population
 * @constructor
 */
const City = (): JSX.Element => {

    const {cityName} = useParams<{ cityName: string }>();
    const [population, setPopulation] = useState<number>(0);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getCityPopulation(cityName).then((response => {
            setPopulation(response);
            setLoading(false);
        })).catch(error => {
            setError(error);
            setLoading(false);
        })
    }, [cityName]);

    function numberWithSpaces(number: number): string {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    return (
        <div className={"city-container"}>
            {!loading ?
                <>
                    <h2>{cityName.toUpperCase()}</h2>
                    {error === null ?
                        <div className={"population-container"}>
                            <p className={"population-header"}>POPULATION</p>
                            <p className={"population-amount"}>{numberWithSpaces(population)}</p>
                        </div> :
                        <p className={"error-message"}>{error?.message}</p>
                    }
                </> :
                <ClipLoader color={"#000"} loading={true} size={64}/>
            }
        </div>
    )
}

export default City;
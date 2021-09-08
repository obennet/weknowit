import React, {useEffect} from "react";
import "./home.css"
import {Button} from "../../components/Button";
import { useHistory } from 'react-router-dom';

interface HomeProps {
    option: "city" | "country";
}

const Home = (): JSX.Element => {

    const history = useHistory();

    /**
     * Navigate to the search page for city or country depending on param option
     * @param option: city | country
     */
    const handleClick = ({option}: HomeProps): void => {
        history.push(`/search/${option}`);
    }


    return(
        <div className={"home-container"}>
            <Button text={"SEARCH BY CITY"} style={{marginRight: 32}} onClick={() => handleClick({option: "city"})}/>
            <Button text={"SEARCH BY COUNTRY"} onClick={() => handleClick({option: "country"})}/>
        </div>
    )
}
export default Home;
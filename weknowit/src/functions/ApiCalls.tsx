import React from "react";

interface ApiCallsProps {
    query: string;
}

const username = "weknowit";
const path = `http://api.geonames.org/search?type=json&username=${username}`;

export const getCountryCode = ({query}: ApiCallsProps) => {

    const countryPath = `${path}&maxRows=1&featureClass=A&featureCode=PCLI&q=${query}`;

    return fetch(countryPath)
        .then((response) => response.json())
        .then((jsonResponse) => {
            const resultCount = jsonResponse.totalResultsCount;
            if(resultCount > 0){
                const countryCode = jsonResponse.geonames[0]?.countryCode;
                return countryCode;
            }
            else {
                return "The searched country could not be found"
            }
        })
        .catch(error => {
            return error;
        });

}

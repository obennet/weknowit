import React from "react";
import {geoname} from "../types";

const username = "weknowit";
const path = `http://api.geonames.org/search?type=json&username=${username}`;

export const getCountryCode = (query: string) => {

    const fullPath = `${path}&maxRows=1&featureClass=A&featureCode=PCLI&q=${query}`;

    return fetch(fullPath)
        .then((response) => response.json())
        .then((jsonResponse) => {
            const resultCount = jsonResponse.totalResultsCount;
            if (resultCount > 0) {
                const countryCode = jsonResponse.geonames[0]?.countryCode;
                return countryCode;
            } else
                throw "The searched country could not be found"

        });
}

export const getCountryName = (countryCode: string) => {

    const fullPath = `${path}&maxRows=1&featureClass=A&featureCode=PCLI&country=${countryCode}`;

    return fetch(fullPath)
        .then((response) => response.json())
        .then((jsonResponse) => {
            const resultCount = jsonResponse.totalResultsCount;
            if (resultCount > 0) {
                const country = jsonResponse.geonames[0]?.name;
                return country;
            } else
                return "Could not find country"

        })
        .catch(error => {
            return error;
        });
}

export const getMostPopulatedCitiesName = (countryCode: string ) => {
    const fullPath = `${path}&maxRows=3&featureCode=PPLC&featureCode=PPLA&orderby=population&country=${countryCode}`;

    return fetch(fullPath)
        .then((response) => response.json())
        .then((jsonResponse) => {
            const resultCount = jsonResponse.totalResultsCount;
            if (resultCount > 0) {
                const cities = jsonResponse.geonames;
                let citiesName:string[] = [];
                cities.forEach((city: geoname) => {citiesName.push(city.name)});
                return citiesName;
            }
            else
                return "Could not find cities"
        })
        .catch((error) => {
            return error;
        });

}

export const getCityName = (query: string) => {
    const fullPath = `${path}&maxRows=1&featureCode=PPLC&featureCode=PPLA&orderby=population&q=${query}`;

    return fetch(fullPath)
        .then((response) => response.json())
        .then((jsonResponse) => {
            const resultCount = jsonResponse.totalResultsCount;
            if(resultCount > 0){
                const city = jsonResponse.geonames[0].name;
                return city;
            }
            else
                throw "The searched city could not be found";
        });
}

export const getCityPopulation = (cityName: string) => {
    const fullPath = `${path}&maxRows=1&featureCode=PPLC&featureCode=PPLA&orderby=population&name_equals=${cityName}`;

    return fetch(fullPath)
        .then((response) => response.json())
        .then((jsonResponse) => {
            const resultCount = jsonResponse.totalResultsCount;
            if(resultCount > 0){
                const population = jsonResponse.geonames[0].population;
                return population;
            }
            else
                throw "Population of city could not be found";
        });
}

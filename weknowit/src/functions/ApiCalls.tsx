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
                throw new Error("The searched country could not be found");
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
                throw new Error("Could not find country");
        });
}

export const getMostPopulatedCitiesName = (countryCode: string) => {
    const fullPath = `${path}&maxRows=3&featureCode=PPLC&featureCode=PPLA&orderby=population&country=${countryCode}`;
    return fetch(fullPath)
        .then((response) => response.json())
        .then((jsonResponse) => {
            const resultCount = jsonResponse.totalResultsCount;
            if (resultCount > 0) {
                const cities = jsonResponse.geonames;
                let citiesName: string[] = [];
                cities.forEach((city: geoname) => {
                    citiesName.push(city.name)
                });
                return citiesName;
            } else
                throw new Error("Could not find cities")
        });

}

export const getCityName = (query: string) => {
    const fullPath = `${path}&maxRows=1&featureCode=PPLC&featureCode=PPLA&orderby=population&q=${query}`;
    return fetch(fullPath)
        .then((response) => response.json())
        .then((jsonResponse) => {
            const resultCount = jsonResponse.totalResultsCount;
            if (resultCount > 0) {
                const city = jsonResponse.geonames[0].name;
                return city;
            } else
                throw new Error("The searched city could not be found");
        });
}

export const getCityPopulation = (cityName: string) => {
    const fullPath = `${path}&maxRows=1&featureCode=PPLC&featureCode=PPLA&orderby=population&name_equals=${cityName}`;
    return fetch(fullPath)
        .then((response) => response.json())
        .then((jsonResponse) => {
            const resultCount = jsonResponse.totalResultsCount;
            if (resultCount > 0) {
                const population = jsonResponse.geonames[0].population;
                return population;
            } else
                throw new Error("Population of city could not be found");
        });
}

import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Country from "./pages/Country";
import City from "./pages/City";

/**
 * Router for navigation between pages
 * @constructor
 */
function App() {
    return (
        <Router>
            <a href={"/"}>
                <h1 style={{textAlign: 'center', margin: 32}}>CityPop</h1>
            </a>
            <Switch>
                <Route path="/search/city/:cityName">
                    <City/>
                </Route>
                <Route path="/search/country/:countryCode/:cityName">
                    <City/>
                </Route>
                <Route path="/search/country/:countryCode">
                    <Country/>
                </Route>
                <Route path="/search/:option">
                    <Search/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
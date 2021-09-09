import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Result from "./pages/Result";

function App() {
  return (
      <Router>
        <h1 style={{textAlign: 'center', margin: 32}}>CityPop</h1>
          <Switch>
            <Route path="/search/:option/:country">
              <Result />
            </Route>
            <Route path="/search/:option">
              <Search />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
  );
}

export default App;
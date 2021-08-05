import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BooksApp from "./App";

const Navigation = () => {
  return (
    <Router>
      <Switch>
        <Route component={BooksApp} />
      </Switch>
    </Router>
  );
};

export default Navigation;

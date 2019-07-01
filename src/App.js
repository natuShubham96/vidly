import React, { Component } from "react";
import Movies from "./Movies";
import { Route, Redirect, Switch } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/common/navBar";
import NotFound from "./components/common/notFound";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/rentals" component={Rentals} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;

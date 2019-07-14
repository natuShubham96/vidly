import React, {Component} from 'react';
import Movies from './Movies';
import {Route, Redirect, Switch} from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NavBar from './components/common/navBar';
import NotFound from './components/common/notFound';
import LinkClick from './components/common/linkClick';
import LoginForm from './components/common/loginForm';
import RegisterForm from './components/registerForm';
import MovieForm from './components/movieForm';

class App extends Component {
  render () {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/rentals" component={Rentals} />
          <Redirect from="/" exact to="/login" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;

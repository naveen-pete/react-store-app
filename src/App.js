import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from './nav';
import Home from './home';
import Products from './products';
import Customers from './customers';
import AppAlert from './app-alert';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h2>My Product Store</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Nav />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/products" component={Products} />
              <Route path="/customers" component={Customers} />
              <Route
                render={() => <AppAlert type="warning" message="Not Found!" />}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

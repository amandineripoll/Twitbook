import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import Provider from './components/Provider';
import Home from './pages';
import Nav from './components/Nav';

const AppRouter = () => (
  <Provider>
    <Router>
      <Nav />

      <Route path="/" exact component={Home} />
    </Router>
  </Provider>
);

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import FirebaseProvider from './components/Firebase';
import Provider from './components/Provider';
import Nav from './components/Nav';
import Home from './pages';
import SignIn from './pages/signIn';
import SignOut from './pages/signOut';
import SignUp from './pages/signUp';

const AppRouter = () => (
  <FirebaseProvider>
    <Provider>
      <Router>
        <Nav />
        <Route path="/" exact component={Home} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signOut" component={SignOut} />
        <Route path="/signUp" component={SignUp} />
      </Router>
    </Provider>
  </FirebaseProvider>
);

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

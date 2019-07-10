import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bulma';
import { Container } from 'bloomer';

import * as serviceWorker from './serviceWorker';

import FirebaseProvider from './components/Firebase';
import Nav from './components/Nav';
import Home from './pages';
import SignIn from './pages/signIn';
import SignOut from './pages/signOut';
import SignUp from './pages/signUp';
import Profile from './pages/profile';
import Search from './pages/search';

const AppRouter = () => (
  <FirebaseProvider>
    <Router>
      <Nav />
      <Container>
        <Route path="/" exact component={Home} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signOut" component={SignOut} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/profile/:username" component={Profile} />
        <Route path="/search/:terms" component={Search} />
      </Container>
    </Router>
  </FirebaseProvider>
);

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

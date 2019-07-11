import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';

export const FirebaseContext = React.createContext({});

const config = {
  /*apiKey: 'AIzaSyBAwLNwcCubpIzSalGFAgp7bT7RbcqZkow',
  authDomain: 'twitbook-aecd0.firebaseapp.com',
  databaseURL: 'https://twitbook-aecd0.firebaseio.com',
  projectId: 'twitbook-aecd0',
  storageBucket: '',
  messagingSenderId: '991479449408',
  appId: '1:991479449408:web:8ce2a26dc3090f13'*/
  apiKey: 'AIzaSyCGpUeGPZdetPW8R9n6sfrYwc7igoXdbVg',
  authDomain: 'fir-twitbook.firebaseapp.com',
  databaseURL: 'https://fir-twitbook.firebaseio.com',
  projectId: 'fir-twitbook',
  storageBucket: 'fir-twitbook.appspot.com',
  messagingSenderId: '654786788567',
  appId: '1:654786788567:web:4f5b7371abe091b7',
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  signUp = (username, name, email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password).then(({ user }) =>
      this.user(user.uid).set({
        username: username.toLowerCase(),
        name,
        email,
      })
    );

  signIn = (email, password) =>
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => localStorage.setItem('user', JSON.stringify(user)));

  signOut = () =>
    this.auth.signOut().then(() => localStorage.removeItem('user'));

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  getUserByUsername = username =>
    this.users()
      .orderByChild('username')
      .equalTo(username);

  findUsers = terms =>
    this.users()
      .orderByChild('username')
      .startAt(terms)
      .endAt(terms + '\uf8ff');

  tweet = uid => this.db.ref(`tweets/${uid}`);

  tweets = () => this.db.ref(`tweets`);

  postTweet = (tweet, uid, username, name) => {
    const date = format(new Date(), 'D MMM YYYY', { locale: fr });
    const timestamp = new Date().getTime();
    this.db
      .ref()
      .child('tweets')
      .push({
        tweet,
        uid,
        username,
        name,
        date,
        timestamp,
      });
  };

  getTweets = (limit, uid) =>
    this.db
      .ref()
      .child('tweets')
      .limitToLast(limit)
      .orderByChild('uid')
      .equalTo(uid);

  postFollowers = (follower, followed) => {
    this.db
      .ref()
      .child('followers')
      .push({
        follower,
        followed,
      });
  };

  getFollowers = uid =>
    this.db
      .ref()
      .child('followers')
      .orderByChild('follower')
      .equalTo(uid);

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref(`messages`);

  postMessage = (message, uid, username) => {
    const date = format(new Date(), 'D MMM YYYY', { locale: fr });
    const timestamp = new Date().getTime();
    const orderCurrentuserUsername = uid + username;
    this.db
      .ref()
      .child('messages')
      .push({
        message,
        uid,
        username,
        date,
        timestamp,
        orderCurrentuserUsername,
      });
  };

  getMessages = (limit, uid) =>
    this.db
      .ref()
      .child('messages')
      .limitToLast(limit)
      .orderByChild('uid')
      .equalTo(uid);

  getMessagesByUsername = (limit, orderCurrentuserUsername) =>
    this.db
      .ref()
      .child('messages')
      .limitToLast(limit)
      .orderByChild('orderCurrentuserUsername')
      .equalTo(orderCurrentuserUsername);
}

class FirebaseProvider extends React.Component {
  state = {
    firebase: new Firebase(),
  };

  render() {
    const { children } = this.props;
    return (
      <FirebaseContext.Provider value={{ ...this.state }}>
        {children}
      </FirebaseContext.Provider>
    );
  }
}

export default FirebaseProvider;

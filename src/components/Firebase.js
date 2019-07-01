import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export const FirebaseContext = React.createContext({});

const config = {
  apiKey: 'AIzaSyBAwLNwcCubpIzSalGFAgp7bT7RbcqZkow',
  authDomain: 'twitbook-aecd0.firebaseapp.com',
  databaseURL: 'https://twitbook-aecd0.firebaseio.com',
  projectId: 'twitbook-aecd0',
  storageBucket: '',
  messagingSenderId: '991479449408',
  appId: '1:991479449408:web:8ce2a26dc3090f13',
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  signUp = (username, email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password).then(({ user }) =>
      this.user(user.uid).set({
        username,
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

  findUsers = terms =>
    this.users()
      .orderByChild('username')
      .startAt(terms)
      .endAt(terms + '\uf8ff');

  tweet = uid => this.db.ref(`tweets/${uid}`);

  tweets = () => this.db.ref(`tweets`);

  postTweet = (tweet, uid) => {
    const timestamp = new Date().getTime();
    this.db
      .ref()
      .child('tweets')
      .push({
        uid,
        tweet,
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

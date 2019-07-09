import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';

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

  like = lid => this.db.ref(`likes/${lid}`);

  likes = () => this.db.ref('likes');

  getUserByUsername = username =>
    this.users()
      .orderByChild('username')
      .equalTo(username);

  findUsers = terms =>
    this.users()
      .orderByChild('username')
      .startAt(terms)
      .endAt(terms + '\uf8ff');

  tweet = tid => this.db.ref(`tweets/${tid}`);

  tweets = () => this.db.ref(`tweets`);

  postTweet = (tweet, uid) => {
    const date = format(new Date(), 'D MMM YYYY', { locale: fr });
    const timestamp = new Date().getTime();
    this.db
      .ref()
      .child('tweets')
      .push({
        tweet,
        uid,
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

  reply = rid => this.db.ref(`replies/${rid}`);

  postReply = (tid, tweet, uid) => {
    const date = format(new Date(), 'D MMM YYYY', { locale: fr });
    const timestamp = new Date().getTime();
    this.db
      .ref()
      .child('replies')
      .push({
        tid,
        tweet,
        uid,
        date,
        timestamp,
      });
  };

  getReplies = tid =>
    this.db
      .ref()
      .child('replies')
      .orderByChild('tid')
      .equalTo(tid);

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

  postLike = (tid, uid) => {
    this.db
      .ref()
      .child('likes')
      .push({
        tid,
        uid,
      });
  };

  getLikes = tid =>
    this.db
      .ref()
      .child('likes')
      .orderByChild('tid')
      .equalTo(tid);
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

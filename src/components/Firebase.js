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
  appId: '1:991479449408:web:8ce2a26dc3090f13'
  /*apiKey: 'AIzaSyCGpUeGPZdetPW8R9n6sfrYwc7igoXdbVg',
  authDomain: 'fir-twitbook.firebaseapp.com',
  databaseURL: 'https://fir-twitbook.firebaseio.com',
  projectId: 'fir-twitbook',
  storageBucket: 'fir-twitbook.appspot.com',
  messagingSenderId: '654786788567',
  appId: '1:654786788567:web:4f5b7371abe091b7',*/
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

  postTweet = (tweet, uid, tid = '') => {
    const date = format(new Date(), 'D MMM YYYY', { locale: fr });
    const timestamp = new Date().getTime();
    let item = {
      tweet,
      uid,
      date,
      timestamp,
    };
    if (tid) {
      item = {
        tid,
        tweet,
        uid,
        date,
        timestamp,
      };
    }
    this.db
      .ref()
      .child('tweets')
      .push(item);
  };

  getTweets = (uid, limit) =>
    new Promise(resolve => {
      const allTweets = [];
      this.db
        .ref()
        .child('tweets')
        .limitToLast(limit)
        .orderByChild('uid')
        .equalTo(uid)
        .on('value', snapshot => {
          const t = snapshot.val();
          for (let tweet in t) {
            if (!('tid' in t[tweet])) {
              allTweets.push({
                tid: tweet,
                uid: t[tweet].uid,
                tweet: t[tweet].tweet,
                date: t[tweet].date,
                timestamp: t[tweet].timestamp,
              });
            }
          }
          resolve(allTweets);
        });
    });

  getReplies = tid =>
    this.db
      .ref()
      .child('tweets')
      .orderByChild('tid')
      .equalTo(tid);

  retweet = rid => this.db.ref(`retweets/${rid}`);

  retweets = () => this.db.ref('retweets');

  postRetweet = (tid, uid) => {
    this.db
      .ref()
      .child('retweets')
      .push({
        tid,
        uid,
      });
  };

  getRetweets = tid =>
    this.db
      .ref()
      .child('retweets')
      .orderByChild('tid')
      .equalTo(tid);

  getIdRetweets = (uid, limit) =>
    new Promise(resolve => {
      this.db
        .ref()
        .child('retweets')
        .limitToLast(limit)
        .orderByChild('uid')
        .equalTo(uid)
        .on('value', snapshot => {
          const retweets = snapshot.val();
          const allRetweets = [];
          for (let rt in retweets) {
            allRetweets.push(retweets[rt].tid);
          }
          resolve(allRetweets);
        });
    });

  getUserRetweets = (tids, ruid = '') =>
    new Promise(resolve => {
      const allRetweets = [];
      for (let i = 0; i < tids.length; i++) {
        this.tweet(tids[i]).on('value', snapshot => {
          const tweet = snapshot.val();
          allRetweets.push({ tid: tids[i], rtBy: ruid, ...tweet });
        });
      }
      resolve(allRetweets);
    });

  follow = fid => this.db.ref(`followers/${fid}`);

  follows = () => this.db.ref('followers');

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

  getFollowed = uid =>
    new Promise(resolve => {
      this.getFollowers(uid).on('value', snapshot => {
        const followers = snapshot.val();
        const followed = [uid];
        for (let follower in followers) {
          followed.push(followers[follower].followed);
        }
        resolve(followed);
      });
    });

  getAllFolloweds = uid =>
    new Promise(resolve => {
      this.getFollowers(uid).on('value', snapshot => {
        const followers = snapshot.val();
        const f = [];
        for (let follower in followers) {
          f.push(followers[follower].followed);
        }
        resolve(f);
      });
    });

  getAllFollowers = uid =>
    new Promise(resolve => {
      this.db
        .ref()
        .child('followers')
        .orderByChild('followed')
        .equalTo(uid)
        .on('value', snapshot => {
          const followers = snapshot.val();
          const f = [];
          for (let follower in followers) {
            f.push(followers[follower].follower);
          }
          resolve(f);
        });
    });

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

import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';

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
  }

  signUp = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);
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

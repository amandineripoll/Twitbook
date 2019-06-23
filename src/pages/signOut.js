import React, { useContext } from 'react';
import { FirebaseContext } from '../components/Firebase';

const SignOut = () => {
  const { firebase } = useContext(FirebaseContext);
  firebase.signOut().then(() => (window.location.href = '/signIn'));
  return <></>;
};

export default SignOut;

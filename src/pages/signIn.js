import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../components/Firebase';

const SignIn = ({ history }) => {
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSignIn = e => {
    e.preventDefault();
    firebase.signIn(email, password).then(() => (window.location.href = '/'));
  };
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) history.push('/');
  return (
    <form>
      <input type="email" onChange={e => setEmail(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={onSignIn}>Se connecter</button>
    </form>
  );
};

export default SignIn;

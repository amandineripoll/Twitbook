import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../components/Firebase';

const SignUp = ({ history }) => {
  const { firebase } = useContext(FirebaseContext);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onSignUp = e => {
    e.preventDefault();
    if (password === confirmPassword) {
      firebase
        .signUp(email, password)
        .then(() => history.push('/signIn'))
        .catch(error => setError(error.message));
    } else {
      setError('Passwords should match.');
    }
  };
  return (
    <form>
      <input type="email" onChange={e => setEmail(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <input
        type="password"
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <p>{error}</p>
      <button onClick={onSignUp}>S'inscrire</button>
    </form>
  );
};

export default SignUp;

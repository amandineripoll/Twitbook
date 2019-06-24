import React, { useState, useContext } from 'react';
import { Label, Control, Input, Button, Columns, Column, Title } from 'bloomer';
import { FirebaseContext } from '../components/Firebase';
import Loader from '../components/Loader';

const SignIn = ({ history }) => {
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const onSignIn = e => {
    e.preventDefault();
    setLoading(true);
    firebase
      .signIn(email, password)
      .then(() => (window.location.href = '/'))
      .catch(() => {
        setLoading(false);
        setError(`L'email ou le mot de passe est invalide.`);
      });
  };
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) history.push('/');
  if (loading) {
    return (
      <Columns isCentered>
        <Loader />
      </Columns>
    );
  }
  return (
    <Columns isCentered>
      <Column isSize="1/4">
        <Title>Connexion</Title>
        <form>
          <Label>Email</Label>
          <Control>
            <Input type="email" onChange={e => setEmail(e.target.value)} />
          </Control>
          <Label>Mot de passe</Label>
          <Control>
            <Input
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </Control>
          <p>{error}</p>
          <Button onClick={onSignIn}>Se connecter</Button>
        </form>
      </Column>
    </Columns>
  );
};

export default SignIn;

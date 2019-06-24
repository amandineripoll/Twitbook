import React, { useState, useContext } from 'react';
import { Label, Control, Input, Button, Columns, Column, Title } from 'bloomer';
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
          <Button onClick={onSignIn}>Se connecter</Button>
        </form>
      </Column>
    </Columns>
  );
};

export default SignIn;

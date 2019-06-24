import React, { useState, useContext } from 'react';
import { Label, Control, Input, Button, Columns, Column, Title } from 'bloomer';

import { FirebaseContext } from '../components/Firebase';
import Loader from '../components/Loader';

const SignUp = ({ history }) => {
  const { firebase } = useContext(FirebaseContext);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const onSignUp = e => {
    e.preventDefault();
    setLoading(true);
    if (password === confirmPassword) {
      firebase
        .signUp(username, email, password)
        .then(() => history.push('/signIn'))
        .catch(error => {
          setLoading(false);
          setError(error.message);
        });
    } else {
      setLoading(false);
      setError('Passwords should match.');
    }
  };
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
        <Title>Inscription</Title>
        <form>
          <Label>Nom d'utilisateur</Label>
          <Control>
            <Input type="text" onChange={e => setUsername(e.target.value)} />
          </Control>
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
          <Label>Confirmer le mot de passe</Label>
          <Control>
            <Input
              type="password"
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Control>
          <p>{error}</p>
          <Button onClick={onSignUp}>S'inscrire</Button>
        </form>
      </Column>
    </Columns>
  );
};

export default SignUp;

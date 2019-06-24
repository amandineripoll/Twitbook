import React, { useState, useContext } from 'react';
import { Label, Control, Input, Button, Columns, Column, Title } from 'bloomer';
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
    <Columns isCentered>
      <Column isSize="1/4">
        <Title>Inscription</Title>
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

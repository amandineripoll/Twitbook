import React, { useState, useContext } from 'react';
import { Label, Control, Input, Button, Columns, Column, Title } from 'bloomer';

import { FirebaseContext } from '../components/Firebase';
import Loader from '../components/Loader';

const SignUp = ({ history }) => {
  const { firebase } = useContext(FirebaseContext);
  const [error, setError] = useState('');
  const [errorUsername, setErrorUsername] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const trimAndLowerCase = value => value.replace(/\s*\W*/g, '').toLowerCase();
  const onUsernameChange = e => {
    const username = trimAndLowerCase(e.target.value);
    e.target.value = username;
    setUsername(username);

    firebase.getUserByUsername(username).on('value', snapshot => {
      const usernameExists = snapshot.val();
      if (usernameExists) {
        setErrorUsername(true);
        setError(`Ce nom d'utilisateur est déjà utilisé.`);
      } else {
        setError('');
        setErrorUsername(false);
      }
    });
  };
  const onSignUp = e => {
    e.preventDefault();
    setLoading(true);
    if (password === confirmPassword && !errorUsername) {
      firebase
        .signUp(trimAndLowerCase(username), name, email, password)
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
        <Title hasTextAlign="centered">Inscription</Title>
        <form>
          <Label>Nom d'utilisateur</Label>
          <Control>
            <Input type="text" onChange={onUsernameChange} />
          </Control>
          <Label>Nom</Label>
          <Control>
            <Input type="text" onChange={e => setName(e.target.value)} />
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
          <Button onClick={onSignUp} disabled={errorUsername}>
            S'inscrire
          </Button>
        </form>
      </Column>
    </Columns>
  );
};

export default SignUp;

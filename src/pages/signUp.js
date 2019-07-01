import React, { useState, useContext, useEffect } from 'react';
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
  const onSignUp = e => {
    e.preventDefault();
    setLoading(true);
    if (password === confirmPassword && !errorUsername) {
      firebase
        .signUp(username, name, email, password)
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

  useEffect(() => {
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
  }, [username]);

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
            <Input type="text" onChange={e => setUsername(e.target.value)} />
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

import React, { useContext } from 'react';
import { Button } from 'bloomer';
import { FirebaseContext } from '../Firebase';

const DeleteTweet = ({ tid }) => {
  const { firebase } = useContext(FirebaseContext);
  return (
    <Button onClick={() => firebase.tweet(tid).remove()}>Supprimer</Button>
  );
};

export default DeleteTweet;

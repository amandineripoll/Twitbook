import React, { useContext } from 'react';
import { Button } from 'bloomer';
import { FirebaseContext } from '../Firebase';

const DeleteTweet = ({ type, tid }) => {
  const { firebase } = useContext(FirebaseContext);
  return (
    <Button
      onClick={() =>
        type === 'tweet'
          ? firebase.tweet(tid).remove()
          : firebase.reply(tid).remove()
      }
    >
      Supprimer
    </Button>
  );
};

export default DeleteTweet;

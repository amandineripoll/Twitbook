import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import { Box, TextArea, Button } from 'bloomer';

const NewMessage = () => {
  const { firebase } = useContext(FirebaseContext);
  const [message, setMessage] = useState('');
  const onClick = () => {
    const { uid } = JSON.parse(window.localStorage.getItem('user'));
    firebase.user(uid).on('value', snapshot => {
      const { username } = snapshot.val();
      firebase.postMessage(message, uid, username);
      setMessage('');
    });
  };
  return (
    <Box>
      <form>
        <TextArea
          style={{ resize: 'none' }}
          onChange={e => setMessage(e.target.value)}
          value={message}
        />
        <Button onClick={onClick}>Envoyer</Button>
      </form>
    </Box>
  );
};

export default NewMessage;

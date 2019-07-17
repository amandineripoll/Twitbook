import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import { Box, TextArea, Button } from 'bloomer';

const NewMessage = ({ usernameMessage }) => {
  const { firebase } = useContext(FirebaseContext);
  const [message, setMessage] = useState('');
  console.log(usernameMessage);
  const onClick = () => {
    const { uid } = JSON.parse(window.localStorage.getItem('user'));
    firebase.postMessage(message, uid, usernameMessage);
    setMessage('');
  };

  if (usernameMessage) {
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
  }
  return <></>;
};

export default NewMessage;

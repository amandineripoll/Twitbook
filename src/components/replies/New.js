import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import { Box, TextArea, Button } from 'bloomer';

const NewReply = ({ tid }) => {
  const { firebase } = useContext(FirebaseContext);
  const [reply, setReply] = useState('');
  const onClick = () => {
    const { uid } = JSON.parse(window.localStorage.getItem('user'));
    firebase.postReply(tid, reply, uid);
    setReply('');
  };
  return (
    <Box>
      <form>
        <TextArea
          style={{ resize: 'none' }}
          onChange={e => setReply(e.target.value)}
          value={reply}
        />
        <Button onClick={onClick}>Répondre</Button>
      </form>
    </Box>
  );
};

export default NewReply;

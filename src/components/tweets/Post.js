import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import { Box, TextArea, Button } from 'bloomer';

const Post = ({ tid }) => {
  const { firebase } = useContext(FirebaseContext);
  const [msg, setMsg] = useState('');
  const onClick = () => {
    const { uid } = JSON.parse(window.localStorage.getItem('user'));
    if (msg) {
      firebase.postTweet(msg, uid, tid);
    }
    setMsg('');
  };
  return (
    <Box>
      <form>
        <TextArea
          style={{ resize: 'none' }}
          onChange={e => setMsg(e.target.value)}
          value={msg}
        />
        <Button onClick={onClick}>Tweeter</Button>
      </form>
    </Box>
  );
};

export default Post;

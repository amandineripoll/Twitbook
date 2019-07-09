import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import { Box, TextArea, Button } from 'bloomer';

const Post = ({ type = 'tweet', tid }) => {
  const { firebase } = useContext(FirebaseContext);
  const [msg, setMsg] = useState('');
  const onClick = () => {
    const { uid } = JSON.parse(window.localStorage.getItem('user'));
    if (msg) {
      type === 'tweet'
        ? firebase.postTweet(msg, uid)
        : firebase.postReply(tid, msg, uid);
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
        <Button onClick={onClick}>
          {type === 'tweet' ? 'Tweeter' : 'Répondre'}
        </Button>
      </form>
    </Box>
  );
};

export default Post;

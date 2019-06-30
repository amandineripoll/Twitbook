import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import { Box, TextArea, Button } from 'bloomer';

const NewTweet = () => {
  const { firebase } = useContext(FirebaseContext);
  const [tweet, setTweet] = useState('');
  const onClick = () => {
    const { uid } = JSON.parse(window.localStorage.getItem('user'));
    firebase.postTweet(tweet, uid);
    setTweet('');
  };
  return (
    <Box>
      <form>
        <TextArea
          style={{ resize: 'none' }}
          onChange={e => setTweet(e.target.value)}
          value={tweet}
        />
        <Button onClick={onClick}>Tweeter</Button>
      </form>
    </Box>
  );
};

export default NewTweet;

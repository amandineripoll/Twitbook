import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import { Box, TextArea, Button } from 'bloomer';

const NewTweet = () => {
  const { firebase } = useContext(FirebaseContext);
  const [tweet, setTweet] = useState('');
  const onClick = () => {
    firebase.postTweet(tweet);
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

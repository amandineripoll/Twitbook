import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import { Box, TextArea, Button } from 'bloomer';

const NewTweet = () => {
  const { firebase } = useContext(FirebaseContext);
  const [tweet, setTweet] = useState('');
  return (
    <Box>
      <form>
        <TextArea
          style={{ resize: 'none' }}
          onChange={e => setTweet(e.target.value)}
        />
        <Button onClick={() => firebase.postTweet(tweet)}>Tweeter</Button>
      </form>
    </Box>
  );
};

export default NewTweet;

import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import { Box, TextArea, Button } from 'bloomer';

const NewTweet = () => {
  const { firebase } = useContext(FirebaseContext);
  const [tweet, setTweet] = useState('');
  const onClick = () => {
    const { uid } = JSON.parse(window.localStorage.getItem('user'));
    firebase.user(uid).on('value', snapshot => {
      const { username, name } = snapshot.val();
      firebase.postTweet(tweet, uid, username, name);
      setTweet('');
    });
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

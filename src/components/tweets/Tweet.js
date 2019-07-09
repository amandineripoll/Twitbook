import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'bloomer';

import { FirebaseContext } from '../Firebase';
import getTime from '../utils/getTimeFromTimestamp';
import Replies from './Replies';
import Like from './Like';
import Delete from './Delete';

const Tweet = ({ type = 'tweet', tweet }) => {
  const { firebase } = useContext(FirebaseContext);
  const [user, setUser] = useState({});
  const [uid, setUid] = useState('');

  useEffect(() => {
    const { uid } = JSON.parse(localStorage.getItem('user'));
    setUid(uid);

    firebase.user(tweet.uid).on('value', snapshot => {
      const { username, name } = snapshot.val();
      setUser({ username, name });
    });
  }, []);

  return (
    <Box>
      <Link to={`/profile/${user.username}`}>{user.name}</Link>{' '}
      <span style={{ color: 'grey' }}>
        @{user.username} · {tweet.date} {getTime(tweet.timestamp)}
      </span>
      <br />
      {tweet.tweet}
      <br />
      <Like tid={tweet.tid} />
      <Replies tid={tweet.tid} />
      {uid === tweet.uid && <Delete type={type} tid={tweet.tid} />}
    </Box>
  );
};

export default Tweet;

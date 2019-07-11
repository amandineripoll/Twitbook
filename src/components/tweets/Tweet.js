import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'bloomer';

import { FirebaseContext } from '../Firebase';
import getTime from '../utils/getTimeFromTimestamp';
import RtBy from './RtBy';
import Like from './Like';
import Retweet from './Retweet';
import Replies from './Replies';
import Delete from './Delete';

const Tweet = ({ tweet, profile = false, uid }) => {
  const { firebase } = useContext(FirebaseContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.user(tweet.uid).on('value', snapshot => {
      const { username, name } = snapshot.val();
      setUser({ username, name });
    });
  }, []);

  return (
    <Box>
      <RtBy profile={profile} uid={uid} tweet={tweet} />
      <Link to={`/profile/${user.username}`}>{user.name}</Link>{' '}
      <span style={{ color: 'grey' }}>
        @{user.username} · {tweet.date} {getTime(tweet.timestamp)}
      </span>
      <br />
      {tweet.tweet}
      <br />
      <Like tid={tweet.tid} />
      <Retweet tid={tweet.tid} />
      <Replies tid={tweet.tid} />
      {uid === tweet.uid && <Delete tid={tweet.tid} />}
    </Box>
  );
};

export default Tweet;

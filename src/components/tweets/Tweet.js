import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'bloomer';

import { FirebaseContext } from '../Firebase';
import getTime from '../utils/getTimeFromTimestamp';
import Like from './Like';
import Retweet from './Retweet';
import Replies from './Replies';
import Delete from './Delete';

const Tweet = ({ tweet, profile = false, uid }) => {
  const { firebase } = useContext(FirebaseContext);
  const [user, setUser] = useState({});
  const [rtByUser, setRtBy] = useState('vous');

  useEffect(() => {
    firebase.user(tweet.uid).on('value', snapshot => {
      const { username, name } = snapshot.val();
      setUser({ username, name });
    });

    if (profile) {
      const currentUid = JSON.parse(window.localStorage.getItem('user')).uid;
      if (currentUid !== uid) {
        firebase.user(uid).on('value', snapshot => {
          const { username } = snapshot.val();
          setRtBy(username);
        });
      }
    }

    if ('rtBy' in tweet && tweet.rtBy && tweet.rtBy !== uid) {
      firebase.user(tweet.rtBy).on('value', snapshot => {
        const { username } = snapshot.val();
        setRtBy(username);
      });
    }
  }, []);

  return (
    <Box>
      {'rtBy' in tweet && (
        <>
          <span style={{ color: 'grey' }}>Retweeté par {rtByUser}</span>
          <br />
        </>
      )}
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

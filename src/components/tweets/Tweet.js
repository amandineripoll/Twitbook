import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'bloomer';

import getTime from '../utils/getTimeFromTimestamp';
import Like from './Like';

const Tweet = ({ tweet }) => (
  <Box>
    <Link to={`/profile/${tweet.username}`}>{tweet.name}</Link>{' '}
    <span style={{ color: 'grey' }}>
      @{tweet.username} · {tweet.date} {getTime(tweet.timestamp)}
    </span>
    <br />
    {tweet.tweet}
    <br />
    <Like tid={tweet.tid} />
  </Box>
);

export default Tweet;

import React, { useState, useEffect, useContext } from 'react';
import { Box } from 'bloomer';
import InfiniteScroll from 'react-infinite-scroll-component';

import { FirebaseContext } from '../Firebase';

const Tweets = () => {
  const { firebase } = useContext(FirebaseContext);
  const [tweets, setTweets] = useState([]);
  const [limit, setLimit] = useState(5);
  const dbTweets = firebase.getTweets(limit);
  const getDate = timestamp => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    return `${hours}:${minutes.substr(-2)}`;
  };
  const fetchData = () => {
    setLimit(limit + 1);
    dbTweets.on('value', snapshot => {
      let tweets = snapshot.val();
      let allTweets = [];
      for (let tweet in tweets) {
        allTweets.push({
          tweet: tweets[tweet].tweet,
          timestamp: tweets[tweet].timestamp,
        });
      }
      setTweets(allTweets.reverse());
    });
  };

  useEffect(() => {
    fetchData();
  });

  return tweets.length ? (
    <InfiniteScroll
      dataLength={tweets.length}
      next={fetchData}
      hasMore={true}
      loader={<Box hasTextAlign="centered">Il n'y a plus de tweet !</Box>}
    >
      {tweets.map(({ tweet, timestamp }, id) => (
        <Box key={id}>
          {tweet}
          <br />
          {getDate(timestamp)}
        </Box>
      ))}
    </InfiniteScroll>
  ) : (
    <Box hasTextAlign="centered">
      Il n'y a pas de tweet ! N'hésitez pas à suivre des personnes.
    </Box>
  );
};

export default Tweets;

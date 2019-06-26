import React, { useState, useEffect, useContext } from 'react';
import { Box } from 'bloomer';

import { FirebaseContext } from '../Firebase';
import Loader from '../Loader';

const Tweets = () => {
  const { firebase } = useContext(FirebaseContext);
  const [tweets, setTweets] = useState([]);
  const [limit, setLimit] = useState(5);
  const getDate = timestamp => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    return `${date.toString().slice(4, 15)} ${hours}:${minutes.substr(-2)}`;
  };
  const fetchData = () => {
    firebase.getTweets(limit).on('value', snapshot => {
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
    setLimit(limit + 3);
  };

  useEffect(() => {
    fetchData();
  }, []);

  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      fetchData();
    }
  };

  return tweets.length ? (
    tweets.map(({ tweet, timestamp }, id) => (
      <Box key={id}>
        {tweet}
        <br />
        {getDate(timestamp)}
      </Box>
    ))
  ) : (
    <Box hasTextAlign="centered">
      <Loader />
      <br />
      N'hésitez pas à suivre des personnes.
    </Box>
  );
};

export default Tweets;

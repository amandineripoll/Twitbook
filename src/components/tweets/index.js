import React, { useState, useEffect, useContext } from 'react';
import { Box } from 'bloomer';

import { FirebaseContext } from '../Firebase';
import Loader from '../Loader';

const Tweets = () => {
  const { firebase } = useContext(FirebaseContext);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const dbTweets = firebase.getTweets();
    dbTweets.on('value', snapshot => {
      let tweets = snapshot.val();
      let allTweets = [];
      for (let tweet in tweets) {
        allTweets.push({ tweet: tweets[tweet].tweet });
      }
      setTweets(allTweets);
    });
  }, [firebase]);

  return tweets.length ? (
    tweets.map(({ tweet }, id) => <Box key={id}>{tweet}</Box>)
  ) : (
    <Box hasTextAlign="centered">
      <Loader />
    </Box>
  );
};

export default Tweets;

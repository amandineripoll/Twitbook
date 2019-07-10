import React, { useState, useEffect, useContext } from 'react';
import { Box } from 'bloomer';

import { FirebaseContext } from '../Firebase';
import Loader from '../Loader';
import Tweet from './Tweet';

const Tweets = ({ uid = '', profile }) => {
  const { firebase } = useContext(FirebaseContext);
  const [tweets, setTweets] = useState([]);
  const [limit, setLimit] = useState(10);

  const getTweetsByRelationship = () => {
    firebase.getFollowed(uid).then(followed => {
      const allTweets = [];
      for (let i = 0; i < followed.length; i++) {
        firebase.getTweets(followed[i], limit).then(tweets => {
          firebase.getIdRetweets(followed[i], limit).then(rts => {
            firebase.getUserRetweets(rts, followed[i]).then(retweets => {
              allTweets.push(...tweets, ...retweets);
              const uniqueTweets = Array.from(
                new Set(allTweets.map(a => a.tid))
              ).map(tid => {
                return allTweets.find(a => a.tid === tid);
              });
              if (i === followed.length - 1) {
                setTweets(
                  uniqueTweets.sort((a, b) => b.timestamp - a.timestamp)
                );
              }
            });
          });
        });
      }
      setLimit(limit + 3);
    });
  };
  const getOwnTweets = () => {
    firebase.getTweets(uid, limit).then(tweets => {
      firebase.getIdRetweets(uid, limit).then(rts => {
        firebase.getUserRetweets(rts).then(retweets => {
          const allTweets = [...tweets, ...retweets];
          const uniqueTweets = Array.from(
            new Set(allTweets.map(a => a.tid))
          ).map(tid => {
            return allTweets.find(a => a.tid === tid);
          });
          setTweets(uniqueTweets.sort((a, b) => b.timestamp - a.timestamp));
        });
      });
    });
    setLimit(limit + 3);
  };
  const fetchTweets = () =>
    profile ? getOwnTweets() : getTweetsByRelationship();

  useEffect(() => {
    firebase.tweets().on('child_added', () => fetchTweets());
    firebase.tweets().on('child_removed', () => fetchTweets());
    firebase.retweets().on('child_removed', () => fetchTweets());

    fetchTweets();
  }, [firebase, uid]);

  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      fetchTweets();
    }
  };

  return tweets.length ? (
    tweets.map(tweet => <Tweet key={tweet.tid} tweet={tweet} />)
  ) : (
    <Box hasTextAlign="centered">
      <Loader />
      <br />
      N'hésitez pas à suivre de nouvelles personnes.
    </Box>
  );
};

export default Tweets;

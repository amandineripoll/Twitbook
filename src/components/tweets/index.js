import React, { useState, useEffect, useContext } from 'react';
import { Box } from 'bloomer';

import { FirebaseContext } from '../Firebase';
import Loader from '../Loader';

const Tweet = ({ message, date }) => (
  <Box>
    {message}
    <br />
    {date}
  </Box>
);

const Tweets = () => {
  const { firebase } = useContext(FirebaseContext);
  const [tweets, setTweets] = useState([]);
  const [limit, setLimit] = useState(10);
  const getDate = timestamp => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    return `${date.toString().slice(4, 15)} ${hours}:${minutes.substr(-2)}`;
  };
  const getFollowed = () =>
    new Promise(resolve => {
      const user = JSON.parse(window.localStorage.getItem('user'));
      user &&
        'uid' in user &&
        firebase.getFollowers(user.uid).on('value', snapshot => {
          const followers = snapshot.val();
          const followed = [user.uid];
          for (let follower in followers) {
            followed.push(followers[follower].followed);
          }
          resolve(followed);
        });
    });
  const getTweets = uid =>
    new Promise(resolve => {
      const allTweets = [];
      firebase.getTweets(limit, uid).on('value', snapshot => {
        const t = snapshot.val();
        for (let tweet in t) {
          allTweets.push({
            tweet: t[tweet].tweet,
            timestamp: t[tweet].timestamp,
          });
        }
        resolve(allTweets);
      });
    });
  const getTweetsByRelationship = () => {
    getFollowed().then(followed => {
      const allTweets = [];
      for (let i = 0; i < followed.length; i++) {
        getTweets(followed[i]).then(tweets => {
          allTweets.push(...tweets);
          if (i === followed.length - 1) {
            setTweets(allTweets.sort((a, b) => b.timestamp - a.timestamp));
          }
        });
      }
      setLimit(limit + 3);
    });
  };

  useEffect(() => {
    firebase.tweets().on('child_added', () => getTweetsByRelationship());
    getTweetsByRelationship();
  }, [firebase]);

  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      getTweetsByRelationship();
    }
  };

  return tweets.length ? (
    tweets.map(({ tweet, timestamp }, id) => (
      <Tweet key={id} message={tweet} date={getDate(timestamp)} />
    ))
  ) : (
    <Box hasTextAlign="centered">
      <Loader />
      <br />
      N'hésitez pas à suivre de nouvelles personnes.
    </Box>
  );
};

export default Tweets;

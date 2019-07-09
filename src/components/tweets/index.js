import React, { useState, useEffect, useContext } from 'react';
import { Box } from 'bloomer';

import { FirebaseContext } from '../Firebase';
import Loader from '../Loader';
import Tweet from './Tweet';

const Tweets = ({ profile }) => {
  const { firebase } = useContext(FirebaseContext);
  const [tweets, setTweets] = useState([]);
  const [limit, setLimit] = useState(10);

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
          if (!('tid' in t[tweet])) {
            allTweets.push({
              tid: tweet,
              uid: t[tweet].uid,
              tweet: t[tweet].tweet,
              date: t[tweet].date,
              timestamp: t[tweet].timestamp,
            });
          }
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
  const getOwnTweets = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    user &&
      'uid' in user &&
      getTweets(user.uid).then(tweets => {
        setTweets(tweets.sort((a, b) => b.timestamp - a.timestamp));
      });
    setLimit(limit + 3);
  };
  const fetchTweets = () =>
    profile ? getOwnTweets() : getTweetsByRelationship();

  useEffect(() => {
    firebase.tweets().on('child_added', () => fetchTweets());
    firebase.tweets().on('child_removed', () => fetchTweets());

    fetchTweets();
  }, [firebase]);

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

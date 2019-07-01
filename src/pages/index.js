import React from 'react';
import NewTweet from '../components/tweets/New';
import Tweets from '../components/tweets';

const Home = ({ history }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) history.push('/signIn');
  return (
    <>
      <NewTweet />
      <Tweets />
    </>
  );
};

export default Home;

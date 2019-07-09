import React from 'react';
import PostTweet from '../components/tweets/Post';
import Tweets from '../components/tweets';

const Home = ({ history }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) history.push('/signIn');

  return (
    <>
      <PostTweet />
      <Tweets />
    </>
  );
};

export default Home;

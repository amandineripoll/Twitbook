import React from 'react';
import PostTweet from '../components/tweets/Post';
import Tweets from '../components/tweets';
import NewTweet from '../components/tweets/New';

const Home = ({ history }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) history.push('/signIn');

  return (
    <>
      <PostTweet />
      <Tweets uid={user.uid} />
    </>
  );
};

export default Home;

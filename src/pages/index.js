import React from 'react';
import PostTweet from '../components/tweets/Post';
import Tweets from '../components/tweets';
import withAuth from '../components/hocs/withAuth';

const Home = () => (
  <>
    <PostTweet />
    <Tweets />
  </>
);

export default withAuth(Home);

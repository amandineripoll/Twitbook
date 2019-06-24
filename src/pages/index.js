import React from 'react';
import NewTweet from '../components/tweets/New';
import Tweets from '../components/tweets';
import { Container } from 'bloomer';

const Home = ({ history }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) history.push('/signIn');
  return (
    <Container>
      <NewTweet />
      <Tweets />
    </Container>
  );
};

export default Home;

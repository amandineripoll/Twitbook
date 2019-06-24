import React from 'react';
import { Container, Box } from 'bloomer';

const Home = ({ history }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) history.push('/signIn');
  return (
    <Container>
      <Box>Home</Box>
    </Container>
  );
};

export default Home;

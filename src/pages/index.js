import React from 'react';

const Home = ({ history }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) history.push('/signIn');
  return <p>Home</p>;
};

export default Home;

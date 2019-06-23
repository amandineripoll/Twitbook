import React, { useContext } from 'react';
import { FirebaseContext } from '../components/Firebase';
import { Context } from '../components/Provider';

const Home = () => {
  const context = useContext(Context);
  const { firebase } = useContext(FirebaseContext);

  return <p>Home</p>;
};

export default Home;

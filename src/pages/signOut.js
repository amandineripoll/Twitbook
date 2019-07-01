import React, { useContext, useEffect } from 'react';
import { Box } from 'bloomer';

import { FirebaseContext } from '../components/Firebase';
import Loader from '../components/Loader';

const SignOut = () => {
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    firebase.signOut().then(() => (window.location.href = '/signIn'));
  }, []);

  return (
    <Box hasTextAlign="centered">
      <Loader />
    </Box>
  );
};

export default SignOut;

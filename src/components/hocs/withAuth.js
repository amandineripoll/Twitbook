import React from 'react';

const withAuth = Component => props => {
  const { history } = props;
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) history.push('/signIn');

  return user && <Component {...props} />;
};

export default withAuth;

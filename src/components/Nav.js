import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return (
      <nav>
        <Link to="/signIn">Sign in</Link>
        <Link to="/signUp">Sign up</Link>
      </nav>
    );
  }
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/signOut">Sign out</Link>
    </nav>
  );
};

export default Nav;

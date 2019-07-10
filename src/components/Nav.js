import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarItem, NavbarEnd, Button } from 'bloomer';

import { FirebaseContext } from './Firebase';
import SearchBar from './SearchBar';

const Nav = () => {
  const { firebase } = useContext(FirebaseContext);
  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    const { uid } = JSON.parse(localStorage.getItem('user'));
    firebase.user(uid).on('value', snapshot => {
      const user = snapshot.val();
      setUser(user);
    });
  }, []);

  return (
    <Navbar style={{ margin: '0', backgroundColor: '#00D1B2' }}>
      <NavbarBrand>
        <NavbarItem>
          <Link to="/">TwitBook</Link>
        </NavbarItem>
      </NavbarBrand>
      <NavbarEnd>
        <NavbarItem>
          {!currentUser ? (
            <>
              <Link to="/signIn">
                <Button>Connexion</Button>
              </Link>
              <Link to="/signUp">
                <Button>Inscription</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to={`/profile/${currentUser.username}`}>
                <Button>Profil</Button>
              </Link>
              <SearchBar />
              <Link to="/signOut">
                <Button>Déconnexion</Button>
              </Link>
            </>
          )}
        </NavbarItem>
      </NavbarEnd>
    </Navbar>
  );
};

export default Nav;

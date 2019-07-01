import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarItem, NavbarEnd, Button } from 'bloomer';

const Nav = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Navbar style={{ margin: '0', backgroundColor: '#00D1B2' }}>
      <NavbarBrand>
        <NavbarItem>
          <Link to="/">TwitBook</Link>
        </NavbarItem>
      </NavbarBrand>
      <NavbarEnd>
        <NavbarItem>
          {!user ? (
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
              <Link to="/profile/username">
                <Button>Profil</Button>
              </Link>
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

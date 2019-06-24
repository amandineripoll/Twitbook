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
              <Button>
                <Link to="/signIn">Connexion</Link>
              </Button>
              <Button>
                <Link to="/signUp">Inscription</Link>
              </Button>
            </>
          ) : (
            <Button>
              <Link to="/signOut">Déconnexion</Link>
            </Button>
          )}
        </NavbarItem>
      </NavbarEnd>
    </Navbar>
  );
};

export default Nav;

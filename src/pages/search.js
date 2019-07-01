import React, { useState, useEffect, useContext } from 'react';
import { Box, Title } from 'bloomer';
import { Link } from 'react-router-dom';

import { FirebaseContext } from '../components/Firebase';
import Loader from '../components/Loader';

const Search = ({ match }) => {
  const { firebase } = useContext(FirebaseContext);
  const [users, setUsers] = useState(null);
  const { terms } = match.params;

  useEffect(() => {
    firebase.findUsers(terms).on('value', snapshot => {
      const users = snapshot.val();
      const allUsers = [];
      for (let user in users) {
        allUsers.push({
          username: users[user].username,
          uid: user,
        });
      }
      setUsers(allUsers);
    });
  }, [terms, firebase]);

  if (!users) {
    return (
      <Box hasTextAlign="centered">
        <Loader />
      </Box>
    );
  }

  return users.length ? (
    <>
      <Title hasTextAlign="centered">Résultat avec le nom '{terms}'</Title>
      {users.map(user => (
        <Box key={user.uid}>
          <Link to={`/profile/${user.username}`}>{user.username}</Link>
        </Box>
      ))}
    </>
  ) : (
    <Title hasTextAlign="centered">
      Il n'y a pas d'utilisateur connu avec le nom '{terms}'
    </Title>
  );
};

export default Search;

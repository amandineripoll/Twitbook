import React, { useState, useEffect, useContext } from 'react';
import { Box } from 'bloomer';
import { Link } from 'react-router-dom';

import { FirebaseContext } from '../Firebase';

const Username = ({ username }) => (
  <Link to={`/messages/${username.username}`}>
    <Box>
      <span style={{ color: 'grey' }}>{username.username}</span>
    </Box>
  </Link>
);

const ListUserMessage = () => {
  const { firebase } = useContext(FirebaseContext);
  const [usernames, setUsernames] = useState([]);

  const getUsernames = uid =>
    new Promise(resolve => {
      const allUsernames = [];
      firebase.getMessages(10, uid).on('value', snapshot => {
        const m = snapshot.val();
        for (let message in m) {
          allUsernames.push({
            username: m[message].username,
          });
        }
        resolve(allUsernames);
      });
    });

  const getAllUsernames = () => {
    const { uid } = JSON.parse(window.localStorage.getItem('user'));
    getUsernames(uid).then(usernames => {
      const uniqueUsernames = Array.from(
        new Set(usernames.map(a => a.username))
      ).map(username => {
        return usernames.find(a => a.username === username);
      });

      setUsernames(uniqueUsernames);
    });
  };

  useEffect(() => {
    firebase.messages().on('child_added', () => getAllUsernames());
    getAllUsernames();
  }, [firebase]);

  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      getAllUsernames();
    }
  };

  return usernames.length ? (
    usernames.map((username, id) => <Username key={id} username={username} />)
  ) : (
    <span>Il n'y a pas d'utilisateur</span>
  );
};

export default ListUserMessage;

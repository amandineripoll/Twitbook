import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { FirebaseContext } from '../Firebase';

const RtBy = ({ profile, uid, tweet }) => {
  const { firebase } = useContext(FirebaseContext);
  const [rtByUser, setRtBy] = useState('vous');
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const currentUid = JSON.parse(window.localStorage.getItem('user')).uid;

    firebase.user(currentUid).on('value', snapshot => {
      const user = snapshot.val();
      setCurrentUser(user);
    });

    if (profile) {
      if (currentUid !== uid) {
        firebase.user(uid).on('value', snapshot => {
          const { username } = snapshot.val();
          setRtBy(username);
        });
      }
    }

    if ('rtBy' in tweet && tweet.rtBy && tweet.rtBy !== uid) {
      firebase.user(tweet.rtBy).on('value', snapshot => {
        const { username } = snapshot.val();
        setRtBy(username);
      });
    }
  }, []);

  return (
    'rtBy' in tweet &&
    currentUser && (
      <>
        <span style={{ color: 'grey' }}>
          Retweeté par{' '}
          <Link
            to={`/profile/${
              rtByUser === 'vous' ? currentUser.username : rtByUser
            }`}
          >
            {rtByUser}
          </Link>
        </span>
        <br />
      </>
    )
  );
};

export default RtBy;

import React, { useState, useEffect, useContext } from 'react';
import { Box } from 'bloomer';
import { Link } from 'react-router-dom';

import { FirebaseContext } from '../Firebase';
import Loader from '../Loader';
import getTime from '../utils/getTimeFromTimestamp';

const Message = ({ message }) => (
  <Box>
    <Link to={`/profile/${message.username}`}>{message.username}</Link>{' '}
    <span style={{ color: 'grey' }}>
      @{message.username} · {message.date} {getTime(message.timestamp)}
    </span>
    <br />
    {message.message}
    <br />
  </Box>
);

const Messages = () => {
  const { firebase } = useContext(FirebaseContext);
  const [messages] = useState([]);
  const [limit] = useState(10);

  const getMessages = uid =>
    new Promise(resolve => {
      const allMessages = [];
      firebase.getMessages(limit, uid).on('value', snapshot => {
        const m = snapshot.val();
        for (let message in m) {
          allMessages.push({
            message: m[message].message,
            username: m[message].username,
            date: m[message].date,
            timestamp: m[message].timestamp,
            orderCurrentuserUsername: m[message].orderCurrentuserUsername,
          });
        }
        resolve(allMessages);
      });
    });

  /*const getMessagesByUsername = () => {
    getFollowed().then(followed => {
      const allTweets = [];
      for (let i = 0; i < followed.length; i++) {
        getMessage(followed[i]).then(tweets => {
          allTweets.push(...tweets);
          if (i === followed.length - 1) {
            setTweets(allTweets.sort((a, b) => b.timestamp - a.timestamp));
          }
        });
      }
      setLimit(limit + 3);
    });
  };*/

  useEffect(() => {
    firebase.messages().on('child_added', () => getMessages());
    getMessages();
  }, [firebase]);

  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      getMessages();
    }
  };

  return messages.length ? (
    messages.map((message, id) => <Message key={id} message={message} />)
  ) : (
    <Box hasTextAlign="centered">
      <Loader />
      <br />
      N'hésitez pas à suivre de nouvelles personnes.
    </Box>
  );
};

export default Messages;

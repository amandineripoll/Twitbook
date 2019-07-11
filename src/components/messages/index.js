import React, { useState, useEffect, useContext } from 'react';
import { Box } from 'bloomer';
import { Link } from 'react-router-dom';

import { FirebaseContext } from '../Firebase';
import Loader from '../Loader';
import getTime from '../utils/getTimeFromTimestamp';
import { longStackTraces } from 'bluebird';

const Message = ({ message }) => (
  <Box>
    <span style={{ color: 'grey' }}>
      {message.username} · {message.date} {getTime(message.timestamp)}
    </span>
    <br />
    {message.message}
    <br />
  </Box>
);

const Messages = () => {
  const { firebase } = useContext(FirebaseContext);
  const [messages, setMessages] = useState([]);
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

  const getAllMessages = () => {
    const allMessages = [];
    const user = JSON.parse(window.localStorage.getItem('user'));
    console.log(user.uid);
    //console.log('test' + [user.uid]);
    //Aconsole.log([user.username]);
    getMessages(user.uid).then(messages => {
      allMessages.push(...messages);
      setMessages(allMessages.sort((a, b) => b.timestamp - a.timestamp));
    });
  };

  useEffect(() => {
    firebase.messages().on('child_added', () => getAllMessages());
    getAllMessages();
  }, [firebase]);

  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      getAllMessages();
    }
  };

  return messages.map((message, id) => <Message key={id} message={message} />);
};

export default Messages;

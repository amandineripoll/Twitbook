import React, { useState, useEffect, useContext } from 'react';
import { Box } from 'bloomer';
import { FirebaseContext } from '../Firebase';
import getTime from '../utils/getTimeFromTimestamp';

const Message = ({ message, sender, usernameReceiver }) => (
  <Box>
    <span style={{ color: 'grey' }}>
      {sender || usernameReceiver} · {message.date} {getTime(message.timestamp)}
    </span>
    <br />
    {message.message}
    <br />
  </Box>
);

const Messages = ({ usernameReceiver }) => {
  const { firebase } = useContext(FirebaseContext);
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState([]);
  const [limit] = useState(10);

  const getMessages = (uid, username) =>
    new Promise(resolve => {
      const allMessages = [];
      const receiver = [];
      firebase.getUserByUsername(usernameReceiver).on('value', snapshot => {
        const users = snapshot.val();
        for (let user in users) {
          receiver.push({
            uid: user,
          });
        }

        if (receiver.length) {
          firebase
            .getMessagesByUsername(limit, uid + '|' + usernameReceiver)
            .on('value', snapshot => {
              const m = snapshot.val();
              let senderUid = '';
              for (let message in m) {
                allMessages.push({
                  message: m[message].message,
                  username: m[message].username,
                  date: m[message].date,
                  timestamp: m[message].timestamp,
                  orderCurrentuserUsername: m[message].orderCurrentuserUsername,
                });
                senderUid = m[message].uid;
              }
              firebase.user(senderUid).on('value', snapshot => {
                const { username } = snapshot.val();
                setSender(username);
              });

              firebase
                .getMessagesByUsername(limit, receiver[0].uid + '|' + username)
                .on('value', snapshot => {
                  const m = snapshot.val();
                  for (let message in m) {
                    allMessages.push({
                      message: m[message].message,
                      username: m[message].username,
                      date: m[message].date,
                      timestamp: m[message].timestamp,
                      orderCurrentuserUsername:
                        m[message].orderCurrentuserUsername,
                    });
                  }
                });

              resolve(allMessages);
            });
        }
      });
    });

  const getAllMessages = () => {
    const allMessages = [];
    const { uid } = JSON.parse(window.localStorage.getItem('user'));
    if (usernameReceiver) {
      firebase.user(uid).on('value', snapshot => {
        const { username } = snapshot.val();

        getMessages(uid, username).then(messages => {
          allMessages.push(...messages);
          setMessages(allMessages.sort((a, b) => a.timestamp - b.timestamp));
        });
      });
    }
  };

  useEffect(() => {
    firebase.messages().on('child_added', () => getAllMessages());
    getAllMessages();
  }, [firebase, usernameReceiver]);

  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      getAllMessages();
    }
  };

  if (usernameReceiver) {
    return messages.map((message, id) => (
      <Message
        key={id}
        message={message}
        sender={sender}
        usernameReceiver={usernameReceiver}
      />
    ));
  }
  return <></>;
};

export default Messages;

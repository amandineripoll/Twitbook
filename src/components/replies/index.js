import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'bloomer';

import { FirebaseContext } from '../Firebase';
import PostReply from './Post';
import Tweet from '../tweets/Tweet';

const Replies = ({ tid }) => {
  const { firebase } = useContext(FirebaseContext);
  const [active, setActive] = useState(false);
  const [number, setNumber] = useState('');
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    firebase.getReplies(tid).on('value', snapshot => {
      const replies = snapshot.val();
      replies ? setNumber(Object.keys(replies).length) : setNumber('');
      const allReplies = [];
      for (let reply in replies) {
        allReplies.push({
          tid: reply,
          uid: replies[reply].uid,
          tweet: replies[reply].tweet,
          date: replies[reply].date,
          timestamp: replies[reply].timestamp,
        });
      }
      setReplies(allReplies);
    });
  }, []);

  return (
    <>
      <Button onClick={() => setActive(!active)}>
        {number ? `${number} Réponses` : 'Répondre'}
      </Button>
      {active && replies.length ? (
        <>
          {replies.map(reply => (
            <Tweet key={reply.tid} tweet={reply} />
          ))}
          <PostReply tid={tid} />
        </>
      ) : (
        active && <PostReply tid={tid} />
      )}
    </>
  );
};

export default Replies;

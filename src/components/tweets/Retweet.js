import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'bloomer';
import { FirebaseContext } from '../Firebase';

const Retweet = ({ tid }) => {
  const { firebase } = useContext(FirebaseContext);
  const [rid, setRid] = useState('');
  const [rtNumber, setNumber] = useState('');

  const onRetweet = () => {
    const { uid } = JSON.parse(window.localStorage.getItem('user'));
    firebase.postRetweet(tid, uid);
  };
  const onUnretweet = () => {
    firebase.retweet(rid).remove();
  };
  const getRetweet = () =>
    firebase.getRetweets(tid).on('value', snapshot => {
      const retweets = snapshot.val();
      const { uid } = JSON.parse(window.localStorage.getItem('user'));
      retweets ? setNumber(Object.keys(retweets).length) : setNumber('');
      setRid('');
      for (let retweet in retweets) {
        if (retweets[retweet].uid === uid) {
          setRid(retweet);
        }
      }
    });

  useEffect(() => {
    firebase.retweets().on('child_removed', () => getRetweet());
    getRetweet();
  }, []);

  return (
    <Button onClick={!rid ? onRetweet : onUnretweet}>
      {!rid ? `${rtNumber} Retweeter` : `${rtNumber} Enlever retweet`}
    </Button>
  );
};

export default Retweet;

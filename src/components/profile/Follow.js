import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'bloomer';
import { FirebaseContext } from '../Firebase';

const Follow = ({ uid, currentUid }) => {
  const { firebase } = useContext(FirebaseContext);
  const [fid, setFid] = useState('');
  const [isFollowed, setIsFollowed] = useState(false);

  const onFollow = () => firebase.postFollowers(currentUid, uid);
  const onUnfollow = () => firebase.follow(fid).remove();
  const getFollowers = () =>
    firebase.getFollowers(currentUid).on('value', snapshot => {
      const followers = snapshot.val();
      for (let follower in followers) {
        if (followers[follower].followed === uid) {
          setIsFollowed(true);
          setFid(follower);
        }
      }
    });

  useEffect(() => {
    firebase.follows().on('child_removed', () => setIsFollowed(false));
    getFollowers();
  }, []);

  return (
    <Button onClick={!isFollowed ? onFollow : onUnfollow}>
      {!isFollowed ? `S'abonner` : `Se désabonner`}
    </Button>
  );
};

export default Follow;

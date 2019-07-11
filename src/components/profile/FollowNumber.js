import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  ModalCardBody,
  ModalClose,
} from 'bloomer';

import { FirebaseContext } from '../Firebase';

const FollowNumber = ({ uid }) => {
  const { firebase } = useContext(FirebaseContext);
  const [modalFollowers, setModalFollowers] = useState(false);
  const [modalFolloweds, setModalFolloweds] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [followeds, setFolloweds] = useState([]);
  const [followersNumber, setFollowersNumber] = useState('');
  const [followedsNumber, setFollowedsNumber] = useState('');

  const getFollowers = () =>
    firebase.getAllFollowers(uid).then(followers => {
      setFollowersNumber(Object.keys(followers).length);
      const f = [];
      for (let i = 0; i < followers.length; i++) {
        firebase.user(followers[i]).on('value', snapshot => {
          const { name, username } = snapshot.val();
          f.push({ uid: followers[i], name, username });
          setFollowers(f);
        });
      }
    });
  const getFolloweds = () =>
    firebase.getAllFolloweds(uid).then(followeds => {
      setFollowedsNumber(Object.keys(followeds).length);
      const f = [];
      for (let i = 0; i < followeds.length; i++) {
        firebase.user(followeds[i]).on('value', snapshot => {
          const { name, username } = snapshot.val();
          f.push({ uid: followeds[i], name, username });
          setFolloweds(f);
        });
      }
    });

  useEffect(() => {
    firebase.follows().on('child_removed', () => {
      getFollowers();
      getFolloweds();
    });
    firebase.follows().on('child_added', () => {
      getFollowers();
      getFolloweds();
    });
    getFollowers();
    getFolloweds();
  }, [uid]);

  return (
    <>
      <Button onClick={() => followersNumber && setModalFollowers(true)}>
        {followersNumber > 1
          ? `${followersNumber} Abonnés`
          : followersNumber === 1
          ? '1 Abonné'
          : 'Abonné'}
      </Button>
      <Button onClick={() => followedsNumber && setModalFolloweds(true)}>
        {followedsNumber > 1
          ? `${followedsNumber} Abonnements`
          : followedsNumber === 1
          ? '1 Abonnement'
          : 'Abonnement'}
      </Button>
      <Modal isActive={modalFollowers}>
        <ModalBackground onClick={() => setModalFollowers(false)} />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>
              {followersNumber > 1
                ? `${followersNumber} Abonnés`
                : followersNumber === 1
                ? '1 Abonné'
                : 'Abonné'}
            </ModalCardTitle>
          </ModalCardHeader>
          <ModalCardBody>
            {followers.length &&
              followers.map(follower => (
                <>
                  <Link
                    onClick={() => setModalFollowers(false)}
                    to={`/profile/${follower.username}`}
                  >
                    {follower.name}
                  </Link>{' '}
                  <p style={{ color: 'grey' }}>@{follower.username}</p>
                </>
              ))}
          </ModalCardBody>
        </ModalCard>
        <ModalClose onClick={() => setModalFollowers(false)} />
      </Modal>
      <Modal isActive={modalFolloweds}>
        <ModalBackground onClick={() => setModalFolloweds(false)} />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>
              {followedsNumber > 1
                ? `${followedsNumber} Abonnements`
                : followedsNumber === 1
                ? '1 Abonnement'
                : 'Abonnement'}
            </ModalCardTitle>
          </ModalCardHeader>
          <ModalCardBody>
            {followeds.length &&
              followeds.map(followed => (
                <>
                  <Link
                    onClick={() => setModalFolloweds(false)}
                    to={`/profile/${followed.username}`}
                  >
                    {followed.name}
                  </Link>{' '}
                  <p style={{ color: 'grey' }}>@{followed.username}</p>
                </>
              ))}
          </ModalCardBody>
        </ModalCard>
        <ModalClose onClick={() => setModalFolloweds(false)} />
      </Modal>
    </>
  );
};

export default FollowNumber;

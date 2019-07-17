import React, { useState, useEffect, useContext } from 'react';
import {
  Columns,
  Column,
  Image,
  Box,
  Field,
  Control,
  Label,
  Input,
  Button,
} from 'bloomer';

import { FirebaseContext } from '../Firebase';
import Follow from '../profile/Follow';
import FollowNumber from '../profile/FollowNumber';
import Tweets from '../tweets';
import PostTweet from '../tweets/Post';
import Loader from '../Loader';

const Profile = ({ username }) => {
  const { firebase } = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [currentUid, setCurrentUid] = useState({});
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    const ref = firebase.storage.ref();
    const name = +new Date() + '-' + file.name;
    const task = ref.child(name).put(file);
    task
      .then(snapshot => {
        return snapshot.ref.getDownloadURL();
      })
      .then(downloadURL => {
        firebase.updatePathImg(currentUid, downloadURL);
      });
  };

  useEffect(() => {
    const { uid } = JSON.parse(window.localStorage.getItem('user'));
    setCurrentUid(uid);

    firebase.getUserByUsername(username).on('value', snapshot => {
      const users = snapshot.val();
      for (let user in users) {
        setUser({
          uid: user,
          name: users[user].name,
          username: users[user].username,
          path_img: users[user].path_img,
        });
      }
      setLoading(false);
    });
  }, [username]);

  if (loading) {
    return (
      <Columns hasTextAlign="centered">
        <Loader />
      </Columns>
    );
  }
  console.log(user);
  return (
    <Columns isCentered>
      <Column isSize="1/2">
        <Box>
          <Image
            isSize="128x128"
            src={
              user && 'path_img' in user
                ? user.path_img
                : 'https://randomuser.me/api/portraits/women/79.jpg'
            }
            isCentered
          />
          <Field>
            <Label>{Profile.username}</Label>
            <Control>
              {currentUid === user.uid && (
                <>
                  <Input
                    type="file"
                    id="imageInput"
                    onChange={event => setFile(event.target.files[0])}
                  />
                  <Button
                    isColor="info"
                    hasTextAlign="centered"
                    onClick={handleSubmit}
                  >
                    Valider
                  </Button>
                </>
              )}
            </Control>
          </Field>
          <p style={{ margin: '0 0 5rem' }}>
            {user && (
              <>
                <strong>{user.name}</strong> <small>@{user.username}</small>
                <br />
                People Keep Asking If I’m Back, And I Haven’t Really Had An
                Answer, But Now, Yeah, I’m Thinking I’m Back.
              </>
            )}
          </p>
          {user && currentUid !== user.uid && (
            <Follow uid={user.uid} currentUid={currentUid} />
          )}
          {user && <FollowNumber uid={user.uid} />}
          {user && currentUid === user.uid && <PostTweet />}
          {user && <Tweets uid={user.uid} profile={true} />}
        </Box>
      </Column>
    </Columns>
  );
};

export default Profile;

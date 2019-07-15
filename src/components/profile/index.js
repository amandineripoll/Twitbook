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

  const handleImageChange = event => {
    event.preventDefault();
    // console.log(event.target.files[0].name);
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
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

  return (
    <Columns isCentered>
      <Column isSize="1/2">
        <Box>
          <Image
            isSize="128x128"
            src="https://randomuser.me/api/portraits/women/79.jpg"
            isCentered
          />
          <Field>
            <Label>{Profile.username}</Label>
            <Control>
              <Input
                type="file"
                id="imageInput"
                onChange={handleImageChange}
                hidden="hidden"
              />
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

import React, { useState, useEffect, useContext } from 'react';
import {
  Media,
  MediaLeft,
  Image,
  MediaContent,
  Content,
  Columns,
} from 'bloomer';

import { FirebaseContext } from '../components/Firebase';
import Follow from '../components/profile/Follow';
import FollowNumber from '../components/profile/FollowNumber';
import Tweets from '../components/tweets';
import PostTweet from '../components/tweets/Post';
import Loader from '../components/Loader';

const Profile = ({ match }) => {
  const { firebase } = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [currentUid, setCurrentUid] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { uid } = JSON.parse(window.localStorage.getItem('user'));
    setCurrentUid(uid);

    firebase.getUserByUsername(match.params.username).on('value', snapshot => {
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
  }, [match.params.username]);

  if (loading) {
    return (
      <Columns hasTextAlign="centered">
        <Loader />
      </Columns>
    );
  }

  return (
    <Media>
      <MediaLeft>
        <Image
          isSize="128x128"
          src="https://randomuser.me/api/portraits/women/79.jpg"
          style={{ borderRadius: '50%' }}
        />
      </MediaLeft>
      <MediaContent>
        <Content>
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
        </Content>
      </MediaContent>
    </Media>
  );
};

export default Profile;

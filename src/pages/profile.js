import React from 'react';
import Tweets from '../components/tweets';
import NewTweets from '../components/tweets/New';
import { Media, MediaLeft, Image, MediaContent, Content } from 'bloomer';

const Profile = () => {
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
            <strong>Chloe</strong> <small>@Chloe</small>
            <br />
            People Keep Asking If I’m Back, And I Haven’t Really Had An Answer,
            But Now, Yeah, I’m Thinking I’m Back.
          </p>
          <NewTweets />
          <Tweets profile={true} />
        </Content>
      </MediaContent>
    </Media>
  );
};

export default Profile;

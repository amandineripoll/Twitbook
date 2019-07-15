import React from 'react';

import withAuth from '../components/hocs/withAuth';
import Profile from '../components/profile';

const ProfilePage = ({ match }) => <Profile username={match.params.username} />;

export default withAuth(ProfilePage);

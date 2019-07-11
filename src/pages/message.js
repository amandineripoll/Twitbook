import React from 'react';
import Messages from '../components/messages';
import NewMessage from '../components/messages/New';
import withAuth from '../components/hocs/withAuth';

const Message = () => {
  return (
    <>
      <Messages />
      <NewMessage />
    </>
  );
};

export default withAuth(Message);

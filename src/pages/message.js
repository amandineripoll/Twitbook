import React from 'react';
import Messages from '../components/messages';
import NewMessage from '../components/messages/New';

const directMessage = () => {
  return (
    <>
      <Messages />
      <NewMessage />
    </>
  );
};

export default directMessage;

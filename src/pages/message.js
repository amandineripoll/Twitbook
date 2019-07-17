import React from 'react';
import Messages from '../components/messages';
import NewMessage from '../components/messages/New';
import { Columns, Column } from 'bloomer';
import ListUserMessage from '../components/messages/ListUserMessage';
import SearchBar from '../components/messages/SearchBar';

const Message = ({ match }) => {
  return (
    <Columns isCentered>
      <Column isSize="1/6">
        <br />
        <SearchBar />
        <br />
        <ListUserMessage />
      </Column>
      <Column isSize="1/6">
        <br />
        <Messages usernameReceiver={match.params.username} />
        <NewMessage usernameMessage={match.params.username} />
      </Column>
    </Columns>
  );
};

export default Message;

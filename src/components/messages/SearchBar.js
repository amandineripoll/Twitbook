import React, { useState } from 'react';
import { Input, Button, FieldBody } from 'bloomer';
import { withRouter } from 'react-router-dom';

const SearchBar = ({ history }) => {
  const [username, setUsername] = useState('');

  const onClick = () => {
    username && history.push(`/messages/${username}`);
  };

  return (
    <form>
      <FieldBody>
        <Input onChange={e => setUsername(e.target.value)} />
        <Button onClick={onClick}>Rechercher</Button>
      </FieldBody>
    </form>
  );
};

export default withRouter(SearchBar);

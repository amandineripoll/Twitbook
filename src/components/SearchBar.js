import React, { useState } from 'react';
import { Input, Button, FieldBody } from 'bloomer';
import { withRouter } from 'react-router-dom';

const SearchBar = ({ history }) => {
  const [terms, setTerms] = useState('');
  const onClick = () => {
    terms && history.push(`/search/${terms}`);
  };
  return (
    <form>
      <FieldBody>
        <Input onChange={e => setTerms(e.target.value)} />
        <Button onClick={onClick}>Rechercher</Button>
      </FieldBody>
    </form>
  );
};

export default withRouter(SearchBar);

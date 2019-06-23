import React, { createContext } from 'react';

export const Context = createContext({});

const publicActions = (provider, actions) =>
  actions.reduce(
    (methods, methodName) => ({
      ...methods,
      [methodName]: provider[methodName],
    }),
    {}
  );

const actions = ['setUser'];

class Provider extends React.Component {
  state = {
    user: {},
  };

  setUser = user => this.setState({ user });

  render() {
    const { children } = this.props;
    return (
      <Context.Provider
        value={{ ...this.state, ...publicActions(this, actions) }}
      >
        {children}
      </Context.Provider>
    );
  }
}

export default Provider;

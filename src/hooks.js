import React, { useContext, useReducer, createContext } from "react";
import get from "lodash.get";

const StateContext = createContext();

export const Provider = ({ initialState = {}, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useGlobalState = () => useContext(StateContext);

export const connect = (mapStateToProps, actions) => (Component) => (props) => {
  return (
    <StateContext.Consumer>
      {([state, dispatch]) => (
        <Component
          {...props}
          {...getDispatchedActions(actions, dispatch, state)}
          {...mapStateToProps(state, props)}
        />
      )}
    </StateContext.Consumer>
  );
};

// Provate

const getDispatchedActions = (actions, dispatch, state) => {
  const getState = (path) => get(state, path);
  const dispatched = {};
  Object.keys(actions).forEach((key) => {
    Object.assign(dispatched, { [key]: actions[key](dispatch, getState) });
  });

  return dispatched;
};

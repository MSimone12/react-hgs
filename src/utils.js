import React, { useReducer } from "react";

export const getDispatchedActions = (dispatch, props, actions) => {
  if (typeof actions === "function") return actions(dispatch, props);
  return bindActionCreators(actions, dispatch);
};

export const useMiddleware = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, middleware(state, dispatch)];
};

const middleware = (state, dispatch) => (action) => {
  if (typeof action === "function") {
    return action(dispatch, () => state);
  }
  return dispatch(action);
};

export const bindActionCreators = (actionCreators, dispatch) => {
  const boundActionCreators = {};

  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];

    if (typeof actionCreator === "function") {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
};

const bindActionCreator = (action, dispatch) => () =>
  dispatch(action.apply(this, arguments));
import React, { useContext, useReducer, createContext, useMemo } from "react";

const StateContext = createContext();

export const Provider = ({ initialState = {}, reducer, children }) => (
  <StateContext.Provider value={useMiddleware(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useGlobalState = () => useContext(StateContext);

export const useStore = () => {
  const [state] = useGlobalState()
  return state
}

export const useActions = (actions, deps) => {
  const [_, dispatch] = useGlobalState()
  return useMemo(() => {
    if(Array.isArray(actions)) return actions.map(a => bindActionCreators(a, dispatch))
    return bindActionCreators(actions, dispatch)
  }, deps ? [dispatch, ...deps] : deps)
}

export const useSelector = (functionToApply) => {
  if(typeof functionToApply !== 'function' || functionToApply === null) throw Error("The useSelector argument must be a function");
  const [state] = useGlobalState()

  return functionToApply(state)
}

export const connect = (mapStateToProps, actions) => (Component) => (props) => (
  <StateContext.Consumer>
    {([state, dispatch]) => (
      <Component
        {...props}
        {...getDispatchedActions(dispatch, props, actions)}
        {...mapStateToProps(state, props)}
      />
    )}
  </StateContext.Consumer>
);

// Private

const getDispatchedActions = (dispatch, props, actions) => {
  if (typeof actions === "function") return actions(dispatch, props);
  return bindActionCreators(actions, dispatch);
};

const useMiddleware = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, middleware(state, dispatch)];
};

const middleware = (state, dispatch) => (action) => {
  if (typeof action === "function") {
    return action(dispatch, () => state);
  }
  return dispatch(action);
};

const bindActionCreators = (actionCreators, dispatch) => {
  const boundActionCreators = {};

  for (const key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === "function") {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
};

const bindActionCreator = (action, dispatch) => () =>
  dispatch(action.apply(this, arguments));

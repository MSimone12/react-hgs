import { useReducer, useMemo, useCallback, useRef } from "react";

export const getDispatchedActions = (dispatch, props, actions) => {
  if (typeof actions === "function") return actions(dispatch, props);
  return bindActionCreators(actions, dispatch);
};

export const useMiddleware = (reducer, initialState, enableLog) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const prevState = useRef();

  const loggerMiddleware = useCallback((action) => {
    if(typeof action === 'function') return action(dispatch, () => state)
    prevState.current.actions = prevState.current?.actions || []
    prevState.current.actions.push({ action })
    return dispatch(action)
  }, []);

  useMemo(() => {
    if (!enableLog || !prevState.current) return;
    prevState.current.actions.forEach(dispatchedAction => {
      const {state: previousState} = prevState.current
      const {action} = dispatchedAction
      console.group(action.type);
      console.log("%cPrev. State", "color: red;", previousState);
      console.log("%cAction: ", "color: blue;", action);
      console.log("%cNew State: ", "color: green;", state);
      console.groupEnd();
    })

    prevState.current.actions = []
  }, [state, enableLog]);

  prevState.current = {...prevState.current, state}

  return [state, loggerMiddleware];
};

export const combineReducers = (reducers) => (state, action) => {
  if (typeof reducers !== "object") throw Error("reducers must be an object");
  return mergeReducers(reducers, state, action);
};

const mergeReducers = (reducers, state, action) => {
  const combinedReducers = {};
  for (const key in reducers) {
    const reducer = reducers[key];
    combinedReducers[key] = reducer(state[key], action);
  }
  return combinedReducers;
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

const bindActionCreator = (action, dispatch) => (...args) =>
  dispatch(action.apply(this, args));

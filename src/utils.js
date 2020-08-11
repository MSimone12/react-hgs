import { useReducer, createRef, useMemo } from "react";
import chalk from "chalk";

const getPersistKey = (reducer) => `_persist_${reducer}`;

export const getDispatchedActions = (dispatch, props, actions) => {
  if (typeof actions === "function") return actions(dispatch, props);
  return bindActionCreators(actions, dispatch);
};

export const useMiddleware = (
  reducer,
  initialState,
  persistentReducers,
  enableLog
) => {
  if (!Array.isArray(persistentReducers))
  throw Error("persistentReducers must be an Array");
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const prevState = createRef();
  
  useMemo(() => {
    if (!enableLog || !prevState.current) return;
    console.group();
    console.log(chalk.red("Prev. State"), prevState.current);
    console.log("%cAction: ", action, "color: blue;");
    console.log("%cNew State: ", state, "color: green;");
    console.groupEnd();
  }, [state, enableLog]);

  prevState.current = { ...prevState.current, ...state };

  const persistedState = {};
  persistentReducers.forEach((reducer) => {
    const reducerState = JSON.parse(
      localStorage.getItem(getPersistKey(reducer))
    )[reducer];
    persistedState[reducer] = reducerState;
  });
  const newState = { ...persistedState, ...state };
  return [
    newState,
    middleware(newState, dispatch, persistentReducers, enableLog),
  ];
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

const middleware = (state, dispatch, reducersToPersist) => (action) => {
  reducersToPersist.forEach((reducer) => {
    localStorage.setItem(
      getPersistKey(reducer),
      JSON.stringify({ [reducer]: state[reducer] })
    );
  });
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

import React, { useContext, useMemo } from "react";
import { bindActionCreators, useMiddleware, combineReducers } from "./utils";
import StateContext from "./context";

export const Provider = ({ initialState = {}, reducer, children, enableLog }) => (
  <StateContext.Provider value={useMiddleware(reducer, initialState, enableLog)}>
    {children}
  </StateContext.Provider>
);

export const useGlobalState = () => useContext(StateContext);

export const useStore = () => {
  const [state] = useGlobalState();
  return state;
};

export const useDispatch = () => {
  const [_, dispatch] = useGlobalState()
  return dispatch
}

export const useActions = (actions, deps) => {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      if (Array.isArray(actions))
        return actions.map((a) => bindActionCreators(a, dispatch));
      return bindActionCreators(actions, dispatch);
    },
    deps ? [dispatch, ...deps] : deps
  );
};

export const useSelector = (functionToApply) => {
  if (typeof functionToApply !== "function" || functionToApply === null)
    throw Error("The useSelector argument must be a function");
  const [state] = useGlobalState();

  return functionToApply(state);
};

export {combineReducers}

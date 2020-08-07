import React from "react";

import StateContext from "./context";
import { getDispatchedActions } from "./utils";

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

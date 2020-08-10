import React from "react";

export const reducer = (initialState = {}) => (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: (state?.count ?? 0) + 1 };
    case "decrement":
      return { count: (state?.count ?? 0) - 1 };
    case "reset":
      return initialState;
    default:
      return initialState;
  }
};

export const Button = ({ action, label }) => {
  return (
    <button data-testid={label} onClick={action}>
      test
    </button>
  );
};

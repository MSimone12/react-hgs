import React from "react";
import { Provider, useGlobalState, combineReducers } from "../src";
import { reducer, Button } from "./common";
import { render, fireEvent } from "@testing-library/react";

const second = (state, action) => {
  switch (action.type) {
    case "incrementSecond":
      return { count: (state?.count ?? 0) + 1 };
    case "decrementSecond":
      return { count: (state?.count ?? 0) - 1 };
    case "resetSecond":
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useGlobalState();
  return (
    <>
      <span data-testid="count1">{state.first?.count || 0}</span>
      <span data-testid="count2">{state.second?.count || 0}</span>
      <Button
        label="increment"
        action={() => dispatch({ type: "increment" })}
      />
      <Button
        label="incrementSecond"
        action={() => dispatch({ type: "incrementSecond" })}
      />
    </>
  );
};

const App = () => (
  <Provider reducer={combineReducers({
    first: reducer(),
    second,
  })}>
    <Counter />
  </Provider>
);

describe("Utils test", () => {
  it("should properly combine reducers", () => {
    const { getByTestId } = render(<App />);
    const count1 = getByTestId('count1')
    const firstIncrement = getByTestId('increment')
    expect(count1.innerHTML).toContain(0)
    fireEvent.click(firstIncrement)
    expect(count1.innerHTML).toContain(1)

    const count2 = getByTestId('count2')
    const secondIncrement = getByTestId('incrementSecond')

    expect(count2.innerHTML).toContain(0)
    fireEvent.click(secondIncrement)
    expect(count2.innerHTML).toContain(1)
  });
});

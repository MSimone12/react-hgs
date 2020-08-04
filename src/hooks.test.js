import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { Provider, useGlobalState } from "./hooks";

const initialState = { count: 1 };

const reducer = (state, action) => {
  const { count } = state;
  switch (action.type) {
    case "increment":
      return { count: count + 1 };
    case "decrement":
      return { count: count - 1 };
    case "reset":
      return initialState;
    default:
      return initialState;
  }
};

const Button = ({ action, label }) => {
  return (
    <button data-testid={label} onClick={action}>
      test
    </button>
  );
};

const Counter = () => {
  const [state, dispatch] = useGlobalState();
  return (
    <>
      <span data-testid="count">{state.count}</span>
      <Button
        label="increment"
        action={() => dispatch({ type: "increment" })}
      />
      <Button
        label="decrement"
        action={() => dispatch({ type: "decrement" })}
      />
      <Button label="reset" action={() => dispatch({ type: "reset" })} />
    </>
  );
};

const App = () => {
  return (
    <Provider reducer={reducer} initialState={initialState}>
      <Counter />
    </Provider>
  );
};

describe("Global State test", () => {
  it("should increment count state", () => {
    const { getByTestId } = render(<App />);
    let count = getByTestId("count");
    const incrementButton = getByTestId("increment");
    expect(count.innerHTML).toContain(1);
    fireEvent.click(incrementButton);
    expect(count.innerHTML).toContain(2)
  });
  it('should decrement count state', () => {
    const { getByTestId } = render(<App />);
    let count = getByTestId("count");
    const decrementButton = getByTestId("decrement");
    expect(count.innerHTML).toContain(1);
    fireEvent.click(decrementButton)
    expect(count.innerHTML).toContain(0)
  });
  it('should reset count state', () => {
    const { getByTestId } = render(<App />);
    let count = getByTestId("count");
    expect(count.innerHTML).toContain(1);
    const decrementButton = getByTestId("decrement");
    fireEvent.click(decrementButton)
    expect(count.innerHTML).toContain(0)
    const resetButton = getByTestId("reset");
    fireEvent.click(resetButton)
    expect(count.innerHTML).toContain(1)
  });
});

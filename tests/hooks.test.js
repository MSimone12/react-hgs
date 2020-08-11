import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider, useGlobalState } from "../src";
import { reducer, Button } from "./common";

const initialState = { count: 1 };

const HookCounter = () => {
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

const HookApp = () => {
  return (
    <Provider reducer={reducer(initialState)} initialState={initialState} enableLog>
      <HookCounter />
    </Provider>
  );
};


describe("Hook State test", () => {
  it("should increment count state", () => {
    const { getByTestId } = render(<HookApp />);
    let count = getByTestId("count");
    const incrementButton = getByTestId("increment");
    expect(count.innerHTML).toContain(1);
    fireEvent.click(incrementButton);
    expect(count.innerHTML).toContain(2);
  });
  it("should decrement count state", () => {
    const { getByTestId } = render(<HookApp />);
    let count = getByTestId("count");
    const decrementButton = getByTestId("decrement");
    expect(count.innerHTML).toContain(1);
    fireEvent.click(decrementButton);
    expect(count.innerHTML).toContain(0);
  });
  it("should reset count state", () => {
    const { getByTestId } = render(<HookApp />);
    let count = getByTestId("count");
    expect(count.innerHTML).toContain(1);
    const decrementButton = getByTestId("decrement");
    fireEvent.click(decrementButton);
    expect(count.innerHTML).toContain(0);
    const resetButton = getByTestId("reset");
    fireEvent.click(resetButton);
    expect(count.innerHTML).toContain(1);
  });
});
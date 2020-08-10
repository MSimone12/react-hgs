import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider, connect } from "../src";
import { reducer, Button } from "./common";

const initialState = { count: 1 };

const actions = {
  increment: () => (dispatch) => dispatch({ type: "increment" }),
  decrement: () => (dispatch) => dispatch({ type: "decrement" }),
  reset: () => (dispatch) => dispatch({ type: "reset" }),
};

const Counter = ({ count, increment, decrement, reset }) => {
  return (
    <>
      <span data-testid="count">{count}</span>
      <Button label="increment" action={() => increment()} />
      <Button label="decrement" action={() => decrement()} />
      <Button label="reset" action={() => reset()} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

const ConnectedCounter = connect(mapStateToProps, actions)(Counter);

const ConnectedApp = () => (
  <Provider reducer={reducer(initialState)} initialState={initialState}>
    <ConnectedCounter />
  </Provider>
);

describe("Connected State Test", () => {
  it("should increment count state", () => {
    const { getByTestId } = render(<ConnectedApp />);
    let count = getByTestId("count");
    const incrementButton = getByTestId("increment");
    expect(count.innerHTML).toContain(1);
    fireEvent.click(incrementButton);
    expect(count.innerHTML).toContain(2);
  });
  it("should decrement count state", () => {
    const { getByTestId } = render(<ConnectedApp />);
    let count = getByTestId("count");
    const decrementButton = getByTestId("decrement");
    expect(count.innerHTML).toContain(1);
    fireEvent.click(decrementButton);
    expect(count.innerHTML).toContain(0);
  });
  it("should reset count state", () => {
    const { getByTestId } = render(<ConnectedApp />);
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

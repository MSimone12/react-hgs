import React from 'react'
import { Provider, useSelector, useGlobalState, combineReducers } from "react-hgs";

const initialState = {count: 0}

const first = (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1
      }
    case 'decrement':
      return {
        count: state.count - 1
      }
  }
  return state
}

const second = (state = initialState, action) => {
  switch (action.type) {
    case 'incrementSecond':
      return {
        count: state.count + 1
      }
    case 'decrementSecond':
      return {
        count: state.count - 1
      }
  }
  return state
}

const Counter = () => {
  const count = useSelector(state => state.first?.count)
  const secondCount = useSelector(state => state.second?.count)
  const [_, dispatch] = useGlobalState()

  return (
    <>
      <h2>{count || 0}</h2>
      <h2>{secondCount || 0}</h2>
      <button onClick={() => dispatch({type: 'increment'})}>
        Increment
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>
        Decrement
      </button>
      <button onClick={() => dispatch({type: 'incrementSecond'})}>
        Increment Second
      </button>
      <button onClick={() => dispatch({type: 'decrementSecond'})}>
        Decrement Second
      </button>
    </>
  )
}

const App = () => {
  return (
    <Provider reducer={combineReducers({first, second})} enableLog>
      <Counter />
    </Provider>
  )
}

export default App
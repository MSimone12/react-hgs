# React HGS
Global state redux-like implementation with React Hooks only

HGS stands for Hooks Global State, so you can use a global state made with React Hooks and nothing else, it comes with a HOC like Redux connect function, where you can pass the mapStateToProps and your actions/action creators.

## Installing
Using npm:
```
npm install react-hgs
```

Using yarn:
```
yarn add react-hgs
```

## Use:

### Provider:

After installing you can just import the custom Provider for Global State

```
import { Provider } from 'react-hgs'
```

Then wrap your application with provider, passing an redux-like reducer as prop:

```
const App = () => {
  return (
    <Provider initialState={{}} reducer={reducer}>
      ...
    </Provider>
  )
}
```
### Hooks:

#### useGlobalState:

Once it's done, you can use *useGlobalState* within you application, receiving state and dispatch like:
```
const [state, dispatch] = useGlobalState()
```
#### useSelector:

Also you can use *useSelector* to retrieve only the state ou want from the store

```
const user = useSelector(state => state.user)
```

#### useStore:

*useStore* returns what it says, the entire store

```
const { user } = useStore()
```

#### useActions:

This one is special for who wants to reuse the actionCreators that already exists, use t instead of connect if you want to

```
import actionCreators from '../actions/user'

const actions = useActions(actionCreators)

// Instead of

const ConnectedComponent = connect(() => ({}), actionCreators)(...)
```


### HOC:

You can also use an Redux Structure as well, passing mapStateToProps and either mapDispatchToProps or plain actions that need dispatch injection:

```
import { connect } from 'react-hgs'

const mapStateToProps = (state, onwProps?) => ({
 user: state.user,
 auth: state.auth
})

const InjectedComponent = connect(mapStateToProps, actions)(({user, auth, ...actions}) => {
  ...
})
```

## Contibuting:

Feel free to open a PR for this project!!

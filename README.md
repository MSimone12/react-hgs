# React HGS
Global state redux-like implementation with React Hooks only

HGS stands for Hooks Global State, so you can use a global state made with React Hooks and nothing else, it comes with a HOC like Reduc connect function, where you can pass the mapStateToProps and your actions/action creators.

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
### Custom Hook:
Once it's done, you can use *useGlobalState* within you application, receiving state and dispatch like:
```
const [state, dispatch] = useGlobalState()
```
### HOC (*experimental*):

You can also use an Redux Structure as well, passing mapStateToProps and your actions that need dispatch injection:

```
import {connect} from 'react-hgs'

const mapStateToProps = (state, onwProps?) => ({
 user: state.user,
 auth: state.auth
})

const InjectedComponent = connect(mapStateToProps, actions)(({user, auth, ...actions}) => {
  ...
})
```

#### *Atention*
this feature is currently unstable, so I recommend you to use only the *useGlobalState* hook for now, I'll work for a stable release of this feature

## Contibuting:

Feel free to open a PR for this project!!

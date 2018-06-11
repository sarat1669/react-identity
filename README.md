# react-identity
Higher order components for composing authorization into react apps

---
![Build Status](https://travis-ci.org/sarat1669/react-identity.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/sarat1669/react-identity/badge.svg?branch=master)](https://coveralls.io/github/sarat1669/react-identity?branch=master)

### Features
- Integrates with your existing components seamlessly
- Works with redux and other stores

### Installation

Using npm:
```
npm install react-identity
```

Importing:
```
// Using ES6 transpiler
import ReactIdentity from 'react-identity'

// Or else
const ReactIdentity = require('react-identity')
```
### Usage

`react-identity` provides `withAuthorization` HOC for composing authorization

##### Example component:
```js
class ExampleComponent extends Component {
  render() {
    return (<div>{this.props.user.name}</div>)
  }
}
```
Lets see how we can add authorization to this component

#### withAuthorization HOC

`withAuthorization` takes a config which in this case is [ 'admin', 'moderator' ] which is later used by the `authorize` function to check if the component can be rendered.

```js
import React, { Component } from 'react'
import { withAuthorization } from 'react-identity'

class SampleComponent extends Component {
  render() {
    return (<div>Sample Component</div>)
  }
}

export default withAuthorization(['admin', 'moderator'])(SampleComponent)
```

In order for this to work, we need to configure `AuthProvider` with the `authorize` function

#### AuthProvider

`AuthProvider` maintains the `authData` state and `authorize` function in its state and is passed as childContext, and the same is utilized by the `withAuthorization` HOC.

`authorize` function receives the requirements passed by the `withAuthorization` and `userData` from the state. The implementation of authorize function is left for the user.

```js
import React, { Component } from 'react'
import { render } from 'react-dom'
import { AuthProvider } from 'react-identity'

import App from './components/App'

let authorize = (requirements, authData) => {
  let userRole = authData.user.role
  return requirements.some((role) => (role == userRole))
}

render(
    <AuthProvider authorize={authorize}>
        <App />
    </AuthProvider>
, document.getElementById('app'))
```

We have now setup the `AuthProvider` and `withAuthorization` but the `userData` is not yet present in the `AuthProvider`. `authData` can be directly sent as a prop to the `AuthProvider`, but for most cases this won't suffice, as `authData` needs to be dynamic and can be updated at any point of time. So, `updater` function can be used to update the `authData` at any point of time. This can be provided as a prop to the `AuthProvider` or can be accessed within the components using `withUpdater` HOC.

##### Implementing the updater function:

```js
import React, { Component } from 'react'
import { render } from 'react-dom'
import { AuthProvider } from 'react-identity'

import App from './components/App'

let authorize = (requirements, authData) => {
  let userRole = authData.user.role
  return requirements.some((role) => (role == userRole))
}

let updater = (setAuthData) => {
  let authData = { name: 'Sample User', role: 'admin' }
  setAuthData(authData)
}

render(
    <AuthProvider authorize={authorize} updater={updater}>
        <App />
    </AuthProvider>
, document.getElementById('app'))
```

#### withUpdater HOC

```js
import React, { Component } from 'react'
import { withUpdater } from 'react-identity'

class SampleComponent extends Component {
    handleOnClick = () => {
        let authData = { user: { name: 'Sid', role: 'moderator' } }
        this.props.updater(authData)
    }

    render() {
        return (
            <div>
                Sample Component
                <input type="button" value="Change user to Sid" onClick={this.handleOnClick} />
            </div>
        )
    }
}

export default withUpdater()(SampleComponent)
```

#### Configuring updater for redux

If the `authData` is stored in the redux, updates to the store can be subscribed by passing the `updater` function to the `AuthProvider` as follows

```js
import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { AuthProvider } from 'react-identity'
import { Provider as ReduxProvider } from 'react-redux'

import reducers from './reducers'
import App from './components/App'

const store = createStore(reducers)

let updater = (setAuthData) => {
  // set the authData initially
  setAuthData(store.getState().authData)
  // subscribe to updates on the store to update the authData
  store.subscribe(() => setAuthData(store.getState().authData))
}

render(
    <ReduxProvider>
        <AuthProvider updater={updater}>
            <App />
        </AuthProvider>
    </ReduxProvider>
, document.getElementById('app'))

```

#### Rendering custom Component for unauthorized users

If you want to render a custom component for unauthorized users, you can pass a react element to the `withAuthorization`'s config as follows

```js
import React, { Component } from 'react'
import { withAuthorization } from 'react-identity'

class SampleComponent extends Component {
  render() {
    return (<div>SampleComponent</div>)
  }
}

export default withAuthorization([ 'admin', 'moderator' ], { unauthorized: (<div>403</div>) })(SampleComponent)
```

#### Accessing authData from components
The `authData` which is passed to the `AuthProvider` can be accessed via react context. We also provide a decorator `withAuthData`

```js
import React, { Component } from 'react'
import { withAuthData } from 'react-identity'

class SampleComponent extends Component {
  render() {
    return (<div>{this.props.authData.user.name}</div>)
  }
}

export default withAuthData()(SampleComponent)
```

#### Rendering components only when unauthorized
When a component needs to be rendered only when unauthorized, `inverseAuth` config can be sent to the `withAuthorization`

```js
import React, { Component } from 'react'
import { withAuthorization } from 'react-identity'

class SampleComponent extends Component {
  render() {
    return (<div>SampleComponent</div>)
  }
}

export default withAuthorization([], { inverseAuth: true })
```

### License

`react-identity` is released under the MIT license.

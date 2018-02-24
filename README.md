# react-identity

Higher order components for authorization in react


### Features
- Plug and Play
- Redux support


### Installation

[![react-identity](https://nodei.co/npm/react-identity.png)](https://npmjs.org/package/react-identity)


### Usage

#### Configuring the provider

A static user can be passed directly to the provider as an user object. By default the role of the user is read from `user.role`

```js
import React, { Component } from 'react'
import { render } from 'react-dom'
import { AuthProvider } from 'react-identity'

import App from './components/App'

let user = {
  name: 'test',
  role: 'Admin'
}

render(
  <AuthProvider user={user}>
    <App />
  </AuthProvider>
, document.getElementById('app'))

```


#### Configuring provider for redux

If the user data is stored in the redux, updates to the store can be subscribed by passing the `updater` function

```js
import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { AuthProvider } from 'react-identity'
import { Provider as ReduxProvider } from 'react-redux'

import reducers from './reducers'
import App from './components/App'

const store = createStore(reducers)

let updater = (setUser) => {
  // set the user initially
  setUser(store.getState().user)
  // subscribe to updates on the store to update the user
  store.subscribe(() => setUser(store.getState().user))
}

render(
  <ReduxProvider>
    <AuthProvider user={user}>
      <App />
    </AuthProvider>
  </ReduxProvider>
, document.getElementById('app'))

```


#### Authorization

Here comes the actual part. In order to show the component only to users with specific roles, you can use the `withAuthorization` with the accepted roles

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


#### Render custom content for unauthorized users

If you want to render a custom component for unauthorized users, you can pass a react element to the `withAuthorization`

```js
import React, { Component } from 'react'
import { withAuthorization } from 'react-identity'

class SampleComponent extends Component {
  render() {
    return (
      ...
    )
  }
}

export default withAuthorization(['admin', 'moderator'], { unauthorized: (<div>403</div>) })(SampleComponent)
```


#### Making component visible only to logged out users

Well, what if we want to render a component to a logged out user (i.e, user == null)
In that case, you can define a role for logged out user as a prop to the `AuthProvider` and that role can be used with `withAuthorization` to render the component only to logged out user

```js
<AuthProvider updateUser={updateUser} loggedOutRole={'loggedOutUser'}>
 ...
</AuthProvider>
```

The `loggedOutUser` can be used along with other roles. And all other configs apply to this role as well

```js
import React, { Component } from 'react'
import { withAuthorization } from 'react-identity'

class SampleComponent extends Component {
  render() {
    return (
      ...
    )
  }
}

export default withAuthorization(['loggedOutUser'])(SampleComponent)
```


#### Custom role accessor
By default the user role is retrived from `user.role`, but this may not be the case. You can pass a `roleAccessor` function to the `AuthProvider` as a function which receives the user object and returns the role

```js
<AuthProvider roleAccessor={(user) => (user.current_role)}>
 ...
</AuthProvider>
```


#### Accessing user from components
The user object which is passed to the AuthProvider can be accessed via react context. We also provide a decorator `withUser`

```js
import React, { Component } from 'react'
import { withUser } from 'react-identity'

class SampleComponent extends Component {
  render() {
    return this.props.user.name
  }
}

export default withUser()(SampleComponent)
```


#### Updating the user
Incase you want to update the user details, you can use the `withUpdater` decorator which passes the updater function

```js
import React, { Component } from 'react'
import { withUser, withUpdater } from 'react-identity'

class SampleComponent extends Component {
  handleOnClick = () => {
    let user = { ...this.props.user, name: 'Sid' }
    this.props.updater(user)
  }

  render() {
    return (
      <div>
        {this.props.user.name}
        <input
          type="button"
          value="Change name to Sid"
          onClick={this.handleOnClick.bind(this, 'Sid')}
        />
      </div>
    )
  }
}

export default withUpdater()(withUser(SampleComponent))
```


### For more examples

[Visit our project page](https://sarat1669.github.io/react-identity/)


### License

`react-identity` is released under the MIT license.

# react-identity

Higher order components for authentication and authorization

### Examples

[Visit our project page](https://sarat1669.github.io/react-identity/)

### Installation

[![react-identity](https://nodei.co/npm/react-identity.png)](https://npmjs.org/package/react-identity)

### Usage

#### Configuring the provider

```js
import React, { Component } from 'react'
import { render } from 'react-dom'
import { AuthProvider } from 'react-identity'

import reducers from './reducers'
import App from './components/App'

let user = {
  name: 'test',
  role: 'Admin'
}

render(
  <AuthProvider user={user} loggedOutRole={'loggedOut'}>
    <App />
  </AuthProvider>
, document.getElementById('app'))

```

#### Authorized Component

##### Decorator Syntax
```js
import React, { Component } from 'react'
import { withAuthorization } from 'react-identity'

const unauthorized = (<div>403 unauthorized</div>)

@withAuthorization(['admin', 'moderator'], { unauthorized })
export default class UserManagementPage extends Component {
  render() {
    return (
      <div>
        // Content
      </div>
    )
  }
}
```

##### Normal Syntax
```js
import React, { Component } from 'react'
import { withAuthorization } from 'react-identity'

const unauthorized = (<div>403 unauthorized</div>)

class UserManagementPage extends Component {
  render() {
    return (
      <div>
        // Content
      </div>
    )
  }
}

export default withAuthorization(['admin', 'moderator'], { unauthorized })(UserManagementPage)
```

### License
`react-popped` is released under the MIT license.

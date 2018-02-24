import React, { Component } from 'react'
import PropTypes from 'prop-types'

function withAuthorization(authorizedRoles, configs={}) {
  return function applyAuthFor(WrappableComponent) {
    return class ComponentWithAuthorization extends Component {
      static contextTypes = {
        user: PropTypes.object,
        roleAccessor: PropTypes.func,
        loggedOutRole: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.symbol
        ])
      }

      render() {
        const { unauthorized } = configs
        const { user, loggedOutRole, roleAccessor } = this.context


        if(!user && loggedOutRole && authorizedRoles.includes(loggedOutRole)) {
          return <WrappableComponent {...this.props} />
        }

        if(user) {
          let userRole = roleAccessor ? roleAccessor(user) : user.role
          if(authorizedRoles.includes(userRole)) {
            return <WrappableComponent { ...this.props } />
          }
        }

        if(unauthorized) {
          return unauthorized
        }

        return null
      }
    }
  }
}

export default withAuthorization

import React, { Component } from 'react'
import PropTypes from 'prop-types'

function withAuthorization(authorizedRoles, configs={}) {
  return function applyAuthFor(WrappableComponent) {
    return class ComponentWithAuthorization extends Component {
      static contextTypes = {
        user: PropTypes.object,
        loggedOutRole: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.symbol
        ])
      }

      render() {
        const { unauthorized } = configs
        const { user, loggedOutRole } = this.context

        if(!user && loggedOutRole && authorizedRoles.includes(loggedOutRole)) {
          return <WrappableComponent {...this.props} />
        }

        if(user && authorizedRoles.includes(user.role)) {
          return <WrappableComponent { ...this.props } />
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

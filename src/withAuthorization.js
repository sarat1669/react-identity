import React, { Component } from 'react'
import PropTypes from 'prop-types'

function withAuthorization(requirements, configs={}) {
  return function applyAuthFor(WrappableComponent) {
    return class ComponentWithAuthorization extends Component {
      static contextTypes = {
        authData: PropTypes.object,
        authorize: PropTypes.func,
        loggedOutRole: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.symbol
        ])
      }

      render() {
        const { unauthorized } = configs
        const { authData, authorize } = this.context


        if(!authData && configs.inverseAuth) {
          return <WrappableComponent {...this.props} />
        }

        if(authData && authorize(requirements, authData)) {
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

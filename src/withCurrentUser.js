import React, { Component } from 'react'
import PropTypes from 'prop-types'

function withCurrentUser() {
  return function passUserTo(WrappableComponent) {
    return class ComponentWithCurrentUser extends Component {
      static contextTypes = {
        user: PropTypes.object
      }

      render() {
        const { user } = this.context
        return (<WrappableComponent user={user} { ...this.props } />)
      }
    }
  }
}

export default withCurrentUser

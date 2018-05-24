import React, { Component } from 'react'
import PropTypes from 'prop-types'

function withAuthData() {
  return function passAuthDataTo(WrappableComponent) {
    return class ComponentWithAuthData extends Component {
      static contextTypes = {
        authData: PropTypes.object
      }

      render() {
        const { authData } = this.context
        return (<WrappableComponent authData={authData} { ...this.props } />)
      }
    }
  }
}

export default withAuthData

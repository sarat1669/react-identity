import React, { Component } from 'react'
import PropTypes from 'prop-types'

function withUpdater() {
  return function passUpdaterTo(WrappableComponent) {
    return class ComponentWithUpdater extends Component {
      static contextTypes = {
        userUpdater: PropTypes.func.isRequired
      }

      render() {
        const { userUpdater } = this.context
        return (<WrappableComponent updater={userUpdater} { ...this.props } />)
      }
    }
  }
}

export default withUpdater

import React, { Component } from 'react'
import PropTypes from 'prop-types'

function withUpdater() {
  return function passUpdaterTo(WrappableComponent) {
    return class ComponentWithUpdater extends Component {
      static contextTypes = {
        updater: PropTypes.func.isRequired
      }

      render() {
        const { updater } = this.context
        return (<WrappableComponent updater={updater} { ...this.props } />)
      }
    }
  }
}

export default withUpdater

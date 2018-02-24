import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'

export default class AuthProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static childContextTypes = {
    user: PropTypes.object,
    roleAccessor: PropTypes.func,
    updater: PropTypes.func.isRequired,
    loggedOutRole: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.symbol
    ])
  }

  userUpdater = (user) => {
    this.setState({ user })
  }

  componentDidMount() {
    this.setState({ loggedOutRole: this.props.loggedOutRole })
    this.props.updater && this.props.updater(this.userUpdater)
  }

  getChildContext() {
   let { user, loggedOutRole } = this.state

   return {
     user, loggedOutRole, updater: this.userUpdater,
     roleAccessor: this.props.roleAccessor
   }
  }

  render() {
    return this.props.children
  }
}

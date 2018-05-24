import { Component } from 'react'
import PropTypes from 'prop-types'

export default class AuthProvider extends Component {
  constructor() {
    super()
    this.state = {}
  }

  static childContextTypes = {
    authorize: PropTypes.func,
    authData: PropTypes.object,
    updater: PropTypes.func.isRequired
  }

  authDataUpdater = (authData) => {
    this.setState({ authData })
  }

  componentDidMount() {
    this.setState({ authData: this.props.authData })
    this.props.updater && this.props.updater(this.authDataUpdater)
  }

  getChildContext() {
    let { authData } = this.state
    let { authorize } = this.props

    return {
      authData, updater: this.authDataUpdater, authorize
    }
  }

  render() {
    return this.props.children
  }
}

AuthProvider.propTypes = {
  updater: PropTypes.func,
  children: PropTypes.node,
  authData: PropTypes.object,
  authorize: PropTypes.func.isRequired,
}

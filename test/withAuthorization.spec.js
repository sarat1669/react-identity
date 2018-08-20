import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import withAuthData from  '../src/withAuthData'
import withUpdater from  '../src/withUpdater'
import AuthProvider from '../src/AuthProvider'
import withAuthorization from '../src/withAuthorization'

describe('withAuthorization', function() {
  let WrappableComponent, authData, authorize

  beforeEach(function() {
    authData = {
      name: 'John Doe',
      role: 'admin'
    }

    WrappableComponent = function(props) {
      return props.authData ? props.authData.name : 'No authData found'
    }

    authorize = (requirements, authData) => {
      return requirements.some((requirement) => authData.role == requirement)
    }
  })

  it('should render the WrappableComponent when authorized', function() {

    let WrappedComponent = withAuthorization(['admin'])(withUpdater()(
      withAuthData()(WrappableComponent))
    )

    let wrapper = mount(
      <AuthProvider authData={authData} authorize={authorize}>
        <WrappedComponent />
      </AuthProvider>
    )

    expect(wrapper.find(WrappableComponent).length).toEqual(1)
  })

  it('should not render the WrappedComponent when unauthorized', function() {
    let WrappedComponent = withAuthorization(['admin'])(withUpdater()(
      withAuthData()(WrappableComponent))
    )

    let wrapper = mount(
      <AuthProvider authData={authData} authorize={authorize}>
        <WrappedComponent />
      </AuthProvider>
    )

    let wrappableComponent = wrapper.find(WrappableComponent)
    let newUser = { ...authData, role: 'moderator' }
    wrappableComponent.props().updater(newUser)
    wrapper.update()
    wrappableComponent = wrapper.find(WrappableComponent)

    expect(wrappableComponent.length).toEqual(0)
  })

  it('should render the WrappedComponent when not authorized is not logged in and loggedOutRole is authorized', function() {
    let WrappedComponent = withAuthorization(['admin'], { inverseAuth: true })(withUpdater()(
      withAuthData()(WrappableComponent))
    )

    let wrapper = mount(
      <AuthProvider authData={null} authorize={authorize}>
        <WrappedComponent />
      </AuthProvider>
    )

    expect(wrapper.find(WrappableComponent).length).toEqual(1)
  })

  it('should render custom element when unauthorized and unauthorized component is configured', function() {
    let Unauthorized = function() {
      return 'unauthorized'
    }

    let WrappedComponent = withAuthorization(['unauthorized-role'], { unauthorized: <Unauthorized /> })(
      withUpdater()(withAuthData()(WrappableComponent))
    )

    let wrapper = mount(
      <AuthProvider authData={authData} authorize={authorize}>
        <WrappedComponent />
      </AuthProvider>
    )

    expect(wrapper.find(Unauthorized).length).toEqual(1)
    expect(wrapper.find(WrappableComponent).length).toEqual(0)
  })

  it('should render custom component when unauthorized and unauthorized component is configured', function() {
    let Unauthorized = function() {
      return 'unauthorized'
    }

    let WrappedComponent = withAuthorization(['unauthorized-role'], { UnauthorizedComponent: Unauthorized })(
      withUpdater()(withAuthData()(WrappableComponent))
    )

    let wrapper = mount(
      <AuthProvider authData={authData} authorize={authorize}>
        <WrappedComponent />
      </AuthProvider>
    )

    expect(wrapper.find(Unauthorized).length).toEqual(1)
    expect(wrapper.find(WrappableComponent).length).toEqual(0)
  })

  it('should work with custom role accessor', function() {
    let WrappedComponent = withAuthorization(['admin'])(withUpdater()(
      withAuthData()(WrappableComponent))
    )

    let wrapper = mount(
      <AuthProvider authData={authData} authorize={authorize}>
        <WrappedComponent />
      </AuthProvider>
    )

    expect(wrapper.find(WrappableComponent).length).toEqual(1)
  })
})

import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import withAuthData from  '../src/withAuthData'
import withUpdater from  '../src/withUpdater'
import AuthProvider from '../src/AuthProvider'

describe('withUpdater', function() {
  let WrappableComponent, WrappedComponent, wrapper, authData, authorize

  beforeEach(function() {
    authData = {
      name: 'John Doe',
      role: 'admin'
    }

    WrappableComponent = function(props) {
      return props.authData ? props.authData.name : 'No authData found'
    }

    WrappedComponent = withUpdater()(withAuthData()(WrappableComponent))

    authorize = (requirements, authData) => {
      return requirements.some((requirement) => authData.role == requirement)
    }

    wrapper = mount(
      <AuthProvider authData={authData} authorize={authorize}>
        <WrappedComponent />
      </AuthProvider>
    )
  })

  it('should pass the authData updater from context via props to the WrappableComponent', function() {
    let wrappableComponent = wrapper.find(WrappableComponent)
    expect(wrappableComponent.props()).toHaveProperty('updater')
  })

  it('should update the authData when a new authData object is passed via updater', function() {
    let wrappableComponent = wrapper.find(WrappableComponent)
    let newUser = { name: 'John Wick' }
    wrappableComponent.props().updater(newUser)
    wrapper.update()
    wrappableComponent = wrapper.find(WrappableComponent)
    expect(wrappableComponent.props().authData).toMatchObject(newUser)
  })
})

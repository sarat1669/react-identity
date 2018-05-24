import React from 'react'
import expect from 'expect'
import { spy } from 'sinon'
import { mount } from 'enzyme'

import withAuthData from '../src/withAuthData'
import AuthProvider from '../src/AuthProvider'

describe('withAuthData', function() {
  let WrappableComponent, WrappedComponent, authData, authorize

  beforeEach(function() {
    authData = { name: 'John Doe' }

    WrappableComponent = function(props) {
      return props.authData ? props.authData.name : 'No authData found'
    }

    WrappedComponent = withAuthData()(WrappableComponent)

    authorize = (requirements, authData) => {
      return requirements.some((requirement) => authData.role == requirement)
    }
  })

  it('should render the AuthProvider', function() {
    let wrapper = mount(
      <AuthProvider authData={authData} authorize={authorize}>
        <WrappedComponent />
      </AuthProvider>
    )
    expect(wrapper.is(AuthProvider)).toBeTruthy()
  })

  it('should render the WrappedComponent', function() {
    let wrapper = mount(
      <AuthProvider authData={authData} authorize={authorize}>
        <WrappedComponent />
      </AuthProvider>
    )
    expect(wrapper.find(WrappedComponent).length).toEqual(1)
  })

  it('should update the authData when authDataUpdater is called', function() {
    let wrapper = mount(
      <AuthProvider authData={authData} authorize={authorize}>
        <WrappedComponent />
      </AuthProvider>
    )
    let newUser = { name: 'John Wick' }
    wrapper.instance().authDataUpdater(newUser)
    wrapper.update()
    expect(wrapper.state('authData')).toMatchObject(newUser)
  })

  it('should call updater on mount at least once', function() {
    let sp = spy()
    mount(
      <AuthProvider authData={authData} updater={sp} authorize={authorize}>
        <WrappedComponent />
      </AuthProvider>
    )

    expect(sp.calledOnce).toBeTruthy()
  })
})

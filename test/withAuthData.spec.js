import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import withAuthData from '../src/withAuthData'
import AuthProvider from '../src/AuthProvider'

describe('withAuthData', function() {
  let WrappableComponent, WrappedComponent, wrapper, authData, authorize

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

    WrappedComponent = withAuthData()(WrappableComponent)

    wrapper = mount(
      <AuthProvider authData={authData} authorize={authorize}>
        <WrappedComponent />
      </AuthProvider>
    )
  })

  it('should render the WrappedComponent', function() {
    expect(wrapper.find(WrappedComponent).length).toEqual(1)
  })

  it('should pass the authData object from context via props to the WrappableComponent', function() {
    let wrappableComponent = wrapper.find(WrappableComponent)
    expect(wrappableComponent.props().authData).toMatchObject(authData)
  })
})

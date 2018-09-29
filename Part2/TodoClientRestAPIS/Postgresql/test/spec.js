import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Dashboard from '../js/component/dashboard/dashboard';

describe('Dashboard', function () {
  it('should have a button to display the gravatar', function () {
    const wrapper = shallow(<Dashboard/>);
    expect(wrapper.find('Button')).to.have.length(1);
  });

//   it('should have props for email and src', function () {
//     const wrapper = shallow(<Avatar/>);
//     expect(wrapper.props().email).to.be.defined;
//     expect(wrapper.props().src).to.be.defined;
//   });
});
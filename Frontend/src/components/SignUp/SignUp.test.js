import React from 'react';
import renderer from 'react-test-renderer';
import SignUp from './SignUp'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
configure({ adapter: new Adapter() });


describe('Signup page', () => {
    it('should render correctly', () => {
      const component = shallow(<SignUp />);
    
      expect(component).toMatchSnapshot();
    });
  });
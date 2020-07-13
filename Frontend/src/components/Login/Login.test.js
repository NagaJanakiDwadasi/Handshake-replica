// Link.react.test.js
import React from 'react';
import Login from './Login';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('should render correctly', () => {
  const component = mount( <Login page="http://18.224.141.27:3000">HandShake</Login>);
  expect(component).toMatchSnapshot();
});

it('changes the class when hovered', () => {
    const component = renderer.create(
      <Login page="http://18.224.141.27:3000/">HandShake</Login>
    );
    
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    
    // manually trigger the callback
    tree.props.onMouseEnter();
     // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    
  });

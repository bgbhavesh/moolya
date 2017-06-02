import React from 'react';
import {mlValidations} from "../../commons/validations/formValidation";
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
// Need to import to get MlLoginContent from the file.
import {spy, stub} from 'sinon';
import {} from './login.jsx';
//using a different expect (not from chai)
import expect from 'expect';
import expectJSX from 'expect-jsx';
//for shallow rendering
const ReactShallowRenderer = require('react-test-renderer/shallow');
expect.extend(expectJSX);

describe('Client Side Test: Login Module', () => {

  it('should render an input field and button', () => {
    formSubmits = () => { };
    component = renderIntoDocument(
      <MlLoginContent formSubmit={formSubmits}/>);
    const inputField = scryRenderedDOMComponentsWithClass(component, 'input');
    const button = scryRenderedDOMComponentsWithClass(component, 'button');

    expect(inputField).toExist();
    expect(button).toExist();
  });
  /*
    For performing the second test case, add ref="signIn" to the sign in button in login.jsx
  */
  it('should validate user on button click', function () {
    mlValidations.formValidations = spy();
    const user = component.refs.username;
    const password = component.refs.password;
    const button = component.refs.signIn;
    user.value = 'anakhar.22@gmail.com';
    password.value = '1234!@#';
    Simulate.change(user);
    Simulate.change(password);
    Simulate.click(button);
    console.log(component.refs.username.value);
    expect(mlValidations.formValidations.calledOnce).toEqual(true);
  });

  it('should display the moolya logo', function(){
    formSubmits = () => { };
    const renderer = new ReactShallowRenderer();
    renderer.render(<MlLoginContent formSubmit={formSubmits}/>);
    output = renderer.getRenderOutput();
    expect(output.type).toEqual('div');
    expect(output).toIncludeJSX(<img className="logo" src="/images/moolya_logo.png"/>);
    expect(output).toIncludeJSX(<div className="login_top_in"><span>Login</span></div>);


  });
   it('should display forgot password and register options',function () {
     expect(output).toIncludeJSX(<p><a href="#">Forgot Password</a> | <a href="#">Register</a></p>);
   })
   it('should display a checkbox for remember me', function () {
     expect(output).toIncludeJSX(<div className="checkbox_wrap"><input type="checkbox"/><span>Remember me</span></div>);
     // expect(output).toIncludeJSX(<input type="checkbox"/><span>Remember me</span>);
   })


});

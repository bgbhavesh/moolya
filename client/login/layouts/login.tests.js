import React from 'react';
import {mlValidations} from "../../commons/validations/formValidation";
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';

// Need to import to get the value of the MlLoginContent from the file.
import {spy, stub} from 'sinon';
import {} from './login.jsx';
import { expect } from 'chai';

describe('Client Side Test: Login Module', () => {

  it('should render an input field and button', () => {
    formSubmits = () => { };
    component = renderIntoDocument(
      <MlLoginContent formSubmit={formSubmits}/>);
    const inputField = scryRenderedDOMComponentsWithClass(component, 'input');
    const button = scryRenderedDOMComponentsWithClass(component, 'button');

    expect(inputField).to.be.ok;
    expect(button).to.be.ok;
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
    expect(mlValidations.formValidations.calledOnce).to.be.true;
  });

});

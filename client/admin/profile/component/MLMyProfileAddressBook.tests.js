import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { assert } from 'meteor/practicalmeteor:chai';
import StubCollections from 'meteor/hwillson:stub-collections';

//To run this file please comment the `componentDidMount` function's data in Step3 class for now.
//We need to make a virtual DOM for running this test case.
import Step3 from './MlMyProfileAddressBook';

import  ContactDetails from './MlMyProfileContactDetails';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import { expect } from 'chai';

describe('client side test for MlMyProfile', function () {
  before(function () {
    //Use this function to initialize the values (stubs or spies) to be used before the start of the test cases
  });
  it('should render a div with "todo-list" class', function () {
    const registerId = '1234';
    const component = renderIntoDocument(
      // Pass the respective props to be used by the Step3 class
      <Step3 registerId={registerId} />
    );

    //The findRenderedDOMComponentWithClass is used to render the component and find whether
    // the provided tag is present in the rendered document or not (expect only 1 tag to be present)
    const todoListEle = findRenderedDOMComponentWithClass(component, 'admin_main_wrap');
    expect(todoListEle).to.be.ok;
  });
  it('displays profile', function () {
    const registerId = '1234';
    const component = renderIntoDocument(
      <Step3 registerId={registerId} />
    );

    //The scryRenderedDOMComponentsWithClass is used to render the component and find the number of
    //provided tags in the rendered document
    const todoListEle = scryRenderedDOMComponentsWithClass(component, 'panel-heading');
    expect(todoListEle).to.be.ok;
  });
  after(function () {
    console.log('The after function gets called after every `it` is executed');
  });
})

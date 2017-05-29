import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';

// Need to import to get the value of the MlLoginContent from the file.
import {} from './login.jsx';
import { expect } from 'chai';

describe('TodoInput', () => {
  it('should render an input field and button', () => {
    const component = renderIntoDocument(
      <MlLoginContent />
    );
    const inputField = scryRenderedDOMComponentsWithClass(component, 'input');
    const button = scryRenderedDOMComponentsWithClass(component, 'button');

    expect(inputField).to.be.ok;
    expect(button).to.be.ok;
  });
});

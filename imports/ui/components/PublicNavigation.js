import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () => (
  <Nav pullRight>
    <LinkContainer to="help">
      <NavItem eventKey={ 1 } href="/help">Help</NavItem>
    </LinkContainer>
    <LinkContainer to="login">
      <NavItem eventKey={ 2 } href="/login">Log In</NavItem>
    </LinkContainer>
  </Nav>
);

export default PublicNavigation;

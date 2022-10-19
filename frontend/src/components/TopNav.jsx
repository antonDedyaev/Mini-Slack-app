import React from 'react';

import { Navbar, Container } from 'react-bootstrap';

const TopNav = () => (
  <Navbar className="shadow-sm" expand="lg" bg="white">
    <Container>
      <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
    </Container>
  </Navbar>
);

export default TopNav;

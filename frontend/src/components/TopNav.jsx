import React from 'react';

import { Button, Navbar, Container } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const TopNav = () => {
  const { user, logOut } = useAuth();
  const logoutButton = (
    <Button
      type="button"
      variant="primary"
      onClick={logOut}
    >
      Выйти
    </Button>
  );

  return (
    <Navbar className="shadow-sm" expand="lg" bg="white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        { user ? logoutButton : null}
      </Container>
    </Navbar>
  );
};

export default TopNav;

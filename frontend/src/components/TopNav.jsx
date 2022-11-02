import React from 'react';

import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

const TopNav = () => {
  const { user, logOut } = useAuth();
  const { t } = useTranslation();
  const logoutButton = (
    <Button
      type="button"
      variant="primary"
      onClick={logOut}
    >
      {t('topNavbar.logoutBtn')}
    </Button>
  );

  return (
    <Navbar className="shadow-sm" expand="lg" bg="white">
      <Container>
        <Navbar.Brand href="/">{t('topNavbar.chatLink')}</Navbar.Brand>
        { user ? logoutButton : null}
      </Container>
    </Navbar>
  );
};

export default TopNav;

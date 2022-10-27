import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import {
  Container,
  Form,
  Button,
  ButtonGroup,
  Nav,
} from 'react-bootstrap';

import { PlusSquare } from 'react-bootstrap-icons';

const RenderChannels = ({ channel }) => {
  const currChannelId = useSelector((state) => state.channels.currentChannelId);
  const channelBtnClass = cn({
    secondary: channel.id === currChannelId,
  });

  return (
    <Nav.Item className="nav-item w-100" as="li">
      <Button type="button" variant={channelBtnClass} className="w-100 rounded-0 text-start">
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </Nav.Item>
  );
};

const ChannelSection = () => {
  const channels = useSelector((state) => state.channels.channels);

  return (
    <Container className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <Container className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <ButtonGroup vertical>
          <Button type="button" variant="link" className="p-0 text-primary">
            <PlusSquare width="20" height="20" />
            <Form.Label visuallyHidden>+</Form.Label>
          </Button>
        </ButtonGroup>
      </Container>
      <Nav className="flex-column nav-pills nav-fill px-2" as="ul">
        {channels.map((channel) => <RenderChannels channel={channel} key={channel.id} />)}
      </Nav>
    </Container>
  );
};

export default ChannelSection;

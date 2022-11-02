import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import {
  Container,
  Form,
  Button,
  ButtonGroup,
  Dropdown,
  Nav,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

import { channelSelected } from '../slices/channelsSlice';

const ChannelSection = (props) => {
  const { showModal } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currChannelId = useSelector((state) => state.channels.currentChannelId);
  const channels = useSelector((state) => state.channels.channels);

  const renderChannels = (channel) => {
    const channelBtnClass = cn({
      secondary: channel.id === currChannelId,
    });

    const splitButton = (
      <Dropdown className="d-flex" as={ButtonGroup}>
        <Button
          type="button"
          variant={channelBtnClass}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => dispatch(channelSelected(channel.id))}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        <Dropdown.Toggle split variant={channelBtnClass}>
          <span className="visually-hidden">{t('hiddenTexts.controlChannel')}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#" onClick={() => showModal('removing', channel.id)}>{t('pages.chat.removeOption')}</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => showModal('renaming', channel.id)}>{t('pages.chat.renameOption')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    const singleButton = (
      <Button
        type="button"
        variant={channelBtnClass}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={() => dispatch(channelSelected(channel.id))}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    );

    return (
      <Nav.Item key={channel.id} className="w-100" as="li">
        { channel.removable ? splitButton : singleButton }
      </Nav.Item>
    );
  };

  return (
    <Container className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <Container className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('pages.chat.channels')}</span>
        <Button
          type="button"
          variant="link"
          className="p-0 text-primary btn-group-vertical"
          onClick={() => showModal('adding')}
        >
          <PlusSquare width="20" height="20" />
          <Form.Label visuallyHidden>+</Form.Label>
        </Button>
      </Container>
      <Nav className="flex-column nav-pills nav-fill px-2" as="ul">
        {channels.map((channel) => renderChannels(channel))}
      </Nav>
    </Container>
  );
};

export default ChannelSection;

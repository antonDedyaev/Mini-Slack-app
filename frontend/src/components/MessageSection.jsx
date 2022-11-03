import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Container,
  Form,
  Button,
  InputGroup,
  ButtonGroup,
} from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';

import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';
import MessageBox from './MessageBox';

const MessageSection = () => {
  const { t } = useTranslation();
  const { username } = useAuth().user;
  const { addMessage } = useSocket();
  const { channels, currentChannelId, status } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);
  const selectedChannel = channels.find((channel) => channel.id === currentChannelId);
  const currChannelMessages = messages.filter((message) => message.channelId === currentChannelId);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    body: yup.string().trim().required(),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: () => {
      addMessage(formik.values.body, currentChannelId, username);
      formik.resetForm();
    },

  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{`# ${selectedChannel?.name}`}</b></p>
          <span className="text-muted">{t('pages.chat.messagesCount.message', { count: currChannelMessages.length })}</span>
        </div>
        <MessageBox />
        <Container className="mt-auto px-5 py-3">
          <Form
            onSubmit={formik.handleSubmit}
            className="py-1 border rounded-2"
            noValidate
          >
            <InputGroup hasValidation>
              <Form.Control
                name="body"
                aria-label={t('hiddenTexts.newMessage')}
                placeholder={t('pages.chat.messageInput')}
                className="border-0 p-0 ps-2"
                value={formik.values.body}
                onChange={formik.handleChange}
                ref={inputRef}
              />
              <ButtonGroup vertical>
                <Button
                  type="submit"
                  variant="link"
                  disabled={formik.values.body === '' || status === 'loading'}
                >
                  <ArrowRightSquare />
                  <Form.Label visuallyHidden>{t('hiddenTexts.send')}</Form.Label>
                </Button>
              </ButtonGroup>
            </InputGroup>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default MessageSection;

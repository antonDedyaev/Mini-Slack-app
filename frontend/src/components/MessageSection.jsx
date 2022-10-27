import React from 'react';
import { useSelector } from 'react-redux';
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

import MessageBox from './MessageBox';
import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';

const validationSchema = yup.object().shape({
  body: yup.string().trim().required(),
});

const MessageSection = () => {
  const { username } = useAuth().user;
  const { addMessage } = useSocket();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);
  const selectedChannel = channels.find((channel) => channel.id === currentChannelId);
  console.log(messages);
  const currChannelMessages = messages.filter((message) => message.channelId === currentChannelId);
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
          <span className="text-muted">{`${currChannelMessages.length} сообщение`}</span>
        </div>
        <MessageBox />
        <Container className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
            <InputGroup hasValidation>
              <Form.Control
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2"
                value={formik.values.body}
                onChange={formik.handleChange}
              />
              <ButtonGroup vertical>
                <Button type="submit" variant="link" disabled={formik.values.body === ''}>
                  <ArrowRightSquare />
                  <Form.Label visuallyHidden>Отправить</Form.Label>
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

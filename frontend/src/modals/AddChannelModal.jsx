import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  Modal, Form, Button,
} from 'react-bootstrap';

import * as yup from 'yup';
import { useFormik } from 'formik';
import useSocket from '../hooks/useSocket';

const AddChannelModal = (props) => {
  const { onHide } = props;
  const { addChannel } = useSocket();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { channels, status } = useSelector((state) => state.channels);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .test(
        'length',
        'От 3 до 20 символов',
        (value) => (value.length >= 3 && value.length <= 20),
      )
      .trim()
      .required('Обязательное поле')
      .notOneOf(channels.map((channel) => channel.name), 'Должно быть уникальным'),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: () => {
      addChannel(formik.values.name);
      onHide();
    },
  });

  return (
    <Modal
      show
      aria-modal="true"
      className="fade"
      tabIndex="-1"
      centered
    >
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
        <Button
          type="button"
          aria-label="Close"
          data-bs-dismiss="modal"
          className="btn-close"
          onClick={onHide}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            name="name"
            id="name"
            className="mb-2"
            value={formik.values.name}
            onChange={formik.handleChange}
            isInvalid={formik.errors.name && formik.touched.name}
            ref={inputRef}
          />
          <Form.Label htmlFor="name" visuallyHidden>Имя канала</Form.Label>
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              className="me-2"
              variant="secondary"
              onClick={onHide}
              disabled={status === 'loading'}
            >
              Отменить
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={status === 'loading'}
            >
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;

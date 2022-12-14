import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Modal, Form, Button } from 'react-bootstrap';

import useSocket from '../hooks/useSocket';
import profanityFilter from '../utils/profanityFilter';
import { modalClosed } from '../slices/modalsSlice';

const AddChannelModal = () => {
  const { addChannel } = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { channels, status } = useSelector((state) => state.channels);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('formWarnings.nameLength'))
      .max(20, t('formWarnings.nameLength'))
      .notOneOf(channels.map((channel) => channel.name), t('formWarnings.mustBeUnique'))
      .required(t('formWarnings.requiredField')),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: () => {
      addChannel(profanityFilter(formik.values.name));
      dispatch(modalClosed());
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
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
        <Button
          type="button"
          aria-label="Close"
          data-bs-dismiss="modal"
          className="btn-close"
          onClick={() => dispatch(modalClosed())}
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
          <Form.Label htmlFor="name" visuallyHidden>{t('hiddenTexts.channelName')}</Form.Label>
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              className="me-2"
              variant="secondary"
              onClick={() => dispatch(modalClosed())}
              disabled={status === 'loading'}
            >
              {t('modals.cancelBtn')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={status === 'loading'}
            >
              {t('modals.sendBtn')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;

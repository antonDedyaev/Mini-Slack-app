import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Modal, Button } from 'react-bootstrap';

import useSocket from '../hooks/useSocket';
import { modalClosed } from '../slices/modalsSlice';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { removeChannel } = useSocket();
  const channelId = useSelector((state) => state.modals.channelId);

  const handleRemove = () => {
    removeChannel(channelId);
    dispatch(modalClosed());
  };

  return (
    <Modal
      show
      aria-modal="true"
      className="fade"
      tabIndex="-1"
      centered
    >
      <Modal.Header>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
        <Button
          type="button"
          aria-label="Close"
          data-bs-dismiss="modal"
          className="btn-close"
          onClick={() => dispatch(modalClosed())}
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmRemoval')}</p>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            className="me-2 btn btn-secondary"
            onClick={() => dispatch(modalClosed())}
          >
            {t('modals.cancelBtn')}
          </Button>
          <Button
            type="button"
            className="btn btn-danger"
            onClick={handleRemove}
          >
            {t('modals.removeBtn')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import useSocket from '../hooks/useSocket';

const RemoveChannelModal = (props) => {
  const { modalInfo, onHide } = props;
  const { removeChannel } = useSocket();

  const handleRemove = () => {
    removeChannel(modalInfo.channelId);
    onHide();
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
        <Modal.Title>Удалить канал</Modal.Title>
        <Button
          type="button"
          aria-label="Close"
          data-bs-dismiss="modal"
          className="btn-close"
          onClick={onHide}
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            className="me-2 btn btn-secondary"
            onClick={onHide}
          >
            Отменить
          </Button>
          <Button
            type="button"
            className="btn btn-danger"
            onClick={handleRemove}
          >
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;

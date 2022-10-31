import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchData } from '../slices/channelsSlice';
import ChannelSection from './ChannelSection';
import MessageSection from './MessageSection';
import getModal from '../modals/modalSelector';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }
  const Modal = getModal(modalInfo.type);
  return <Modal modalInfo={modalInfo} onHide={hideModal} />;
};

const MainPage = () => {
  const dispatch = useDispatch();
  const channelsStatus = useSelector((state) => state.channels.status);

  const [modalInfo, setModalInfo] = useState({ type: null, channelId: null });
  const showModal = (type, channelId = null) => setModalInfo({ type, channelId });
  const hideModal = () => setModalInfo({ type: null, channelId: null });

  useEffect(() => {
    if (channelsStatus === 'idle') {
      dispatch(fetchData());
    }
  }, [dispatch, channelsStatus]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelSection showModal={showModal} />
        <MessageSection />
      </div>
      {renderModal({ modalInfo, hideModal })}
    </div>
  );
};

export default MainPage;

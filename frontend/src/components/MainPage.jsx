import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchData } from '../slices/channelsSlice';
import ChannelSection from './ChannelSection';
import MessageSection from './MessageSection';
import getModal from '../modals/modalSelector';

const renderModal = (modalType) => {
  if (!modalType) {
    return null;
  }
  const Modal = getModal(modalType);
  return <Modal />;
};

const MainPage = () => {
  const dispatch = useDispatch();
  const channelsStatus = useSelector((state) => state.channels.status);
  const modalType = useSelector((state) => state.modals.modalType);

  useEffect(() => {
    if (channelsStatus === 'idle') {
      dispatch(fetchData());
    }
  }, [dispatch, channelsStatus]);

  return (
    <div className="container h-100 my-4 overflow-auto rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelSection />
        <MessageSection />
      </div>
      {renderModal(modalType)}
    </div>
  );
};

export default MainPage;

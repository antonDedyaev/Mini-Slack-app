import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchData } from '../slices/channelsSlice';
import ChannelSection from './ChannelSection';
import MessageSection from './MessageSection';

const MainPage = () => {
  const dispatch = useDispatch();
  const channelsStatus = useSelector((state) => state.channels.status);

  useEffect(() => {
    if (channelsStatus === 'idle') {
      dispatch(fetchData());
    }
  }, [dispatch, channelsStatus]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelSection />
        <MessageSection />
      </div>
    </div>
  );
};

export default MainPage;

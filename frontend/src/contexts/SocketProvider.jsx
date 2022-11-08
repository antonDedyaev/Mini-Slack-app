/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { channelSelected } from '../slices/channelsSlice';

export const SocketContext = createContext({});

export const SocketProvider = ({ socket, children }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const addMessage = (body, channelId, username) => {
    socket.emit('newMessage', { body, channelId, username }, (response) => {
      if (response.status !== 'ok') {
        console.log(response.status);
      }
    });
  };

  const addChannel = (name) => {
    socket.emit('newChannel', { name }, (response) => {
      if (response.status === 'ok') {
        dispatch(channelSelected(response.data.id));
        toast.success(t('toasts.added'));
      }
      console.log(response.status);
    });
  };

  const removeChannel = (id) => {
    socket.emit('removeChannel', { id }, (response) => {
      if (response.status !== 'ok') {
        console.log(response.status);
      }
      toast.success(t('toasts.removed'));
    });
  };

  const renameChannel = (id, name) => {
    socket.emit('renameChannel', { id, name }, (response) => {
      if (response.status !== 'ok') {
        console.log(response.status);
      }
      toast.success(t('toasts.renamed'));
    });
  };

  const chatAPI = {
    addMessage,
    addChannel,
    removeChannel,
    renameChannel,
  };

  return (
    <SocketContext.Provider value={chatAPI}>
      {children}
    </SocketContext.Provider>
  );
};

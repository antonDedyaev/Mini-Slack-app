/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const SocketContext = createContext({});

export const SocketProvider = ({ socket, children }) => {
  const { t } = useTranslation();
  const addMessage = (body, channelId, username) => {
    socket.emit('newMessage', { body, channelId, username }, (response) => {
      if (response.status !== 'ok') {
        console.log('Bad request!');
      }
    });
  };

  const addChannel = (name) => {
    socket.emit('newChannel', { name }, (response) => {
      if (response.status !== 'ok') {
        console.log('Bad request!');
      }
      toast.success(t('toasts.added'));
    });
  };

  const removeChannel = (id) => {
    socket.emit('removeChannel', { id }, (response) => {
      if (response.status !== 'ok') {
        console.log('Bad request!');
      }
      toast.success(t('toasts.removed'));
    });
  };

  const renameChannel = (id, name) => {
    socket.emit('renameChannel', { id, name }, (response) => {
      if (response.status !== 'ok') {
        console.log('Bad request!');
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

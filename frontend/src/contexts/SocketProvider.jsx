/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { messageAdded } from '../slices/messagesSlice';
import { channelAdded, channelRemoved, channelRenamed } from '../slices/channelsSlice';

export const SocketContext = createContext({});

export const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const addMessage = (body, channelId, username) => {
    socket.emit('newMessage', { body, channelId, username }, (response) => {
      if (response.status !== 'ok') {
        console.log('Bad request!');
      }
    });
  };

  socket.on('newMessage', (payload) => {
    dispatch(messageAdded(payload));
  });

  const addChannel = (name) => {
    socket.emit('newChannel', { name }, (response) => {
      if (response.status !== 'ok') {
        console.log('Bad request!');
      }
    });
  };

  socket.on('newChannel', (payload) => {
    dispatch(channelAdded(payload));
  });

  const removeChannel = (id) => {
    socket.emit('removeChannel', { id }, (response) => {
      if (response.status !== 'ok') {
        console.log('Bad request!');
      }
    });
  };

  socket.on('removeChannel', (payload) => {
    dispatch(channelRemoved(payload));
  });

  const renameChannel = (id, name) => {
    socket.emit('renameChannel', { id, name }, (response) => {
      if (response.status !== 'ok') {
        console.log('Bad request!');
      }
    });
  };

  socket.on('renameChannel', (payload) => {
    dispatch(channelRenamed(payload));
  });

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

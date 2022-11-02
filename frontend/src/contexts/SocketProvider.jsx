/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const SocketContext = createContext({});

export const SocketProvider = ({ socket, children }) => {
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
      toast.success('Канал создан');
    });
  };

  const removeChannel = (id) => {
    socket.emit('removeChannel', { id }, (response) => {
      if (response.status !== 'ok') {
        console.log('Bad request!');
      }
      toast.success('Канал удалён');
    });
  };

  const renameChannel = (id, name) => {
    socket.emit('renameChannel', { id, name }, (response) => {
      if (response.status !== 'ok') {
        console.log('Bad request!');
      }
      toast.success('Канал переименован');
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

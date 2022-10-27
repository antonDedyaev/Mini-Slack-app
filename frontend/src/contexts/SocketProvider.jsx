/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { newMessageAdded } from '../slices/messagesSlice';

export const SocketContext = createContext({});

export const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const addMessage = (body, channelId, username) => {
    socket.emit('newMessage', { body, channelId, username });
  };

  socket.on('newMessage', (payload) => {
    dispatch(newMessageAdded(payload));
  });

  const chatAPI = { addMessage };

  return (
    <SocketContext.Provider value={chatAPI}>
      {children}
    </SocketContext.Provider>
  );
};

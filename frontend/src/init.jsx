import React from 'react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';

import { Provider as StoreProvider } from 'react-redux';
import { AuthProvider } from './contexts/AuthProvider';
import { SocketProvider } from './contexts/SocketProvider';
import App from './components/App';
import store from './slices/store';
import {
  channelAdded,
  channelRemoved,
  channelRenamed,
} from './slices/channelsSlice';
import { messageAdded } from './slices/messagesSlice';
import ru from './locales/ru';

export default async () => {
  const i18nInstance = i18n.createInstance();
  await i18nInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources: {
        ru,
      },
    });

  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(messageAdded(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelAdded(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelRemoved(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelRenamed(payload));
  });

  return (
    <AuthProvider>
      <StoreProvider store={store}>
        <SocketProvider socket={socket}>
          <I18nextProvider i18n={i18nInstance}>
            <App />
          </I18nextProvider>
        </SocketProvider>
      </StoreProvider>
    </AuthProvider>
  );
};

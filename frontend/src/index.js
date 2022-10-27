import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import { io } from 'socket.io-client';
import { AuthProvider } from './contexts/AuthProvider';
import { SocketProvider } from './contexts/SocketProvider';
// eslint-disable-next-line import/no-cycle
import App from './components/App';
import store from './slices/store';

const socket = io();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <StoreProvider store={store}>
        <SocketProvider socket={socket}>
          <App />
        </SocketProvider>
      </StoreProvider>
    </AuthProvider>
  </React.StrictMode>,
);

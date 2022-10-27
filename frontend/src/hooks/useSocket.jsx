import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketProvider';

const useSocket = () => useContext(SocketContext);

export default useSocket;

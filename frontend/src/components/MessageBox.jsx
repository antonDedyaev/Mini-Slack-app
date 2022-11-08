import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import profanityFilter from '../utils/profanityFilter';

const MessageBox = () => {
  const messageRef = useRef();
  const { messages } = useSelector((state) => state.messages);
  const { currentChannelId } = useSelector((state) => state.channels);
  const currChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currChannelMessages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {currChannelMessages.map(({ id, body, username }) => (
        <div key={id} className="text-break mb-2" ref={messageRef}>
          <b>{username}</b>
          {`: ${profanityFilter(body)}`}
        </div>
      ))}
    </div>
  );
};

export default MessageBox;

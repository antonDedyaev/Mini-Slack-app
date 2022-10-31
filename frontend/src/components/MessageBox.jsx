import React from 'react';
import { useSelector } from 'react-redux';

const MessageBox = () => {
  const { messages } = useSelector((state) => state.messages);
  const { currentChannelId } = useSelector((state) => state.channels);
  const currChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {currChannelMessages.map(({ id, body, username }) => (
        <div key={id} className="text-break mb-2">
          <b>{username}</b>
          {`: ${body}`}
        </div>
      ))}
    </div>
  );
};

export default MessageBox;

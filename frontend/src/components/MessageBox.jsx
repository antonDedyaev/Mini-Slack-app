import React from 'react';
import { useSelector } from 'react-redux';

const MessageBox = () => {
  const { messages } = useSelector((state) => state.messages);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.map(({ id, body, username }) => (
        <div key={id} className="text-break mb-2">
          <b>{username}</b>
          {`: ${body}`}
        </div>
      ))}
    </div>
  );
};

export default MessageBox;

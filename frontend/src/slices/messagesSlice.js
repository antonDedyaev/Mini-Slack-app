/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { fetchData, channelRemoved } from './channelsSlice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messageAdded(state, action) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { messages } = action.payload;
      console.log(action.payload);
      state.messages = messages;
    });
    builder.addCase(channelRemoved, (state, action) => {
      const { id } = action.payload;
      state.messages = state.messages.filter((message) => message.channelId !== id);
    });
  },
});

export const { messageAdded } = messagesSlice.actions;

export default messagesSlice.reducer;

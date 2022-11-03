/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../utils/routes';

const defaultId = 1;

const initialState = {
  channels: [],
  currentChannelId: defaultId,
  status: 'idle',
};

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

export const fetchData = createAsyncThunk(routes.dataPath(), async () => {
  const response = await axios
    .get(routes.dataPath(), { headers: getAuthHeader() });
  return response.data;
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    channelAdded(state, action) {
      const { id } = action.payload;
      state.channels.push(action.payload);
      state.currentChannelId = id;
    },
    channelRemoved(state, action) {
      const { id } = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.currentChannelId = defaultId;
    },
    channelRenamed(state, action) {
      const { id, name } = action.payload;
      const renamedChannel = state.channels.find((channel) => channel.id === id);
      renamedChannel.name = name;
    },
    channelSelected(state, action) {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels } = action.payload;
        state.status = 'succeeded';
        state.channels = channels;
      });
  },

});

export const {
  channelAdded,
  channelRemoved,
  channelRenamed,
  channelSelected,
} = channelsSlice.actions;

export default channelsSlice.reducer;

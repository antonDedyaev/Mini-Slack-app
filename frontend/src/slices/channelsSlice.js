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
  // console.log(response.data);
  return response.data;
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
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

export const { channelAdded } = channelsSlice.actions;

export default channelsSlice.reducer;

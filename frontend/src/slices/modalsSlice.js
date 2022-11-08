/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelId: null,
  modalType: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    modalOpened(state, action) {
      const { modalType, channelId } = action.payload;
      state.modalType = modalType;
      if (action.payload.channelId) {
        state.channelId = channelId;
      }
    },
    modalClosed(state) {
      state.modalType = null;
      state.channelId = null;
    },
  },
});

export const { modalOpened, modalClosed } = modalsSlice.actions;

export default modalsSlice.reducer;

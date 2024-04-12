import { createSlice } from "@reduxjs/toolkit";

interface ChatState {
  messages: string[][];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload.message);
    },
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;

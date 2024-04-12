import { createSlice } from "@reduxjs/toolkit";

interface TimerState {
  isWorking: boolean;
}

const initialState: TimerState = {
  isWorking: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimerOn: (state) => {
      state.isWorking = true;
    },
    setTimerOff: (state) => {
      state.isWorking = false;
    },
  },
});

export const { setTimerOff, setTimerOn } = timerSlice.actions;

export default timerSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import gameFieldReducer from "./gameField/gameFieldSlice";
import timerReducer from "./timer/timerSlice";

export const store = configureStore({
  reducer: { gameField: gameFieldReducer, timer: timerReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

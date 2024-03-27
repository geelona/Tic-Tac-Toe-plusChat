import { configureStore } from "@reduxjs/toolkit";
import gameFieldReducer from "./gameField/gameFieldSlice";

export const store = configureStore({
  reducer: { gameField: gameFieldReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

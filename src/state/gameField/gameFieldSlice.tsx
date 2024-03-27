import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GameFieldState {
  isO: boolean;
  field: string[];
  firstPlayerSymbol: string;
}

const initialState: GameFieldState = {
  isO: false,
  field: ["", "", "", "", "", "", "", "", ""],
  firstPlayerSymbol: "",
};

const gameFieldSlice = createSlice({
  name: "gameField",
  initialState,
  reducers: {
    setFieldEl: (state, action: PayloadAction<{ indexOfElement: number }>) => {
      if (state.field[action.payload.indexOfElement] !== "") {
        return;
      }
      state.field[action.payload.indexOfElement] = state.isO ? "o" : "x";
      state.isO = !state.isO;
    },
    setFirstPlayerSymbol: (
      state,
      action: PayloadAction<{ symbol: string }>
    ) => {
      state.firstPlayerSymbol = action.payload.symbol;
    },
  },
});

export const { setFieldEl, setFirstPlayerSymbol } = gameFieldSlice.actions;

export default gameFieldSlice.reducer;

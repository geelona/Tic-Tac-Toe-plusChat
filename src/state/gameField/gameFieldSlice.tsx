import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GameFieldState {
  isO: boolean;
  field: string[];
  firstPlayerSymbol: string;
  firstPlayerScore: number;
  secondPlayerScore: number;
}

const initialState: GameFieldState = {
  isO: false,
  field: ["", "", "", "", "", "", "", "", ""],
  firstPlayerSymbol: "",
  firstPlayerScore: 0,
  secondPlayerScore: 0,
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

    setAddScore: (state, action: PayloadAction<{ playerID: number }>) => {
      if (action.payload.playerID === 1) {
        state.firstPlayerScore++;
      } else {
        state.secondPlayerScore++;
      }
    },

    setRestartGame: (state) => {
      state.isO = false;
      state.field = ["", "", "", "", "", "", "", "", ""];
      state.firstPlayerSymbol = "";
      state.firstPlayerScore = 0;
      state.secondPlayerScore = 0;
    },

    setNewGame: (state) => {
      state.field = ["", "", "", "", "", "", "", "", ""];
    },

    setNewGameSymbol: (state, action: PayloadAction<{ Symbol: string }>) => {
      state.isO = action.payload.Symbol === "o" ? true : false;
    },
  },
});

export const {
  setFieldEl,
  setFirstPlayerSymbol,
  setAddScore,
  setRestartGame,
  setNewGame,
  setNewGameSymbol,
} = gameFieldSlice.actions;

export default gameFieldSlice.reducer;

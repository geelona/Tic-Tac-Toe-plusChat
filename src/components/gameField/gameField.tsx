import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import {
  setFieldEl,
  setFirstPlayerSymbol,
  setAddScore,
  setNewGame,
  setNewGameSymbol,
} from "../../state/gameField/gameFieldSlice";
import { setTimerOn } from "../../state/timer/timerSlice";
import { clearBoard } from "../../utils/clearBoard";

const GameField = ({ playerID }: { playerID: number }) => {
  const dispatch = useDispatch();
  const isO = useSelector((state: RootState) => state.gameField.isO);
  const firstPlayerSymbol = useSelector(
    (state: RootState) => state.gameField.firstPlayerSymbol
  );
  const field = useSelector((state: RootState) => state.gameField.field);
  const timerIsWorking = useSelector(
    (state: RootState) => state.timer.isWorking
  );

  const titleRef = useRef<HTMLHeadingElement>(null);
  const gameFieldContainerFieldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const winLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timerIsWorking) {
      dispatch(setNewGame());
    }
  }, [timerIsWorking]);

  useEffect(() => {
    canvasRef.current!.width = window.innerWidth;
    canvasRef.current!.height = window.innerHeight;
  });

  useEffect(() => {
    const containsNonEmpty = field.some((element) => element !== "");
    if (containsNonEmpty) {
      for (let i = 0; i < field.length; i++) {
        if (field[i] !== "") {
          const fieldEl = gameFieldContainerFieldRef.current?.querySelector(
            `[data-field-id="${i + 1}"]`
          );
          if (fieldEl) {
            fieldEl.innerHTML = "<p> " + field[i] + "</p>";
            fieldEl.classList.add("field-el--disabled");
          }
        }
      }
    } else {
      clearBoard(gameFieldContainerFieldRef, winLineRef, field);
    }

    titleRef.current!.innerText = changeTitleAndCheckWhosTurn() ?? "";
    CheckIfWin();
  }, [field]);

  function drawWinLine(winCombinationNumber: Number) {
    const classList = Array.from(winLineRef.current!.classList);
    classList.forEach((className) => {
      if (className !== "field__winLine-container")
        winLineRef.current!.classList.remove(className);
    });
    winLineRef.current!.style.display = "block";
    switch (winCombinationNumber) {
      case 0:
        winLineRef.current!.classList.add("field__winLine-container-1");
        break;
      case 1:
        winLineRef.current!.classList.add("field__winLine-container-2");
        break;
      case 2:
        winLineRef.current!.classList.add("field__winLine-container-3");
        break;
      case 3:
        winLineRef.current!.classList.add("field__winLine-container-4");
        break;
      case 4:
        winLineRef.current!.classList.add("field__winLine-container-5");
        break;
      case 5:
        winLineRef.current!.classList.add("field__winLine-container-6");
        break;
      case 6:
        winLineRef.current!.classList.add("field__winLine-container-7");
        break;
      case 7:
        winLineRef.current!.classList.add("field__winLine-container-8");
        break;
      default:
        break;
    }
  }

  function CheckIfWin() {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winCombinations.length; i++) {
      const [a, b, c] = winCombinations[i];
      if (field[a] && field[a] === field[b] && field[a] === field[c]) {
        gameFieldContainerFieldRef.current?.classList.add("field--disabled");
        gameFieldContainerFieldRef.current?.classList.remove("field--active");

        if (
          (firstPlayerSymbol == field[a] && playerID == 1) ||
          (firstPlayerSymbol != field[a] && playerID == 2)
        ) {
          titleRef.current!.innerText = "You Won!";
          gameFieldContainerFieldRef.current?.classList.add("field--won");
          dispatch(setAddScore({ playerID: playerID }));
          if (playerID === 1) {
            dispatch(setNewGameSymbol({ Symbol: "o" }));
          } else {
            dispatch(setNewGameSymbol({ Symbol: "x" }));
          }
        } else if (
          (firstPlayerSymbol == field[a] && playerID == 2) ||
          (firstPlayerSymbol != field[a] && playerID == 1)
        ) {
          titleRef.current!.innerText = "You Lose!";
          gameFieldContainerFieldRef.current?.classList.add("field--lose");
        }
        dispatch(setTimerOn());
        drawWinLine(i);
        return;
      }
    }
  }

  function changeTitleAndCheckWhosTurn() {
    const nonEmptyFields = field.filter((el) => el !== "");

    if (nonEmptyFields.length === 9) {
      gameFieldContainerFieldRef.current?.classList.add("field--draw");
      gameFieldContainerFieldRef.current?.classList.remove("field--active");
      dispatch(setTimerOn());
      return "It's a draw!";
    } else if (
      (firstPlayerSymbol === "x" && !isO && playerID === 1) ||
      (firstPlayerSymbol === "x" && isO && playerID === 2) ||
      (firstPlayerSymbol === "o" && isO && playerID === 1) ||
      (firstPlayerSymbol === "o" && !isO && playerID === 2)
    ) {
      gameFieldContainerFieldRef.current?.classList.add("field--active");
      gameFieldContainerFieldRef.current?.classList.remove("field--disabled");
      return "Your turn!";
    } else if (
      (firstPlayerSymbol === "x" && isO && playerID === 1) ||
      (firstPlayerSymbol === "x" && !isO && playerID === 2) ||
      (firstPlayerSymbol === "o" && !isO && playerID === 1) ||
      (firstPlayerSymbol === "o" && isO && playerID === 2)
    ) {
      gameFieldContainerFieldRef.current?.classList.add("field--disabled");
      gameFieldContainerFieldRef.current?.classList.remove("field--active");
      return "Opponent's turn!";
    } else {
      return "Press to start!";
    }
  }

  function onFieldClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    if (target.parentElement === gameFieldContainerFieldRef.current) {
      if (firstPlayerSymbol === "" && playerID === 1) {
        dispatch(setFirstPlayerSymbol({ symbol: "x" }));
      } else if (firstPlayerSymbol === "" && playerID === 2) {
        dispatch(setFirstPlayerSymbol({ symbol: "o" }));
      }
      dispatch(setFieldEl({ indexOfElement: +target.dataset.fieldId! - 1 }));
    }
  }

  return (
    <div className="gameField-container flex flex-col items-center">
      <h1>Player {playerID}</h1>
      <h2 ref={titleRef} className="my-4">
        Make the first move!
      </h2>
      <div
        ref={gameFieldContainerFieldRef}
        className="field grid grid-cols-3"
        onClick={onFieldClick}
      >
        <div className="field-el" data-field-id="1"></div>
        <div className="field-el" data-field-id="2"></div>
        <div className="field-el" data-field-id="3"></div>
        <div className="field-el" data-field-id="4"></div>
        <div className="field-el" data-field-id="5"></div>
        <div className="field-el" data-field-id="6"></div>
        <div className="field-el" data-field-id="7"></div>
        <div className="field-el" data-field-id="8"></div>
        <div className="field-el" data-field-id="9"></div>
        <div ref={winLineRef} className="field__winLine-container"></div>
      </div>
      <canvas ref={canvasRef} className=" absolute"></canvas>
    </div>
  );
};

export default GameField;

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import {
  setFieldEl,
  setFirstPlayerSymbol,
} from "../../state/gameField/gameFieldSlice";

const GameField = ({ playerID }: { playerID: number }) => {
  const dispatch = useDispatch();
  const isO = useSelector((state: RootState) => state.gameField.isO);
  const firstPlayerSymbol = useSelector(
    (state: RootState) => state.gameField.firstPlayerSymbol
  );
  const field = useSelector((state: RootState) => state.gameField.field);
  const gameFieldContainerFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, [field]);

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
      <h2 className="my-4">Make the first move!</h2>
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
      </div>
    </div>
  );
};

export default GameField;

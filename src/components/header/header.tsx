import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setRestartGame } from "../../state/gameField/gameFieldSlice";
import { setTimerOff } from "../../state/timer/timerSlice";

const Header = () => {
  const dispatch = useDispatch();
  const firstPlayerScore = useSelector(
    (state: RootState) => state.gameField.firstPlayerScore
  );
  const secondPlayerScore = useSelector(
    (state: RootState) => state.gameField.secondPlayerScore
  );
  return (
    <header className="header-container flex items-center justify-evenly py-6">
      <div className="score-container flex items-center gap-4 text-3xl">
        <p>
          Score: <span className="firstPlayerScore">{firstPlayerScore}</span>:
          <span className="secondPlayerScore">{secondPlayerScore}</span>
        </p>
        <button
          className="score-container__reset-button text-sm"
          onClick={() => {
            dispatch(setRestartGame());
            dispatch(setTimerOff());
          }}
        >
          Reset
        </button>
      </div>
    </header>
  );
};

export default Header;

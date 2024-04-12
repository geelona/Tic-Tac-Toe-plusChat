import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setTimerOff } from "../../state/timer/timerSlice";

export default function Timer() {
  const dispatch = useDispatch();

  const isWorking = useSelector((state: RootState) => state.timer.isWorking);

  const timerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isWorking) {
      timerRef.current!.style.display = "block";
      let time = 5;
      timerRef.current!.innerText = time.toString();
      const timer = setInterval(() => {
        time--;
        timerRef.current!.innerText = time.toString();
        if (time === 0) {
          clearInterval(timer);
          timerRef.current!.style.display = "none";
          dispatch(setTimerOff());
        }
      }, 1000);
      return () => clearInterval(timer);
    } else {
      timerRef.current!.style.display = "none";
    }
  }, [isWorking]);

  return (
    <div ref={timerRef} className="timer">
      5
    </div>
  );
}

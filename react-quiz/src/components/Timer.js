import { useEffect } from "react";

function Timer({ secondsRemaining, dispatch }) {
  const mins = Math.round(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      <p>
        {mins < 10 && "0"}
        {mins}:{secs < 10 && "0"}
        {secs}
      </p>
    </div>
  );
}

export default Timer;

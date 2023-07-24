import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./buttons/playbutton";
import PauseButton from "./buttons/pausebutton";
import SettingsButton from "./buttons/settingsbutton";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./contexts/settingscontext";

const RED = "#f54e4e";
const GREEN = "#4aec8c";

function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const [mode, setMode] = useState("break"); //work, break, null
  const [isPaused, setIsPaused] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0); 

  const secondsLeftRef = useRef(secondsLeft); // need to use this so the values are updated
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function initTimer() {
    setSecondsLeft(settingsInfo.workMinutes * 60);
  }

  function switchMode() {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    setMode(nextMode);
    modeRef.current = nextMode;

    const nextSeconds =
      modeRef.current === "work"
        ? settingsInfo.workMinutes * 60
        : settingsInfo.breakMinutes * 60;
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }

      if (secondsLeftRef.current == 0) {
        return switchMode();
      }

      tick();
    }, 1000); // every 1000 ms this code runs

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;

  const percentage = Math.round(secondsLeft / totalSeconds  * 100);
  const minutes = Math.floor(secondsLeft/60); 
  let seconds = (secondsLeft % 60) ; 

  seconds = (seconds < 10) ? '0' + seconds : seconds; 

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds}`}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: mode === "work" ? RED : GREEN,
          trailColor: "rgba(255, 255, 255, 0.2)",
        })}
      />

      <div style={{ marginTop: "20px" }}>
        {isPaused ? <PlayButton onClick={() => {setIsPaused(false); isPausedRef.current = false; }}/> : <PauseButton onClick={() => {setIsPaused(true); isPausedRef.current = true;}}/>}
      </div>

      <div style={{ marginTop: "20px" }}>
        <SettingsButton
          onClick={() => {
            settingsInfo.setShowSettings(true);
          }}
        />
      </div>
    </div>
  );
}

export default Timer;

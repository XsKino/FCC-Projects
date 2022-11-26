import './App.css';
import { useState } from 'react';


export default function App() {

  const [displayTime, setDisplayTime] = useState(25 *60);
  const [sessionTime, setSessionTime] = useState(25 *60);
  const [breakTime, setBreakTime] = useState(5 *60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  const audiotag = document.getElementById("beep");

  const playBreakSound = () => {
    audiotag.volume = 1;
    audiotag.currentTime = 0;
    audiotag.play();
  }

  const formatTime = (time, type='display') => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    if (type==='input') return minutes;
    if (type==='display') return ((minutes<10? '0' +minutes: minutes) + ':' + (seconds<10? '0' +seconds: seconds))
  }

  const changeTime = (amount, type) => {
    if (type==='break' && ((amount>0 && breakTime<3600) || (amount<0 && breakTime>60))) setBreakTime(prev => prev +amount);
    if (type==='session' && ((amount>0 && sessionTime<3600) || (amount<0 && sessionTime>60))) {
      setSessionTime(prev => prev +amount);
      if(!timerOn) setDisplayTime(sessionTime + amount)
    }
  }

  const handleTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() +second;
    let onBreakVariable = onBreak;
    if(!timerOn) {
      let interval = setInterval(()=>{
        date = new Date().getTime();
        if(date > nextDate) {
          setDisplayTime(prev => {
            if (prev <= 1)playBreakSound();
            if (prev <= 0 && !onBreakVariable) {
              onBreakVariable = true;
              setOnBreak(true);
              return breakTime;
            } else if (prev <= 0 && onBreakVariable) {
              onBreakVariable = false;
              setOnBreak(false);
              return sessionTime;              
            }
            return prev -1;
          });

          nextDate += second;
        }
      }, 30)
      localStorage.clear();
      localStorage.setItem('interval-id', interval);
    }

    if(timerOn) clearInterval(localStorage.getItem('interval-id'))

    setTimerOn(!timerOn);
  }

  const clear = () =>{
    setDisplayTime(25 *60);
    setSessionTime(25 *60);
    setBreakTime(5 *60);
    setOnBreak(false);
    if(timerOn) handleTime();
    audiotag.pause();
    audiotag.currentTime = 0;
  }
  
  return (
    <div className="App">
      <div className="length-container">
      <Length title="break length" changeTime={changeTime} type="break" time={breakTime} formatTime={formatTime} />
      <Length title="session length" changeTime={changeTime} type="session" time={sessionTime} formatTime={formatTime} />
      </div>
      <h3 id="timer-label">{onBreak?'Break':'Session'}</h3>
      <div className="buttons">
        <button id="start_stop" onClick={handleTime}>
          {timerOn? <i className="fa-solid fa-pause"></i>: <i className="fa-solid fa-play"></i>}
        </button>
        <button id="reset" onClick={clear}>
          <i className="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
      <h1 id="time-left">{formatTime(displayTime, 'display')}</h1>
    </div>
  );
}

function Length({ title, changeTime, type, time, formatTime }) {
  return(
    <div id={title==='break length'?'break-label':'session-label'} className="Length">
      <h3>{title}</h3>
      <div className="time-sets">
        <button onClick={()=>changeTime(-60, type)} id={title==='break length'?'break-decrement':'session-decrement'}>
          <i className="fa-solid fa-arrow-down"></i>
        </button>
        <h3 id={title==='break length'?'break-length':'session-length'}>{formatTime(time, 'input')}</h3>
        <button onClick={()=>changeTime(+60, type)} id={title==='break length'?'break-increment':'session-increment'}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
}
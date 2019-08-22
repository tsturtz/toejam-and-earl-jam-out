import React, { useState, useEffect } from 'react';
import './App.css';
import funkotronicBeat from './assets/funkotronic-beat.mp3';

const App: React.FC = () => {

  // Declare a new state variable, which we'll call "count"
  const [shifty, setShifty] = useState(1);

  useEffect (() => {
    const interval = setInterval(() => {
      // set background to a different sprite every 3 seconds
      setShifty(Math.floor(Math.random() * 24) + 1);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []); // empty array here so this only runs once on component did mount (this seems weird 🤔)

  return (
    <div id="body-bg">
      <audio autoPlay loop>
        <source src={funkotronicBeat} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div id="jam-out-bg" className={`shifty${shifty}`}>
        <div id="toejam-box">
          <div id="toejam" />
        </div>
        <div id="earl-box">
          <div id="earl" />
        </div>
        <div id="jam-out-frame" />
      </div>
      <div id="jam-out-border" />
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import funkotronicBeat from './assets/funkotronic-beat.mp3';

const App: React.FC = () => {

  const [shifty, setShifty] = useState(1);
  const [toejamDance, setToejamDance] = useState('');
  const [earlDance, setEarlDance] = useState('');
  // used 'any' here because HTMLAudioElement | null doesnt cast correctly
  const audioRef:any = useRef(document.getElementById('funk'));
  let animTimeout:any = null;

  const drumpadHit = (sound) => {
    // play audios
  }

  const initiateDance = (func:any, val:any) => {
    clearTimeout(animTimeout);
    func(val);
    animTimeout = setTimeout(() => { func('') }, 1000);
  }

  useEffect (() => {
    const interval = setInterval(() => {
      // set background to a different sprite every 3 seconds
      setShifty(Math.floor(Math.random() * 24) + 1);
    }, 3000);

    setTimeout(() => {
      // eslint-disable-next-line
      if (confirm('play music')) {
        console.log(audioRef);
        audioRef.current.load();
        audioRef.current.play();
      }
    }, 3000);

    window.addEventListener('keypress', (e) => {
      // SOUND FX
      if (e.which === 49) { drumpadHit('kick'); } // 1
      if (e.which === 50) { drumpadHit('snare'); } // 2
      if (e.which === 51) { drumpadHit('clap'); } // 3
      if (e.which === 52) { drumpadHit('scratch'); } // 4
      if (e.which === 53) { drumpadHit('yeah-alright') } // 5
      if (e.which === 54) { drumpadHit('jammin') } // 6
      if (e.which === 55) { drumpadHit('toejam') } // 7
      if (e.which === 56) { drumpadHit('bigearl') } // 8
      if (e.which === 57) { drumpadHit('burp') } // 9
      if (e.which === 48) { drumpadHit('swoosh') } // 0
      // TOEJAM DANCE MOVES
      if (e.which === 119) { initiateDance(setToejamDance, 'dance1'); }
      if (e.which === 97) { initiateDance(setToejamDance, 'dance2'); }
      if (e.which === 115) { initiateDance(setToejamDance, 'dance3'); }
      if (e.which === 100) { initiateDance(setToejamDance, 'dance4'); }
      // EARL DANCE MOVES
      if (e.which === 105) { initiateDance(setEarlDance, 'dance1'); }
      if (e.which === 106) { initiateDance(setEarlDance, 'dance2'); }
      if (e.which === 107) { initiateDance(setEarlDance, 'dance3'); }
      if (e.which === 108) { initiateDance(setEarlDance, 'dance4'); }
    })

    return () => {
      clearInterval(interval);
    };
  }, []); // empty array here so this only runs once on component did mount (this seems weird 🤔)

  return (
    <div id="body-bg">
      <audio id="funk" ref={audioRef} loop>
        <source src={funkotronicBeat} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div id="jam-out-bg" className={`shifty${shifty}`}>
        <div id="toejam-box">
          <div id="toejam" className={`${toejamDance}`} />
        </div>
        <div id="earl-box">
          <div id="earl" className={`${earlDance}`} />
        </div>
        <div id="jam-out-frame" />
      </div>
      <div id="jam-out-border" />
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import funkotronicBeat from './assets/jams/funkotronic-beat.mp3';

import kick from './assets/samples/kick.wav';
import snare from './assets/samples/snare.wav';
import clap from './assets/samples/clap.wav';
import scratch from './assets/samples/scratch.wav';
import yeahalright from './assets/samples/yeahalright.wav';
import jammin from './assets/samples/jammin.wav';
import toejam from './assets/samples/toejam.wav';
import bigearl from './assets/samples/bigearl.wav';
import burp from './assets/samples/burp.wav';
import swoosh from './assets/samples/swoosh.wav';

const App: React.FC = () => {

  const [shifty, setShifty] = useState(1);
  const [toejamDance, setToejamDance] = useState('');
  const [earlDance, setEarlDance] = useState('');

  // used 'any' here because HTMLAudioElement | null doesnt cast correctly
  const funkotronicBeatRef: any = useRef(document.getElementById('funkotronicBeat'));
  const kickRef: any = useRef(document.getElementById('kickRef'));
  const snareRef: any = useRef(document.getElementById('snareRef'));
  const clapRef: any = useRef(document.getElementById('clapRef'));
  const scratchRef: any = useRef(document.getElementById('scratchRef'));
  const yeahalrightRef: any = useRef(document.getElementById('yeahalrightRef'));
  const jamminRef: any = useRef(document.getElementById('jamminRef'));
  const toejamRef: any = useRef(document.getElementById('toejamRef'));
  const bigearlRef: any = useRef(document.getElementById('bigearlRef'));
  const burpRef: any = useRef(document.getElementById('burpRef'));
  const swooshRef: any = useRef(document.getElementById('swooshRef'));
  
  let toejamAnimationTimeout: any = '';
  let earlAnimationTimeout: any = '';

  const drumpadHit = (ref: any) => {
    ref.current.pause();
    ref.current.load();
    ref.current.play();
  }

  const dance = (func: any, val: any, char: any) => {
    clearTimeout(char);
    func(val);
    char = setTimeout(() => { func('') }, 1000);
  }

  useEffect (() => {
    const interval = setInterval(() => {
      // set background to a different sprite every 3 seconds
      setShifty(Math.floor(Math.random() * 24) + 1);
    }, 3000);

    funkotronicBeatRef.current.load();

    setTimeout(() => {
      // eslint-disable-next-line
      if (confirm('play music')) {
        funkotronicBeatRef.current.play();
      }
    }, 3000);

    window.addEventListener('keypress', (e) => {
      // SOUND FX

      // 1
      if (e.which === 49) {
        drumpadHit(kickRef);
        dance(setToejamDance, 'dance1', toejamAnimationTimeout);
        dance(setEarlDance, 'dance1', earlAnimationTimeout);
      }
      // 2
      if (e.which === 50) {
        drumpadHit(snareRef);
        dance(setToejamDance, 'dance2', toejamAnimationTimeout);
        dance(setEarlDance, 'dance2', earlAnimationTimeout);
      }
      // 3
      if (e.which === 51) {
        drumpadHit(clapRef);
        dance(setToejamDance, 'dance3', toejamAnimationTimeout);
        dance(setEarlDance, 'dance3', earlAnimationTimeout);
      }
      // 4
      if (e.which === 52) {
        drumpadHit(scratchRef);
        dance(setToejamDance, 'dance4', toejamAnimationTimeout);
        dance(setEarlDance, 'dance4', earlAnimationTimeout);
      }
      // 5
      if (e.which === 53) {
        drumpadHit(yeahalrightRef);
      }
      // 6
      if (e.which === 54) {
        drumpadHit(jamminRef);
      }
      // 7
      if (e.which === 55) {
        drumpadHit(toejamRef);
      }
      // 8
      if (e.which === 56) {
        drumpadHit(bigearlRef);
      }
      // 9
      if (e.which === 57) {
        drumpadHit(burpRef);
      }
      // 0
      if (e.which === 48) {
        drumpadHit(swooshRef);
      }
    })

    return () => { clearInterval(interval); };
  }, []); // empty array here so this only runs once on component did mount (this seems weird 🤔)

  return (
    <div id="body-bg">
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

      {/* INTRO/PAUSE */}
      <div id="space-background">
        <div id="press-spacebar" />
      </div>

      {/* JAMS */}
      <audio id="funkotronicBeat" ref={funkotronicBeatRef} preload="auto" loop>
        <source src={funkotronicBeat} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* SAMPLES */}
      <audio id="kick" ref={kickRef}>
        <source src={kick} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <audio id="snare" ref={snareRef}>
        <source src={snare} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <audio id="clap" ref={clapRef}>
        <source src={clap} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <audio id="scratch" ref={scratchRef}>
        <source src={scratch} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <audio id="yeahalright" ref={yeahalrightRef}>
        <source src={yeahalright} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <audio id="jammin" ref={jamminRef}>
        <source src={jammin} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <audio id="toejam" ref={toejamRef}>
        <source src={toejam} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <audio id="bigearl" ref={bigearlRef}>
        <source src={bigearl} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <audio id="burp" ref={burpRef}>
        <source src={burp} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <audio id="swoosh" ref={swooshRef}>
        <source src={swoosh} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default App;

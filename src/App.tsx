import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './App.css';

import alienBreakDown from './assets/jams/alien-break-down.mp3';
import bigEarlBump from './assets/jams/big-earl-bump.mp3';
import funkotronicBeat from './assets/jams/funkotronic-beat.mp3';
import rapmasterRocketRacket from './assets/jams/rapmaster-rocket-racket.mp3';
import toejamJammin from './assets/jams/toejam-jammin.mp3';
import toejamSlowjam from './assets/jams/toejam-slowjam.mp3';

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

  const [isPaused, setPaused] = useState(true);
  const [shifty, setShifty] = useState(1);
  const [alienDance, setDance] = useState('');

  // used 'any' here because HTMLAudioElement | null doesnt cast correctly
  const jam1Ref: any = useRef(document.getElementById('jam1'));
  const jam2Ref: any = useRef(document.getElementById('jam2'));
  const jam3Ref: any = useRef(document.getElementById('jam3'));
  const jam4Ref: any = useRef(document.getElementById('jam4'));
  const jam5Ref: any = useRef(document.getElementById('jam5'));
  const jam6Ref: any = useRef(document.getElementById('jam6'));
  const jams = [jam1Ref, jam2Ref, jam3Ref, jam4Ref, jam5Ref, jam6Ref];
  const [jam, setJam] = useState(2); // TODO: need to do some work setting the jams (when one ends or when left/right is pressed)

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
  
  let alienAnimationTimeout: any = '';

  const drumpadHit = (ref: any) => {
    ref.current.pause();
    ref.current.load();
    ref.current.play();
  }

  const dance = (updateStateFunc: any, val: any) => {
    clearTimeout(alienAnimationTimeout);
    updateStateFunc(val);
    alienAnimationTimeout = setTimeout(() => { updateStateFunc('') }, 1000);
  }

  const prevJam = () => {
    setJam((prevJam: any) => prevJam === jams.length - 1 ? 0 : prevJam += 1);
  }
  const nextJam = () => {
    setJam((prevJam: any) => prevJam === 0 ? jams.length - 1 : prevJam -= 1);
  }

  // const handleClick = useCallback((e: any) => {
  //   if (!isPaused) {
  //     setPaused(true);
  //   }
  // }, [isPaused]);

  const handleKeyPress = useCallback((e: any) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      setPaused((prevPause) => !prevPause);
    }
    
    // do not fire audio effects if paused
    if (isPaused) return;

    // change music forward or backward
    if (e.key === '<' || e.key === ',') {
      jams[jam].current.pause();
      jams[jam].current.load();
      prevJam();
    }
    if (e.key === '>' || e.key === '.') {
      jams[jam].current.pause();
      jams[jam].current.load();
      nextJam();
    }

    // audio/dance effects for keypresses 1 thru 0
    if (e.code === 'Digit1') {
      drumpadHit(kickRef);
      dance(setDance, 'dance1');
    }
    if (e.code === 'Digit2') {
      drumpadHit(snareRef);
      dance(setDance, 'dance2');
    }
    if (e.code === 'Digit3') {
      drumpadHit(clapRef);
      dance(setDance, 'dance3');
    }
    if (e.code === 'Digit4') {
      drumpadHit(scratchRef);
      dance(setDance, 'dance4');
    }
    if (e.code === 'Digit5') {
      drumpadHit(yeahalrightRef);
      dance(setDance, 'dance5');
    }
    if (e.code === 'Digit6') {
      drumpadHit(jamminRef);
      dance(setDance, 'dance6');
    }
    if (e.code === 'Digit7') {
      drumpadHit(toejamRef);
      dance(setDance, 'dance7');
    }
    if (e.code === 'Digit8') {
      drumpadHit(bigearlRef);
      dance(setDance, 'dance8');
    }
    if (e.code === 'Digit9') {
      drumpadHit(burpRef);
      dance(setDance, 'dance9');
    }
    if (e.code === 'Digit0') {
      drumpadHit(swooshRef);
      dance(setDance, 'dance0');
    }
  }, [isPaused, jam]);

  useEffect (() => {
    const interval = setInterval(() => {
      // set background to a different sprite every 3 seconds
      setShifty(Math.floor(Math.random() * 24) + 1);
    }, 3000);

    window.addEventListener('keypress', handleKeyPress);
    // window.addEventListener('click', handleClick);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress]); // empty array here so this only runs once on component did mount (this seems weird 🤔)

  // useEffect (() => {
  //   setJam((prevJam: any) => {
  //     console.log('prev jam index: ', prevJam);
  //     jams[jam].current.pause();
  //     jams[jam].current.load();
  //     return prevJam < jams.length - 1 ? prevJam += 1 : 0;
  //   });
  // }, [jam])

  useEffect (() => {
    if (!isPaused) {
      jams[jam].current.onended = () => {
        nextJam();
      };
      jams[jam].current.play();
    } else {
      jams[jam].current.pause();
    }
  }, [isPaused, jam]);

  return (
    <div id="body-bg" onKeyPress={(event) => { console.log('~~>', event.which) }}>
      <div id="jam-out-bg" className={`shifty${shifty}`}>
        <div id="toejam-box">
          <div id="toejam" className={`${alienDance}`} />
        </div>
        <div id="earl-box">
          <div id="earl" className={`${alienDance}`} />
        </div>
        <div id="jam-out-frame" />
        <div id="jam-out-text">
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
          <span className="jam-out-text-letter" />
        </div>
      </div>
      <div id="jam-out-border" />

      {/* INTRO/PAUSE */}
      {isPaused && (
        <div id="space-background">
          <div id="jam-out-title1">
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
          </div>
          <div id="jam-out-title2">
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
            <span className="jam-out-title-letter" />
          </div>
          <div id="press-spacebar">
            <span className="press-spacebar-letter" />
            <span className="press-spacebar-letter" />
            <span className="press-spacebar-letter" />
            <span className="press-spacebar-letter" />
            <span className="press-spacebar-letter" />
            <span className="press-spacebar-letter" />
            <span className="press-spacebar-letter" />
            <span className="press-spacebar-letter" />
            <span className="press-spacebar-letter" />
            <span className="press-spacebar-letter" />
            <span className="press-spacebar-letter" />
            <span className="press-spacebar-letter" />
            <span className="press-spacebar-letter" />
            <span className="press-spacebar-letter" />
          </div>
          <div id="instructions1">
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
          </div>
          <div id="instructions2">
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
            <span className="instructions-letter" />
          </div>
          <a id="github-twitter" href="https://github.com/tsturtz/toejam-and-earl-jam-out">
            <span className="github-twitter-letter" />
            <span className="github-twitter-letter" />
            <span className="github-twitter-letter" />
            <span className="github-twitter-letter" />
            <span className="github-twitter-letter" />
            <span className="github-twitter-letter" />
            <span className="github-twitter-letter" />
            <span className="github-twitter-letter" />
            <span className="github-twitter-letter" />
            <span className="github-twitter-letter" />
            <span className="github-twitter-letter" />
            <span className="github-twitter-letter" />
            <span className="github-twitter-letter" />
            <span className="github-twitter-letter" />
          </a>
        </div>
      )}

      {/* JAMS */}
      <audio id="jam1" ref={jam1Ref} preload="auto">
        <source src={alienBreakDown} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <audio id="jam2" ref={jam2Ref} preload="auto">
        <source src={bigEarlBump} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <audio id="jam3" ref={jam3Ref} preload="auto">
        <source src={funkotronicBeat} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <audio id="jam4" ref={jam4Ref} preload="auto">
        <source src={rapmasterRocketRacket} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <audio id="jam5" ref={jam5Ref} preload="auto">
        <source src={toejamJammin} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <audio id="jam6" ref={jam6Ref} preload="auto">
        <source src={toejamSlowjam} type="audio/mp3" />
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

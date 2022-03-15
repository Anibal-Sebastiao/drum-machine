import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import keys from './keys'


function App() {
  const [display, setDisplay] = useState('');

  const playAudio = (e) => {

    const kdb = e.keyCode || e; 
    setDisplay(keys.find(kbd => kbd.dataKey == [kdb]))
    const audio = document.querySelector(`audio[data-key="${kdb}"]`);
    const key = document.querySelector(`.key[data-key="${kdb}"]`);
    if(!audio) return ;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
  }

  const handleClick = (e) => {

    playAudio(e.target.dataset.key)
  }

  window.addEventListener('keydown', function(e){
    playAudio(e)
  });

  function removeTransition(e){
    if(e.propertyName !== 'transform') return;
    this.classList.remove('playing');
  }

  const kbd = document.querySelectorAll('.key');
  kbd.forEach(key => key.addEventListener('transitionend', removeTransition ));

  return (
    <div className="App" id="drum-machine">
      {
        <div id='display' className="my-5 text-center">
          <p className="h1 text-white">{display && display.sound}</p>
          </div>
      }
      <div className="keys">
        <KeyPad playAudio={handleClick}/>
      </div>
    </div>
  )
}

const KeyPad = ({playAudio}) => {
  const kbd = keys.map(key => {
    return <Key dataKey={key.dataKey} key={key.kbd} kbd={key.kbd} sound={key.sound} audio={key.audio} playAudio={playAudio} />
  } )
  return (
    <>
      {kbd}
    </>
  )
}

const Audio = ({dataKey, audio, kbd}) => {
  return (
    <>
      <audio className="clip" id={kbd} data-key={dataKey} src={audio}></audio>
    </>
  )
}


const Key = ({dataKey, kbd, sound, audio, playAudio}) => {
  return (
    <>
    <div data-key={dataKey} className="key">
      <kbd className="drum-pad" id={sound} data-key={dataKey} onClick={playAudio}>
        {kbd}
        <Audio dataKey={dataKey} audio={audio} kbd={kbd} />
      </kbd>
      <span className="sound" id={kbd}>{sound}</span>
    </div>
    </>
  )
}

export default App

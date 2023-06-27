import React, { useState, useEffect } from 'react';
import fartAudio from './fart.mp3';
import vineAudio from './vine.mp3';

const Audio = ({ onSubmit }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [textInputs, setTextInputs] = useState([]);
  const [isError, setIsError] = useState(false);

  const handleButtonClick = () => {
    playAudio(fartAudio);
    setTimeout(() => {
      playAudio(vineAudio);
    }, 5000);
  };

  const playAudio = (audioSrc) => {
    const audioPlayer = new window.Audio(audioSrc);

    // Handle autoplay restrictions by playing the audio on a user interaction event
    const playPromise = audioPlayer.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Playback started successfully
        })
        .catch((error) => {
          // Failed to start playback (possibly due to autoplay restrictions)
          console.log(error);
        });
    }
  };

  useEffect(() => {
    // Clean up audio playback when the component is unmounted
    return () => {
      const audioPlayer = new window.Audio();
      audioPlayer.pause();
    };
  }, []);

  const handleTextInputChange = (e, index) => {
    const updatedTextInputs = [...textInputs];
    updatedTextInputs[index] = e.target.value;
    setTextInputs(updatedTextInputs);
  };

  const handleSubmit = () => {
    const includesEmpty = textInputs.includes('');
    const numTextInputs = textInputs.length;

    if (includesEmpty || textInputs.length !== numTextInputs) {
      alert('Please answer all the questions before submitting.');
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      return;
    }

    setIsSubmitted(true);
    console.log(textInputs);
    onSubmit(textInputs);
  };

  return (
    <div className="audio-container">
      <div className="button-container">
        <button className="audio-button" onClick={handleButtonClick}>
          Play Audio
        </button>
      </div>
      <div className="text-inputs-container">
        {Array.from({ length: 4 }, (_, index) => (
          <div className="audio-row" key={index}>
            <span className="audio-number">{index + 1}</span>
            <input
              type="text"
              className={`audio-textbox ${isError ? 'error' : ''}`}
              placeholder="?"
              value={textInputs[index] || ''}
              onChange={(e) => handleTextInputChange(e, index)}
            />
          </div>
        ))}
      </div>
      <button className={`submit-button ${isSubmitted ? 'submitted' : ''}`} onClick={handleSubmit}>
        <strong>Submit</strong>
      </button>
    </div>
  );
};

export default Audio;

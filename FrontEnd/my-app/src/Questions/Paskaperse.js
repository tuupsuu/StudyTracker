import React, { useState, useEffect } from 'react';
import fartAudio from './fart.mp3';
import vineAudio from './vine.mp3';

const Audio = ({ index, onSubmit }) => {
  const [inputs, setInputs] = useState(['', '', '', '']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleInputChange = (e, index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = e.target.value;
    setInputs(updatedInputs);
  };

  const handleSubmit = () => {
    const includesEmpty = inputs.includes('');
    const numInputs = inputs.length;

    if (includesEmpty || numInputs !== 4) {
      alert('Please answer all the questions before submitting.');
    } else {
      setIsSubmitted(true);
      onSubmit(index, inputs);
    }
  };

  useEffect(() => {
    let audio = null;

    const playAudio = (audioFile) => {
      audio = new Audio(audioFile);
      audio.play()
        .then(() => {
          audio.onended = () => {
            setIsPlaying(false);
          };
        })
        .catch((error) => {
          console.error('Failed to play audio:', error);
          setIsPlaying(false);
        });
    };
    
    if (isPlaying) {
      playAudio(fartAudio);
      setTimeout(() => {
        playAudio(vineAudio);
      }, 5000);
    } else if (audio) {
      audio.pause();
      audio = null;
    }

    return () => {
      if (audio) {
        audio.pause();
        audio = null;
      }
    };
  }, [isPlaying]);

  const handleAudioPlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="audio-container">
      <button
        className="audio-button"
        onClick={handleAudioPlay}
        disabled={isPlaying || isSubmitted}
      >
        Play Audio
      </button>
      {inputs.map((value, index) => (
        <div key={index} className="audio-row">
          <span className="audio-number">{index + 1}</span>
          <input
            type="text"
            className="audio-textbox"
            placeholder="?"
            value={value}
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      ))}
      <button className={`submit-button ${isSubmitted ? 'submitted' : ''}`} onClick={handleSubmit}>
        <strong>Submit</strong>
      </button>
    </div>
  );
};

export default Audio;

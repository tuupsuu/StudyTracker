import React from 'react';

const Audio = ({ audioSrc, onSubmit }) => {
  const handleAnswerSubmit = (option) => {
    onSubmit(option);
  };

  return (
    <div>
      <audio src={audioSrc} controls>
        Your browser does not support the audio element.
      </audio>
      <div>
        <h1>Choose the correct option:</h1>
        <div>
          <button onClick={() => handleAnswerSubmit('Option 1')}>Option 1</button>
          <button onClick={() => handleAnswerSubmit('Option 2')}>Option 2</button>
          <button onClick={() => handleAnswerSubmit('Option 3')}>Option 3</button>
          <button onClick={() => handleAnswerSubmit('Option 4')}>Option 4</button>
        </div>
      </div>
    </div>
  );
};

export default Audio;

import React, { useState, useEffect } from 'react';

const Timed = ({ options, onSubmit }) => {
  const [timeRemaining, setTimeRemaining] = useState(10); // The timer
  const [userAnswers, setUserAnswers] = useState([]);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      setIsTimeUp(true);
      onSubmit(userAnswers);
    }
  }, [timeRemaining, userAnswers, onSubmit]);

  const handleAnswerChange = (index, answer) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = answer;
      return updatedAnswers;
    });
  };

  if (isTimeUp) {
    return <div className='Times-Up'>Time's up!</div>;
  }

  return (
    <div>
      <div>{`Time Remaining: ${timeRemaining} seconds`}</div>
      {options.map((option, index) => (
        <div className='Timed-questionbox' key={index}>
          <div className='Timed-question'>{`${option} =`}</div>
          <input
            className='Timed-textbox'
            type="text"
            value={userAnswers[index] || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Timed;

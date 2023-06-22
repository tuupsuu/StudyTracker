import React, { useState, useEffect } from 'react';
import './ExampleTest.css';
import jsonData from '../jsonFiles/testinfo.json';
import SingleButtons from '../Questions/SingleButtons';
import WhatsNext from '../Questions/WhatsNext';

const ExampleTest = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0.5 * 60); // 5 minutes in seconds

  const handleAnswerSubmit = (index, answer) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = answer;
      return updatedAnswers;
    });
  };

  const downloadUserAnswers = () => {
    const userAnswersData = jsonData.map((questionData, index) => {
      return {
        id: questionData.id,
        userAnswer: userAnswers[index],
      };
    });

    const jsonDataString = JSON.stringify(userAnswersData, null, 2);

    const link = document.createElement('a');
    link.href = `data:text/json;charset=utf-8,${encodeURIComponent(jsonDataString)}`;
    link.download = 'UserAnswers.json';
    link.click();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      // Time's up, submit the answers
      downloadUserAnswers();
    }
  }, [remainingTime]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className="app">
      <div className="TopBar">
      <div className="timer">
        Time Remaining: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
        <h1 className="Test-Title">Welcome to the test</h1>
      </div>
      <div className="question-container">
        {jsonData.map((questionData, index) => {
          if (questionData.type === 'single') {
            return (
              <div key={index}>
                <h1>{questionData.question}</h1>
                <SingleButtons
                  options={questionData.options}
                  answer={questionData.answers}
                  index={index}
                  onSubmit={handleAnswerSubmit}
                />
              </div>
            );
          } else if (questionData.type === 'whatsNext') {
            return (
              <div key={index}>
                <h1>{questionData.question}</h1>
                <WhatsNext
                  options={questionData.options}
                  answer={questionData.answers}
                  index={index}
                  onSubmit={handleAnswerSubmit}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <button className="submit-button" onClick={downloadUserAnswers}>
        <strong>End test</strong>
      </button>
    </div>
  );
};

export default ExampleTest;

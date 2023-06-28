import React, { useState, useEffect } from 'react';
import './ExampleTest.css';
import jsonData from '../jsonFiles/testinfo.json';
import SingleButtons from '../Questions/SingleButtons';
import WhatsNext from '../Questions/WhatsNext';
import Audio from '../Questions/Audio';
import Timed from '../Questions/Timed';
import Money from '../Questions/Money';


const ExampleTest = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [remainingTime, setRemainingTime] = useState(30 * 60); // Timer 30 * 60 seconds
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [completedTimedExercises, setCompletedTimedExercises] = useState([]);
  const [showTimedExercise, setShowTimedExercise] = useState(null);

  const handleAnswerSubmit = (index, answer) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = answer;
      return updatedAnswers;
    });
  };

  const redirectToMainMenu = () => {
    window.location.href = './..';
  };

  const downloadUserAnswers = () => {
    if (showConfirmation) {
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

      redirectToMainMenu();
    }
  };

  const handleConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleConfirmSubmission = () => {
    setShowConfirmation(false);
    downloadUserAnswers();
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

  const handleStartTimer = (index) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = [];
      return updatedAnswers;
    });

    setShowTimedExercise(index);
    setCompletedTimedExercises((prevCompletedExercises) => [...prevCompletedExercises, index]);
  };

  const isTimerStarted = (index) => {
    return showTimedExercise === index || completedTimedExercises.includes(index);
  };

  return (
    <div className="test">
      <div className="Test-TopBar">
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
          } else if (questionData.type === 'audio') {
            return (
              <div key={index}>
                <h1>{questionData.question}</h1>
                <Audio
                  index={index}
                  onSubmit={(answer) => handleAnswerSubmit(index, answer)}
                />
              </div>
            );

            } else if (questionData.type === 'money') {
              return (
                <div key={index}>
                  <h1>{questionData.question}</h1>
                  <Money
                    index={index}
                    coins={questionData.coins}
                    bills={questionData.bills}
                    onSubmit={handleAnswerSubmit}
                  />
                </div>
              );
            
          } else if (questionData.type === 'timer') {
            const isStarted = isTimerStarted(index);

            return (
              <div key={index}>
                <h1>{questionData.question}</h1>
                {!isStarted && (
                  <button
                    className="StartTimer-button"
                    onClick={() => handleStartTimer(index)}
                  >
                    Start Timer
                  </button>
                )}
                {isStarted && (
                  <Timed
                    options={questionData.options}
                    onSubmit={(answer) => handleAnswerSubmit(index, answer)}
                  />
                )}
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      {!showConfirmation && (
        <button className="submit-button" onClick={handleConfirmation}>
          <strong>End Test</strong>
        </button>
      )}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p className="confirmation-text">Are you sure you want to end the test?</p>
          <div>
            <button className="EndTestYes" onClick={handleConfirmSubmission}>
              Yes
            </button>
            <button className="EndTestNo" onClick={handleCancelConfirmation}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleTest;

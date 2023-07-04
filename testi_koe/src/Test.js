import React, { useState } from 'react';
import './Test.css';
import Clock from './Clock';
import jsonData from './testinfo.json';
import SingleButtons from './SingleButtons';
import WhatsNext from './WhatsNext';


const Test = () => {
  const [userAnswers, setUserAnswers] = useState([]);

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
        userAnswer: userAnswers[index]
      };
    });

    const jsonDataString = JSON.stringify(userAnswersData, null, 2);

    const link = document.createElement('a');
    link.href = `data:text/json;charset=utf-8,${encodeURIComponent(jsonDataString)}`;
    link.download = 'UserAnswers.json';
    link.click();
  };

  return (
    <div className="app">
      <h1><u>Welcome to the test</u></h1>
      <Clock />
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
      <button className="submit-button" onClick={downloadUserAnswers}><strong>End test</strong></button>
    </div>
  );
};

export default Test;

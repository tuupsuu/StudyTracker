import React from 'react';
import './App.css';
import Clock from './Clock';
import jsonData from './testinfo.json';
import OptionButtons from './OptionButtons';

const App = () => {
  return (
    <div className="app">
      <h1>Test</h1>
      <Clock />
      <div className="question-container">
        {jsonData.map((questionData, index) => (
          <div key={index}>
            <h1>Type: {questionData.type}</h1>
            <h1>Question: {questionData.question}</h1>
            <OptionButtons options={questionData.options} answer={questionData.answer} />
          </div>
        ))}
      </div>
      <button className="submit-button"><strong>Submit</strong></button>
    </div>
  );
};

export default App;

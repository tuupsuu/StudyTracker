import React, { useState } from 'react';

const Money = ({ options, answer, index, onSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e, rowIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[rowIndex] = e.target.value;
    setSelectedOptions(updatedOptions);
  };

  const checkAnswers = () => {
    const includesNull = selectedOptions.includes(undefined);
    const numQuestions = options.length;

    if (includesNull || selectedOptions.length !== numQuestions) {
      alert('Please answer all the questions before submitting.');
    } else {
      setIsSubmitted(true);
      console.log(selectedOptions);
      onSubmit(index, selectedOptions);
    }
  };

  return (
    <div className="money-container">
      {options.map((rowOptions, rowIndex) => (
        <div key={rowIndex} className="money-row-container">
          {Array.isArray(rowOptions) ? (
            <div className="money-row-options-container">
              {rowOptions.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`money-box ${
                    selectedOptions[rowIndex] === optionIndex ? 'selected' : ''} 
                    ${option === 1 || option === 2 ? 'coin' : ''}
                    ${option === 5 ? 'bill-5' : ''}
                    ${option === 10 ? 'bill-10' : ''}
                    ${option === 20 ? 'bill-20' : ''}
                    ${option === 50 ? 'bill-50' : ''}`}
                >
                  {option}€
                </div>
              ))}
            </div>
          ) : (
            <p>Error: Invalid options for row {rowIndex}</p>
          )}
          <input
            type="text"
            className="money-answer-input"
            placeholder="?"
            value={selectedOptions[rowIndex] || ''}
            onChange={(e) => handleInputChange(e, rowIndex)}
            onClick={() => setIsSubmitted(false)}
          />
          <div className='money-border'></div>
        </div>
      ))}
      <button className={`submit-button ${isSubmitted ? 'submitted' : ''}`} onClick={checkAnswers}>
        <strong>Submit</strong>
      </button>
    </div>
  );
};

export default Money;

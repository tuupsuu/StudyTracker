import React, { useState } from 'react';

const WhatsNext = ({ options, answer, index, onSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e, rowIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[rowIndex] = e.target.value;
    setSelectedOptions(updatedOptions);
    setIsSubmitted(false); // Set isSubmitted to false when a textbox is clicked
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
    <div className="whats-next-container">
      {options.map((rowOptions, rowIndex) => (
        <div key={rowIndex} className="row-container">
          {Array.isArray(rowOptions) ? (
            <div className="row-options-container">
              {rowOptions.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`whats-next-box ${selectedOptions[rowIndex] === optionIndex}`}
                >
                  {option}
                </div>
              ))}
            </div>
          ) : (
            <p>Error: Invalid options for row {rowIndex}</p>
          )}
          <input
            type="text"
            className="answer-input"
            placeholder='?'
            value={selectedOptions[rowIndex] || ''}
            onChange={(e) => handleInputChange(e, rowIndex)}
            onClick={() => setIsSubmitted(false)}
          />
        </div>
      ))}
      <button className={`submit-button ${isSubmitted ? 'submitted' : ''}`} onClick={checkAnswers}>
        <strong>Submit</strong>
      </button>
    </div>
  );
};

export default WhatsNext;

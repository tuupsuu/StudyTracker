import React, { useState } from 'react';

const SingleButtons = ({ options, answer, index, onSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionClick = (option, rowIndex, optionIndex) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = [...prevSelectedOptions];
      updatedOptions[rowIndex] = optionIndex;
      return updatedOptions;
    });
    setIsSubmitted(false);
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
    <div className="single-container">
      {options.map((rowOptions, rowIndex) => (
        <div key={rowIndex} className="row-container">
          {Array.isArray(rowOptions) ? (
            rowOptions.map((option, optionIndex) => (
              <button
                key={optionIndex}
                className={`single-box ${selectedOptions[rowIndex] === optionIndex ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option, rowIndex, optionIndex)}
              >
                {option}
              </button>
            ))
          ) : (
            <p>Error: Invalid options for row {rowIndex}</p>
          )}
        </div>
      ))}
      <button className={`submit-button ${isSubmitted ? 'submitted' : ''}`} onClick={checkAnswers}>
        <strong>Submit</strong>
      </button>
    </div>
  );
};

export default SingleButtons;

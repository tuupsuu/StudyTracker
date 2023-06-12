import React, { useState } from 'react';

const OptionButtons = ({ options, answer }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (option, rowIndex, index) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = [...prevSelectedOptions];
      updatedOptions[rowIndex] = index;
      return updatedOptions;
    });
  };

  const checkAnswers = () => {
    let score = 0;
    selectedOptions.forEach((selectedOption, rowIndex) => {
      if (selectedOption === answer[rowIndex]) {
        score++;
      }
    });
    console.log(`Score: ${score}`);
  };

  return (
    <div className="options-container">
      {options.map((rowOptions, rowIndex) => (
        <div key={rowIndex} className="row-container">
          {Array.isArray(rowOptions) ? (
            rowOptions.map((option, index) => (
              <button
                key={index}
                className={`option-box ${selectedOptions[rowIndex] === index ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option, rowIndex, index)}
              >
                {option}
              </button>
            ))
          ) : (
            <p>Error: Invalid options for row {rowIndex}</p>
          )}
        </div>
      ))}
      <button className="submit-button" onClick={checkAnswers}><strong>Submit</strong></button>
    </div>
  );
};

export default OptionButtons;

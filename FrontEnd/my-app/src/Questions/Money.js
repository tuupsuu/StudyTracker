import React, { useState } from 'react';

const Money = ({ index, coins, bills, onSubmit }) => {
  const [userAnswer, setUserAnswer] = useState('');

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(index, userAnswer);
  };

  return (
    <div className="Money-question">
      <div className="Money-box">
        <div className="Money-coins">
          {coins.map((coin, i) => (
            <div key={i}>{coin}€</div>
          ))}
        </div>
        <div className="Money-bills">
          {bills.map((bill, i) => (
            <div key={i}>{bill}€</div>
          ))}
        </div>
      </div>
      <div className="Money-answer">
        <input
          type="number"
          value={userAnswer}
          onChange={handleInputChange}
          placeholder="Enter the sum"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Money;

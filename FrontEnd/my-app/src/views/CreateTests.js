import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './CreateTests.css';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';

function CreateTests() {
  const { testId } = useParams();
  const questionTypes = ['single', 'whats next', 'audio', 'timer', 'money'];
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [testName, setTestName] = useState('');
  const [questions, setExercises] = useState([

    { 
      question: '', 
      options: [''], 
      type: questionTypes[0], 
      correctIndex: -1, 
      sequences: [['', '', '']], 
      answers: [''], 
      time: '', 
      timerQuestions: [{ question: '', answer: '' }], 
      moneyQuestions: [{ amounts: [''], answer: '' }] 
    }
  ]);
  

  const updateExerciseQuestion = (index, question) => {
    const updatedExercises = [...questions];
    updatedExercises[index].question = question;
    setExercises(updatedExercises);
  };

  const updateExerciseType = (index, type) => {
    const updatedExercises = [...questions];
    updatedExercises[index].type = type;
    setExercises(updatedExercises);
  };

  const updateOption = (exerciseIndex, optionIndex, value) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].options[optionIndex] = value;
    setExercises(updatedExercises);
  };

  const addOption = (exerciseIndex) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].options.push('');
    setExercises(updatedExercises);
  };

  const removeOption = (exerciseIndex, optionIndex) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].options.splice(optionIndex, 1);
    setExercises(updatedExercises);
  };

  const addExercise = () => {
    const newExercise = {
      question: '',
      options: [''],
      type: questionTypes[0],
      correctIndex: -1,
      sequences: [['', '', '']],
      answers: [''],
      time: '',
      timerQuestions: [{ question: '', answer: '' }],
      moneyQuestions: [{ amounts: [''], answer: '' }]
    };
    setExercises([...questions, newExercise]);
  };
  
  
  

  const removeExercise = (index) => {
    const updatedExercises = [...questions];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };

  const updateCorrectAnswer = (exerciseIndex, correctIndex) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].correctIndex = correctIndex;
    setExercises(updatedExercises);
  };

  const handleTestNameChange = (event) => {
    setTestName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting test:', { testName, questions });

    try {
      const response = await fetch('https://studytracker.site/api1/tests', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              testName,
              questions
          })
      });

      const responseData = await response.json();
      
      if (response.ok) {
          console.log('Test submitted successfully:', responseData);
      } else {
          console.error('Failed to submit test:', responseData);
      }
    } catch (error) {
        console.error('Error submitting test:', error);
    }

    setTestName('');
    setExercises([{ question: '', options: [''], type: questionTypes[0], correctIndex: -1, sequences: [['', '', '']], answers: [''] }]);
  };

  const updateSequence = (exerciseIndex, sequenceIndex, numberIndex, value) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].sequences[sequenceIndex][numberIndex] = value;
    setExercises(updatedExercises);
  };

  const addSequence = (exerciseIndex) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].sequences.push(['', '', '']);
    updatedExercises[exerciseIndex].answers.push('');
    setExercises(updatedExercises);
  };

  const removeSequence = (exerciseIndex, sequenceIndex) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].sequences.splice(sequenceIndex, 1);
    updatedExercises[exerciseIndex].answers.splice(sequenceIndex, 1);
    setExercises(updatedExercises);
  };

  const updateAnswer = (exerciseIndex, sequenceIndex, value) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].answers[sequenceIndex] = value;
    setExercises(updatedExercises);
  };

  // -----------------------------------------------------------------------------
  // Timer functions

  const updateTimerQuestion = (exerciseIndex, questionIndex, value) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].timerQuestions[questionIndex].question = value;
    setExercises(updatedExercises);
  };

  const updateTimerAnswer = (exerciseIndex, questionIndex, value) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].timerQuestions[questionIndex].answer = value;
    setExercises(updatedExercises);
  };

  const addTimerQuestion = (exerciseIndex) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].timerQuestions.push({ question: '', answer: '' });
    setExercises(updatedExercises);
  };

  const removeTimerQuestion = (exerciseIndex, questionIndex) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].timerQuestions.splice(questionIndex, 1);
    setExercises(updatedExercises);
  };

  const updateAllowedTime = (exerciseIndex, time) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].time = time;
    setExercises(updatedExercises);
  };

  // -----------------------------------------------------------------------------
  // Money functions

  const updateMoneyAmount = (exerciseIndex, questionIndex, amountIndex, value) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].moneyQuestions[questionIndex].amounts[amountIndex] = value;
    setExercises(updatedExercises);
  };
  
  const updateMoneyAnswer = (exerciseIndex, questionIndex, value) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].moneyQuestions[questionIndex].answer = value;
    setExercises(updatedExercises);
  };
  
  const addMoneyQuestion = (exerciseIndex) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].moneyQuestions.push({ amounts: [''], answer: '' });
    setExercises(updatedExercises);
  };
  
  const removeMoneyQuestion = (exerciseIndex, questionIndex) => {
    const updatedExercises = [...questions];
    updatedExercises[exerciseIndex].moneyQuestions.splice(questionIndex, 1);
    setExercises(updatedExercises);
  };
  
  const teacherLinks = [
    { label: "Homepage", path: "/teacher" }
  ];
  
  return (
    <div className='CreateTestPage'>
      <Header
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        links={teacherLinks} 
        title="Create a Test" // Pass the custom title here
      />
      <div className="CreateTests">
        <div className="test-name-section">
          <label>
            Test Name:
            <input
            className='test-name-box'
              type="text"
              value={testName}
              onChange={handleTestNameChange}
              required
            />
          </label>
        </div>
        <form onSubmit={handleSubmit}>
          {questions.map((exercise, exerciseIndex) => (
            <div className="exercise" key={exerciseIndex}>
              <label>
                Type:
                <select className='TypeInput' value={exercise.type} onChange={(e) => updateExerciseType(exerciseIndex, e.target.value)}>
                  {questionTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Exercise {exerciseIndex + 1} Question:
                <input
                  type="text"
                  value={exercise.question}
                  onChange={(e) => updateExerciseQuestion(exerciseIndex, e.target.value)}
                  required
                />
              </label>

              {exercise.type === "single" && (
                <div>
                  {exercise.options.map((option, optionIndex) => (
                    <div className="option-container" key={optionIndex}>
                      <div className='checkbox-wrapper'>
                      <input 
                        className="checkbox"
                        type="checkbox" 
                        checked={optionIndex === exercise.correctIndex} 
                        onChange={() => updateCorrectAnswer(exerciseIndex, optionIndex)}
                      />
                      </div>
                      <label>
                        Option {optionIndex + 1}:
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(exerciseIndex, optionIndex, e.target.value)}
                          required
                        />
                      </label>
                      {exercise.options.length > 2 && (
                        <button onClick={() => removeOption(exerciseIndex, optionIndex)}>
                          <FaMinus />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => addOption(exerciseIndex)}>
                    <FaPlus />
                  </button>
                </div>
              )}

              {exercise.type === "whats next" && (
                <div className="sequence-container">
                  <span style={{fontSize: "18px"}}>Insert the number sequence and the right answer</span>
                  {exercise.sequences.map((sequence, sequenceIndex) => (
                    <div className="sequence-row" key={sequenceIndex}>
                      {sequence.map((number, numberIndex) => (
                        <div className="number-input-container" key={numberIndex}>
                          <input
                            type="text"
                            value={number}
                            onChange={(e) => updateSequence(exerciseIndex, sequenceIndex, numberIndex, e.target.value)}
                            required
                          />
                        </div>
                      ))}
                      <input
                        type="text"
                        value={exercise.answers[sequenceIndex]}
                        onChange={(e) => updateAnswer(exerciseIndex, sequenceIndex, e.target.value)}
                        required
                        style={{borderColor: "lime"}}
                      />
                      {exercise.sequences.length > 1 && (
                        <button onClick={() => removeSequence(exerciseIndex, sequenceIndex)}>
                          <FaMinus />
                        </button>
                      )}
                    </div>
                  ))}
                      <button onClick={() => addSequence(exerciseIndex)}>
                        <FaPlus />
                      </button>
                </div>
              )}

              {exercise.type === "timer" && (
                <div>
                  <label>
                    Allowed Time:
                    <input
                      type="text"
                      value={exercise.time}
                      onChange={(e) => updateAllowedTime(exerciseIndex, e.target.value)}
                      required
                    />
                  </label>
                    {exercise.timerQuestions.map((timerQuestion, questionIndex) => (
                      <div className="timer-question-container" key={questionIndex}>
                        <div className="timer-question-row"> 
                          <label>
                            Question {questionIndex + 1}:
                            <input
                              type="text"
                              value={timerQuestion.question}
                              onChange={(e) => updateTimerQuestion(exerciseIndex, questionIndex, e.target.value)}
                              required
                            />
                          </label>
                          <label>
                            Answer:
                            <input
                              type="text"
                              value={timerQuestion.answer}
                              onChange={(e) => updateTimerAnswer(exerciseIndex, questionIndex, e.target.value)}
                              required
                              style={{borderColor: "lime"}}
                            />
                          </label>
                          {exercise.timerQuestions.length > 1 && (
                            <button className="remove-button" onClick={() => removeTimerQuestion(exerciseIndex, questionIndex)}>
                              <FaMinus />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  <button onClick={() => addTimerQuestion(exerciseIndex)}>
                    <FaPlus />
                  </button>
                </div>
              )}

              {exercise.type === "money" && (
                <div className="money-container">
                  <label>
                    Insert the amounts of money and the correct sum
                  </label>
                  {exercise.moneyQuestions?.map((moneyQuestion, questionIndex) => (
                    <div className="money-question-container" key={questionIndex}>
                      <div className="money-question-row">
                        {moneyQuestion.amounts.map((amount, amountIndex) => (
                          <label key={amountIndex}>
                            Amount {amountIndex + 1}:
                            <input
                              type="text"
                              value={amount}
                              onChange={(e) => updateMoneyAmount(exerciseIndex, questionIndex, amountIndex, e.target.value)}
                              required
                              placeholder="Amount"
                              style={{ width: '200px', marginLeft: '10px' ,marginRight: '10px' }}
                            />
                          </label>
                        ))}
                        <label>
                          Answer:
                          <input
                            type="text"
                            value={moneyQuestion.answer}
                            onChange={(e) => updateMoneyAnswer(exerciseIndex, questionIndex, e.target.value)}
                            required
                            placeholder='Answer'
                            style={{borderColor: "lime", width: '200px', marginLeft: '10px' ,marginRight: '10px'}}
                          />
                        </label>
                        {exercise.moneyQuestions.length > 1 && (
                          <button onClick={() => removeMoneyQuestion(exerciseIndex, questionIndex)}>
                            <FaMinus />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button className='money-plusbutton' onClick={() => addMoneyQuestion(exerciseIndex)}>
                    <FaPlus />
                  </button>
                </div>
              )}

              {questions.length > 1 && (
                <button onClick={() => removeExercise(exerciseIndex)}>
                  Remove Exercise
                </button>
              )}
            </div>
          ))}
          <button onClick={addExercise}>
            Add Exercise
          </button>
          <button type="submit">Create Test</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTests;

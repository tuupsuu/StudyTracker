import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './CreateTests.css';

function CreateTests() {
  const questionTypes = ['single', 'whats next', 'audio', 'timer', 'money'];

  const [exercises, setExercises] = useState([
    { question: '', options: [''], type: questionTypes[0], correctAnswer: -1 }
  ]);

  const updateExerciseQuestion = (index, question) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].question = question;
    setExercises(updatedExercises);
  };

  const updateExerciseType = (index, type) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].type = type;
    setExercises(updatedExercises);
  };

  const updateOption = (exerciseIndex, optionIndex, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].options[optionIndex] = value;
    setExercises(updatedExercises);
  };

  const addOption = (exerciseIndex) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].options.push('');
    setExercises(updatedExercises);
  };

  const removeOption = (exerciseIndex, optionIndex) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].options.splice(optionIndex, 1);
    setExercises(updatedExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { question: '', options: [''], type: questionTypes[0], correctAnswer: -1 }]);
  };

  const removeExercise = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };

  const updateCorrectAnswer = (exerciseIndex, correctAnswer) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].correctAnswer = correctAnswer;
    setExercises(updatedExercises);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here is where you'd call your API to create the test
    console.log('Submitting test:', exercises);

    // Clear the form
    setExercises([{ question: '', options: [''], type: questionTypes[0], correctAnswer: -1 }]);
  };

  return (
    <div className='CreateTestPage'>
      <div className="CreateTests">
        <h1>Create a Test</h1>
        <form onSubmit={handleSubmit}>
          {exercises.map((exercise, exerciseIndex) => (
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
              {exercise.options.map((option, optionIndex) => (
                <div className="option-container" key={optionIndex}>
                  {exercise.type === "single" && (
                    <input 
                      className="checkbox"
                      type="checkbox" 
                      checked={optionIndex === exercise.correctAnswer} 
                      onChange={() => updateCorrectAnswer(exerciseIndex, optionIndex)}
                    />
                  )}
                  <label>
                    Option {optionIndex + 1}:
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(exerciseIndex, optionIndex, e.target.value)}
                      style={optionIndex === exercise.correctAnswer ? {borderColor: "green"} : {}}
                      required
                    />
                  </label>
                  {exercise.options.length > 1 && (
                    <button onClick={() => removeOption(exerciseIndex, optionIndex)}>
                      <FaMinus />
                    </button>
                  )}
                </div>
              ))}
              <span className="button-label">Add Option</span>
              <button className='AddOptionButton' onClick={() => addOption(exerciseIndex)}>
                <FaPlus />
              </button>
              {exercises.length > 1 && (
                <>
                  <span className="button-label">Remove Exercise</span>
                  <button className='RemoveExerciseButton' onClick={() => removeExercise(exerciseIndex)}>
                    <FaMinus />
                  </button>
                </>
              )}
            </div>
          ))}
          <span className="button-label">Add Exercise</span>
          <button className='AddExerciseButton' onClick={addExercise}>
            <FaPlus />
          </button>
          <button type="submit">Create Test</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTests;

const axios = require('axios');

const testData = {
  Test_ID: 2,
  Stud_ID: 1,
  QuestionResults: [
    {
      Points: 1,
      QuesName: '1',
      SectionResults: [
        {
          Section: 'A',
          Points: 1,
        },
        {
          Section: 'B',
          Points: 0,
        },
      ],
    },
    {
      Points: 1,
      QuesName: '2',
      SectionResults: [
        {
          Section: 'A',
          Points: 1,
        },
      ],
    },
  ],
};

axios
  .post('http://localhost:3002/results/addFromJson', testData)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Error:', error.response.data);
  });
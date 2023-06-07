const rows = document.querySelectorAll('.tehtava_1');
const result = document.getElementById('result');
const submitButton = document.getElementById('submit');
let score = 0;

rows.forEach(row => {
  const buttons = row.querySelectorAll('.number');
  const answer = parseInt(row.dataset.answer); // Get the correct answer for the row
  let selectedButton = null;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (!button.classList.contains('clicked')) {
        if (selectedButton !== null) {
          selectedButton.style.color = "black";
          selectedButton.classList.remove('clicked');
        }

        button.style.color = "red";
        button.classList.add('clicked');
        selectedButton = button;
      }
    });
  });
});

submitButton.addEventListener('click', () => {
  rows.forEach(row => {
    const selectedButton = row.querySelector('.clicked');
    const answer = parseInt(row.dataset.answer);

    if (selectedButton !== null && parseInt(selectedButton.textContent) === answer) {
      score += 1;
    }
  });

  alert(`Your score: ${score}`);
});
const form = document.getElementById('bmi-form');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const results = document.getElementById('results');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear previous errors
  heightInput.classList.remove('error');
  weightInput.classList.remove('error');
  results.textContent = '';

  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  // Validate inputs
  let isValid = true;

  if (isNaN(height) || height <= 0) {
    heightInput.classList.add('error');
    results.textContent = 'Please provide a valid height greater than 0.';
    isValid = false;
  }

  if (isNaN(weight) || weight <= 0) {
    weightInput.classList.add('error');
    results.textContent = 'Please provide a valid weight greater than 0.';
    isValid = false;
  }

  if (!isValid) return;

  // BMI calculation: weight / height(m)^2
  const bmi = (weight / ((height * height) / 10000)).toFixed(2);

  // Determine category and message
  let message = '';
  if (bmi < 18.6) {
    message = 'You are Underweight';
  } else if (bmi >= 18.6 && bmi <= 24.9) {
    message = "You're in the Normal range";
  } else {
    message = 'You are Overweight';
  }

  results.innerHTML = `<span>Your BMI is: <strong>${bmi}</strong></span><br>${message}`;
});

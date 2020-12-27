// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  // Hide results
  document.getElementById('results').style.display = 'none';
  // Show loader
  document.getElementById('loading').style.display = 'block';

  calculateResults();

  e.preventDefault();
});
// Display results
function displayResults() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'block';
}
// Calculate Results
function calculateResults() {
  console.log('Calculating...');

  // UI vars
  // inputs
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  // results
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    console.log({ monthly });

    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    setTimeout(displayResults, 2000);
  } else {
    document.getElementById('loading').style.display = 'none';
    // document.getElementById('results').style.display = 'none';
    showError('Please check your numbers');
  }

  // Since it's a form submit we need to prevent the default behaviour
  // e.preventDefault();
}

//  Show Error
function showError(error) {
  // create a dev
  const errorDiv = document.createElement('div');
  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // Add class to the div
  errorDiv.className = 'alert alert-danger';
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // Insert error above the heading
  card.insertBefore(errorDiv, heading);
  // Clear error after 3 sec
  setTimeout(clearError, 3000);
}
// Clear Error
function clearError() {
  document.querySelector('.alert').remove();
}

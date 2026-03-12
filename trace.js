const traceContainer = document.getElementById('traceContainer');
const progressBarContainer = document.getElementById('progressBarContainer');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const progressLine = document.getElementById('progressLine');

// Load last order from localStorage
let lastOrder = JSON.parse(localStorage.getItem('lastOrder'));

function renderTrace() {
  if (!lastOrder || lastOrder.length === 0) {
    traceContainer.innerHTML = '<h3>No current order</h3>';
    progressBarContainer.style.display = 'none';
    return;
  }

  let html = `<h3>Order Summary:</h3>`;
  html += '<ul>';
  let total = 0;
  lastOrder.forEach(book => {
    let priceNumber = parseInt(book.price.replace('R',''));
    total += priceNumber;
    html += `<li>${book.title} - ${book.price}</li>`;
  });
  html += '</ul>';
  html += `<p>Total: R${total}</p>`;
  traceContainer.innerHTML = html;

  // Show progress bar
  progressBarContainer.style.display = 'flex';
  animateProgress();
}

function animateProgress() {
  step1.classList.add('active');
  let progress = 33; // 33% for first step
  progressLine.style.width = progress + '%';

  // After 2 seconds → Shipping
  setTimeout(() => {
    step2.classList.add('active');
    progress = 66;
    progressLine.style.width = progress + '%';
  }, 2000);

  // After 4 seconds → Delivered
  setTimeout(() => {
    step3.classList.add('active');
    progress = 100;
    progressLine.style.width = progress + '%';
  }, 4000);
}

renderTrace();
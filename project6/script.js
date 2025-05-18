const clock = document.getElementById('clock');
const dateDisplay = document.getElementById('date');

function updateClock() {
  const now = new Date();

  // Format time in Asia/Kolkata timezone
  const optionsTime = {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const optionsDate = {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  clock.textContent = new Intl.DateTimeFormat('en-IN', optionsTime).format(now);
  dateDisplay.textContent = new Intl.DateTimeFormat('en-IN', optionsDate).format(now);
}

updateClock(); // initial call
setInterval(updateClock, 1000); // update every second



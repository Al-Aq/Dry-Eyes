// Set break interval (20 minutes)
let breakInterval = 20 * 60; // 20 minutes in seconds
let timerDisplay = document.getElementById('time-remaining');
let breakReminder = document.getElementById('break-reminder');
let continueButton = document.getElementById('continue');
let container = document.querySelector('.container');

// Function to update the countdown timer
function startCountdown() {
    let interval = setInterval(() => {
        let minutes = Math.floor(breakInterval / 60);
        let seconds = breakInterval % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        
        if (breakInterval <= 0) {
            clearInterval(interval);
            showBreakReminder();
        }
        
        breakInterval--;
    }, 1000);
}

// Show the break reminder after time is up
function showBreakReminder() {
    container.classList.add('hidden');
    breakReminder.classList.remove('hidden');
}

// Event listener for the 'Continue' button
continueButton.addEventListener('click', () => {
    breakReminder.classList.add('hidden');
    container.classList.remove('hidden');
    breakInterval = 20 * 60; // Reset for another 20 minutes
    startCountdown(); // Start the timer again
});

// Start the countdown on page load
window.onload = startCountdown;
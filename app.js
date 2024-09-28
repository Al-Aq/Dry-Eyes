
// Set break interval (20 minutes)
let timerInterval;
let breakInterval;
let customTime;
let isRunning = false;

// DOM elements
const timerDisplay = document.getElementById('time-remaining');
const timeInput = document.getElementById('time-input');
const breakReminder = document.getElementById('break-reminder');
const continueButton = document.getElementById('continue');
const container = document.querySelector('.container');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const restartButton = document.getElementById('restart-button');
const gettingStartedPopup = document.getElementById('getting-started-popup');
const closePopupButton = document.getElementById('close-popup');

// Function to start the countdown timer
function startCountdown() {
    if (isRunning) return; 

    customTime = parseInt(timeInput.value);
    if (isNaN(customTime) || customTime <= 0) {
        alert('Please enter a valid time in minutes.');
        return;
    }

    breakInterval = customTime * 60;
    isRunning = true;
    updateTimerDisplay();

    // Enable stop and restart buttons
    stopButton.disabled = false;
    restartButton.disabled = false;
    startButton.disabled = true;

    timerInterval = setInterval(() => {
        breakInterval--;
        updateTimerDisplay();

        if (breakInterval <= 0) {
            clearInterval(timerInterval);
            showBreakReminder();
        }
    }, 1000);
}

// Function to update the timer display
function updateTimerDisplay() {
    let minutes = Math.floor(breakInterval / 60);
    let seconds = breakInterval % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Show the break reminder after the time is up
function showBreakReminder() {
    container.classList.add('hidden');
    breakReminder.classList.remove('hidden');
}

// Event listener for the 'Continue' button
continueButton.addEventListener('click', () => {
    breakReminder.classList.add('hidden');
    container.classList.remove('hidden');
    restartTimer();
});

// Function to stop the timer
function stopTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startButton.disabled = false;
        stopButton.disabled = true;
    }
}

// Function to restart the timer
function restartTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startButton.disabled = false;
    stopButton.disabled = true;
    updateTimerDisplay();
}

// Show "Getting Started" popup
function showGettingStartedPopup() {
    gettingStartedPopup.classList.remove('hidden');
}

// Close the "Getting Started" popup
closePopupButton.addEventListener('click', () => {
    gettingStartedPopup.classList.add('hidden');
});

// Show the popup when the page loads
window.onload = function () {
    updateTimerDisplay();
    showGettingStartedPopup();
};

// Event listeners for control buttons
startButton.addEventListener('click', startCountdown);
stopButton.addEventListener('click', stopTimer);
restartButton.addEventListener('click', restartTimer);

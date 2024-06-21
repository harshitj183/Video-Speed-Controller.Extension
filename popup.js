// Set the video speed
function setVideoSpeed(speed) {
  if (isNaN(speed) || speed <= 0) {
    showFeedback('Invalid speed. Please enter a value greater than 0.', true);
    return;
  }
  
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "setSpeed", speed: speed }, (response) => {
      if (response) {
        document.getElementById('currentSpeed').innerText = `Current Speed: ${speed}x`;
        showFeedback(`Speed set to ${speed}x`, false);
      }
    });
  });
}

// Apply default speed on page load
function applyDefaultSpeed() {
  chrome.storage.sync.get(['defaultSpeed'], (result) => {
    if (result.defaultSpeed !== undefined) {
      setVideoSpeed(result.defaultSpeed);
      document.getElementById('defaultSpeed').value = result.defaultSpeed;
    }
  });
}

// Save the default speed
function setDefaultSpeed() {
  const defaultSpeed = parseFloat(document.getElementById('defaultSpeed').value);
  if (isNaN(defaultSpeed) || defaultSpeed <= 0) {
    showFeedback('Invalid default speed. Please enter a value greater than 0.', true);
    return;
  }
  
  chrome.storage.sync.set({ defaultSpeed: defaultSpeed }, () => {
    showFeedback(`Default speed set to ${defaultSpeed}x`, false);
  });
}

// Show feedback messages
function showFeedback(message, isError) {
  const feedbackElement = document.getElementById('feedback');
  feedbackElement.className = isError ? 'feedback error' : 'feedback';
  feedbackElement.innerText = message;
  setTimeout(() => feedbackElement.innerText = '', 3000);
}

// Reset to default speed
function resetToDefaultSpeed() {
  chrome.storage.sync.get(['defaultSpeed'], (result) => {
    if (result.defaultSpeed !== undefined) {
      setVideoSpeed(result.defaultSpeed);
    } else {
      showFeedback('No default speed set.', true);
    }
  });
}

// Event listeners for buttons
document.getElementById('setSpeed').addEventListener('click', () => {
  const speed = parseFloat(document.getElementById('speed').value);
  setVideoSpeed(speed);
});

document.getElementById('setDefaultSpeed').addEventListener('click', () => {
  setDefaultSpeed();
});

document.getElementById('resetDefaultSpeed').addEventListener('click', () => {
  resetToDefaultSpeed();
});

document.querySelectorAll('.preset-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const speed = parseFloat(button.getAttribute('data-speed'));
    document.getElementById('speed').value = speed; // Update the input field
    setVideoSpeed(speed); // Also set the video speed immediately
  });
});

// Real-time speed setting on input change
document.getElementById('speed').addEventListener('input', () => {
  const speed = parseFloat(document.getElementById('speed').value);
  if (!isNaN(speed) && speed > 0) {
    setVideoSpeed(speed);
  }
});

// Apply default speed when popup opens
applyDefaultSpeed();















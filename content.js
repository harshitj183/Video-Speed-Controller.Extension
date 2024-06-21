function setVideoSpeed(speed) {
  document.querySelectorAll('video').forEach(video => {
    video.playbackRate = speed;
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setSpeed") {
    setVideoSpeed(request.speed);
    sendResponse({ status: "Speed set" });
  }
});

// Apply default speed on page load
chrome.storage.sync.get(['defaultSpeed'], (result) => {
  if (result.defaultSpeed !== undefined) {
    setVideoSpeed(result.defaultSpeed);
  }
});

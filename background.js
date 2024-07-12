chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  let { videoURL, currentTime } = message;
  let data = {};
  data[videoURL] = currentTime;
  chrome.storage.sync.set(data, () => {
      console.log(`Playback time ${currentTime} saved for video on ${videoURL}`);
  });
});
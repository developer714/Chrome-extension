// content.js
let monitoringVideos = false;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.command === 'startMonitoring') {
        startMonitoringVideos();
    }
});

function startMonitoringVideos() {
    if (monitoringVideos) return;

    console.log('Monitoring videos started.');

    let videoObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.tagName === 'VIDEO') {
                        console.log('Video element added to the DOM.');
                        handleVideo(node);
                    }
                });
            }
        });
    });

    videoObserver.observe(document.body, { childList: true, subtree: true });

    // Initial check for existing video elements
    document.querySelectorAll('video').forEach(video => {
        console.log('Initial video element found.');
        handleVideo(video);
    });

    monitoringVideos = true;
}

function handleVideo(video) {
    let videoURL = window.location.href;

    console.log(`Handling video element on ${videoURL}`);
    // Restore playback time
    chrome.storage.sync.get([videoURL], function (result) {
        if (result[videoURL]) {
            console.log(`Restoring playback time to ${result[videoURL]} for video on ${videoURL}`);
            video.currentTime = result[videoURL];
        }
    });

    // Save playback time at intervals
    video.addEventListener('timeupdate', function () {
        let currentTime = video.currentTime;
        chrome.runtime.sendMessage({ videoURL, currentTime });
        console.log(`Saving playback time ${currentTime} for video on ${videoURL}`);
    });
}
